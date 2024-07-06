import { UploadException } from "../exceptions/index.js";
import { CloudStorageService } from "./index.js";
import { MulterService } from "./index.js";

export class UploadService {
	static formatPathsArray(filePaths) {
		const paths = [];
		for (const filePath of filePaths) {
			paths.push(filePath.path);
		}
		return paths;
	}

	static async upload(req, file_type, folder_name) {
		try {
			const local = await MulterService.upload(req, file_type);
			console.log("local", local);
			const paths = UploadService.formatPathsArray(local);
			console.log("paths", paths);
			const cloud = await CloudStorageService.upload(paths, folder_name);
			console.log("cloud", cloud);
			return { local, cloud };
		} catch (e) {
			throw new UploadException(e);
		}
	}
}
