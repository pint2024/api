import { Constants } from "../constants/index.js";
import { UploadException } from "../exceptions/index.js";
import { ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

export class AlbumController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const { local, cloud } = await UploadService.uploadSingle(req, "imagem", "conteudo");
			if (!cloud) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");
			req.body.imagem = cloud.public_id;
			const response = await this.service.criar(req.body);
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
