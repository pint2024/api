import { MulterConfig } from "../config/index.js";
import { CloudinaryConstants } from "../constants/cloudinary.constants.js";
import { CloudinaryException } from "../exceptions/cloudinary.exception.js";
import { MulterException } from "../exceptions/multer.exception.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: CloudinaryConstants.CLOUD_NAME,
	api_key: CloudinaryConstants.API_KEY,
	api_secret: CloudinaryConstants.API_SECRET,
});

export class UploadService {
	static async upload(req, key) {
		const file = await this.#uploadSingleLocally(req, key);
		const uploaded = await this.#uploadCloud(file.path);
		console.log(file, uploaded);
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

	static async #uploadCloud(filePath) {
		try {
			const result = await cloudinary.uploader.upload(filePath, {
				folder: "uploads",
			});
			return result;
		} catch (error) {
			throw new CloudinaryException(error);
		}
	}
}
