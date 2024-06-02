import { MulterConfig } from "../config/index.js";
import { MulterException } from "../exceptions/multer.exception.js";

export class UploadService {
	static async upload(req, key) {
		this.#uploadSingleLocally(req, key);
	}

	static #uploadSingleLocally(req, key) {
		return new Promise((resolve, reject) => {
			MulterConfig.upload.single(key)(req, null, (err) => {
				if (err) reject(new MulterException(err));
				resolve(req.file);
			});
		});
	}

	static #uploadMultipleLocally(req, key) {
		return new Promise((resolve, reject) => {
			MulterConfig.upload.array(key)(req, null, (err) => {
				if (err) {
					reject(new MulterException(err));
				} else {
					resolve(req.files);
				}
			});
		});
	}

	static #uploadCloud() {}
}
