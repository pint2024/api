import { CloudinaryConstants, Constants } from "../constants/index.js";
import { NotFoundException, UploadException } from "../exceptions/index.js";
import { CloudStorageService, EmailService, MulterService, ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./base.controller.js";
import { models } from "../config/models.config.js";
import { ModelsUtils } from "../utils/models.utils.js";

export class UtilizadorController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async atualizar_imagem(req, res) {
		try {
			const { cloud } = await UploadService.upload(
				req,
				CloudinaryConstants.FILE_TYPE.IMAGEM,
				CloudinaryConstants.FOLDER_NAME.UTILIZADOR
			);
			const { id } = req.params;
			const response = await this.service.atualizar(id, { imagem: cloud[0].url });
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async criar(req, res) {
		try {
			const { senha } = req.body;
			const response = await this.service.criar(req.body);
			await EmailService.enviaAvisoContaCriada(response.email, response.nome, response.tag, senha);
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await this.service.obter(id, UtilizadorController.#modelos_adicionais());
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	static #modelos_adicionais = () => {
		return [
			{
				model: models.interesse,
				as: "interesse_utilizador",
				include: [
					{
						model: models.subtopico,
						as: "interesse_subtopico",
					},
				],
			},
		];
	};
}
