import { models } from "../config/index.js";
import { Constants } from "../constants/index.js";
import { UploadException } from "../exceptions/index.js";
import { ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./index.js";

export class ConteudoController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const file = await UploadService.uploadSingle(req, "imagem", "conteudo");
			if (!file) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");
			req.body.imagem = file.cloud.public_id;
			const response = await this.service.criar(req.body);
			return ResponseService.success(res, response);
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
