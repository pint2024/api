import { models } from "../config/index.js";
import { CloudinaryConstants, Constants, DataConstants } from "../constants/index.js";
import { UploadException, ValidationException } from "../exceptions/index.js";
import { ValidateParamsHelpers } from "../helpers/index.js";
import { BaseService, CloudStorageService, MulterService, ResponseService, UploadService } from "../services/index.js";
import { ModelsUtils } from "../utils/models.utils.js";
import { BaseController } from "./index.js";

export class ConteudoController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async upload(req) {
		const local = await MulterService.upload(req, CloudinaryConstants.FILE_TYPE.IMAGEM);
		if (!local) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");
		return local;
	}

	async criar(req, res) {
		try {
			const local = await this.upload(req);

			req.body.imagem = "temp";
			await ModelsUtils.validateModelData(this.model, req.body); // valida os dados gerais

			const isValid = ValidateParamsHelpers.conteudo(req.body); // valida os dados do tipo
			if (!isValid) throw new ValidationException("Faltam campos!");

			const paths = UploadService.formatPathsArray(local);
			const cloud = await CloudStorageService.upload(paths, CloudinaryConstants.FOLDER_NAME.CONTEUDO);
			if (!cloud) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");

			req.body.imagem = cloud[0].url;

			const response = await this.service.criar(req.body);

			const revisaService = new BaseService(models.revisao);
			const revisao_response = await revisaService.criar({ conteudo: response.id });

			return ResponseService.success(res, { conteudo: response, revisao: revisao_response });
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async obter(req, res) {
		try {
			const { perfil, centro } = req.user;
			const { id } = req.params;

			const response = await this.service.obter(id, ConteudoController.#modelos_adicionais());
			if (perfil == DataConstants.PERFIL.USER) ConteudoController.#verifyRevision(response);

			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async listar(req, res) {
		try {
			const { perfil, centro } = req.user;

			const response = await this.service.listar(req.body);
			if (perfil == DataConstants.PERFIL.USER) ConteudoController.#verifyRevision(response);

			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async participando_listar(req, res) {
		try {
			const { id } = req.user;

			const response = await this.service.listar(req.body);
			ConteudoController.#verifyParticipante(response, id);

			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async listagem_listar(req, res) {
		try {
			const { perfil, centro } = req.user;

			const responseEspaco = await this.service.listar({
				...{ tipo: DataConstants.TIPO_CONTEUDO.ESPACO },
				...req.body,
			});
			const responseAtividade = await this.service.listar({
				...{ tipo: DataConstants.TIPO_CONTEUDO.ATIVIDADE },
				...req.body,
			});
			const responseEvento = await this.service.listar({ ...{ tipo: DataConstants.TIPO_CONTEUDO.EVENTO }, ...req.body });
			const responseRecomendacao = await this.service.listar({
				...{ tipo: DataConstants.TIPO_CONTEUDO.RECOMENDACAO },
				...req.body,
			});

			if (perfil == DataConstants.PERFIL.USER) {
				ConteudoController.#verifyRevision(responseEspaco);
				ConteudoController.#verifyRevision(responseAtividade);
				ConteudoController.#verifyRevision(responseEvento);
				ConteudoController.#verifyRevision(responseRecomendacao);
			}
			/*ConteudoController.#verifyCentro(responseEspaco, centro);
			ConteudoController.#verifyCentro(responseAtividade, centro);
			ConteudoController.#verifyCentro(responseEvento, centro);
			ConteudoController.#verifyCentro(responseRecomendacao, centro);*/

			return ResponseService.success(res, {
				[DataConstants.TIPO_CONTEUDO.ESPACO]: responseEspaco,
				[DataConstants.TIPO_CONTEUDO.ATIVIDADE]: responseAtividade,
				[DataConstants.TIPO_CONTEUDO.EVENTO]: responseEvento,
				[DataConstants.TIPO_CONTEUDO.RECOMENDACAO]: responseRecomendacao,
			});
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	static #verifyRevision(data) {
		for (let i = data.length - 1; i >= 0; i--) {
			if (
				data[i] && // Verifica se data[i] está definido
				data[i].revisao_conteudo && // Verifica se data[i].revisao_conteudo está definido
				data[i].revisao_conteudo[0] && // Verifica se o primeiro elemento de revisao_conteudo existe
				(data[i].revisao_conteudo[0].estado == DataConstants.ESTADO.ANALISE ||
					data[i].revisao_conteudo[0].estado == DataConstants.ESTADO.REJEITADO)
			) {
				data.splice(i, 1);
			}
		}
	}

	static #verifyParticipante(data, id) {
		for (let i = data.length - 1; i >= 0; i--) {
			if (
				!data[i] || // Verifica se data[i] está definido
				!data[i].participante_conteudo || // Verifica se participante_conteudo está definido
				data[i].participante_conteudo.length === 0 || // Verifica se participante_conteudo não está vazio
				data[i].participante_conteudo[0].utilizador !== id // Verifica se o utilizador não corresponde ao id
			) {
				data.splice(i, 1);
			}
		}
	}

	static #verifyCentro(data, user_centro) {
		for (let i = data.length - 1; i >= 0; i--) {
			if (data[i] && data[i].conteudo_utilizador && data[i].conteudo_utilizador.centro != user_centro) {
				data.splice(i, 1);
			}
		}
	}

	static #modelos_adicionais = () => {
		return [
			{
				model: models.subtopico,
				as: "conteudo_subtopico",
				include: [
					{
						model: models.topico,
						as: "subtopico_topico",
					},
				],
			},
			{
				model: models.comentario,
				as: "comentario_conteudo",
				include: [
					{
						model: models.utilizador,
						as: "comentario_utilizador",
					},
				],
			},
		];
	};
}
