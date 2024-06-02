import { Constants } from "../constants/index.js";
import { ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

export class UtilizadorController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const file = await UploadService.uploadLocally(req, "imagem");

			return ResponseService.success(res, "Imagem e dados processados com sucesso");
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
