import { Constants } from "../constants/index.js";
import { UploadException } from "../exceptions/index.js";
import { ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

export class UtilizadorController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const file = await UploadService.upload(req, "imagem", "utilizador");
			if (!file) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");
			req.body.imagem = file.cloud.public_id;
			const response = await this.service.criar(req.body);
			return ResponseService.success(res, "Imagem e dados processados com sucesso.");
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
