import { models } from "../config/index.js";
import { CloudinaryConstants, Constants } from "../constants/index.js";
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
			const { id } = req.params;
			const response = await this.service.obter(id, ConteudoController.#modelos_adicionais());
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
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
