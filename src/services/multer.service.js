import { MulterConfig } from "../config/index.js";
import { MulterException } from "../exceptions/index.js";

export class MulterService {
	static async uploadSingleLocally(req, key) {
		return new Promise((resolve, reject) => {
			MulterConfig.upload.single(key)(req, null, (err) => {
				if (err) reject(new MulterException(err));
				resolve(req.file);
			});
		});
	}

	static async uploadMultipleLocally(req, key) {
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
}
