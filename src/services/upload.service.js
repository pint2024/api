import { UploadException } from "../exceptions/index.js";
import { CloudStorageService } from "./index.js";
import { MulterService } from "./index.js";

export class UploadService {
	static async uploadSingle(req, key, cloud_folder) {
		try {
			const local = await MulterService.uploadSingleLocally(req, key);
			const cloud = await CloudStorageService.uploadCloud(local.path, cloud_folder);
			return { local, cloud };
		} catch (error) {
			throw new UploadException(error);
		}
	}

	static async uploadMultiple(req, key, cloud_folder) {
		const local = await MulterService.uploadSingleLocally(req, key);
		const cloud = await CloudStorageService.uploadCloud(local.path, cloud_folder);
		return { local, cloud };
	}
}
