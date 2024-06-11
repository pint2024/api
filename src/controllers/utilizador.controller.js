import { CloudinaryConstants, Constants } from "../constants/index.js";
import { NotFoundException, UploadException } from "../exceptions/index.js";
import { CloudStorageService, MulterService, ResponseService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

export class UtilizadorController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const local = await MulterService.uploadSingleLocally(req, CloudinaryConstants.FILE_TYPE.IMAGEM);
			if (!local) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");

			const response = await this.service.criar(req.body);
			if (!response) throw new NotFoundException("Objeto não existe.");

			const cloud = await CloudStorageService.uploadCloud(local.path, CloudinaryConstants.FOLDER_NAME.UTILIZADOR);
			req.body.imagem = cloud.public_id;
			if (!local) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");

			const imagem_updated = await this.service.atualizar(response.id, {
				[CloudinaryConstants.FILE_TYPE.IMAGEM]: cloud.public_id,
			});

			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
