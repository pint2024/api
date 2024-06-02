import { MulterConfig } from "../config/index.js";
import { MulterException } from "../exceptions/multer.exception.js";

export class UploadService {
	static async uploadLocally(req, key) {
		return new Promise((resolve, reject) => {
			MulterConfig.upload.single(key)(req, null, (err) => {
				if (err) reject(new MulterException(err));
				resolve(req.file);
			});
		});
	}

	static #uploadCloud() {}
}
