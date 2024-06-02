import { MulterConfig } from "../config/index.js";
import { CloudinaryConstants } from "../constants/index.js";
import { CloudinaryException, MulterException } from "../exceptions/index.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: CloudinaryConstants.CLOUD_NAME,
	api_key: CloudinaryConstants.API_KEY,
	api_secret: CloudinaryConstants.API_SECRET,
});

export class UploadService {
	static async upload(req, key, cloud_folder) {
		const local = await this.#uploadSingleLocally(req, key);
		const cloud = await this.#uploadCloud(local.path, cloud_folder);
		return { local, cloud };
	}

	static async #uploadSingleLocally(req, key) {
		return new Promise((resolve, reject) => {
			MulterConfig.upload.single(key)(req, null, (err) => {
				if (err) reject(new MulterException(err));
				resolve(req.file);
			});
		});
	}

	static async #uploadMultipleLocally(req, key) {
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

	static async #uploadCloud(filePath, folder) {
		try {
			const result = await cloudinary.uploader.upload(filePath, { folder: folder });
			return result;
		} catch (error) {
			throw new CloudinaryException(error);
		}
	}
}
