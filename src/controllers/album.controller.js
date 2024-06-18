import { CloudinaryConstants, Constants } from "../constants/index.js";
import { UploadException } from "../exceptions/index.js";
import { CloudStorageService, MulterService, ResponseService, UploadService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

export class AlbumController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const model = this.model.build(req.body);

			await model.validate();

			//await UploadService.upload(req, CloudinaryConstants.FILE_TYPE.IMAGEM, CloudinaryConstants.FOLDER_NAME.ALBUM);
			//console.log(req.body)

			await UploadService.upload_func(
				req,
				CloudinaryConstants.FILE_TYPE.IMAGEM,
				CloudinaryConstants.FOLDER_NAME.ALBUM,
				() => this.service.criar(req.body)
			);

			/*const response = await this.service.criar(req.body);
			if (!response) throw new NotFoundException("Objeto não existe.");
*/
			return ResponseService.success(res, "nada");
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
