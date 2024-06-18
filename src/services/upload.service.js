import { UploadException } from "../exceptions/index.js";
import { CloudStorageService } from "./index.js";
import { MulterService } from "./index.js";

export class UploadService {
	static #formatPathsArray(filePaths) {
		const paths = [];
		for (const filePath of filePaths) {
			paths.push(filePath.path);
		}
		return paths;
	}

	static async upload(req, file_type, folder_name) {
		try {
			const local = await MulterService.upload(req, file_type);
			const paths = UploadService.#formatPathsArray(local);
			const cloud = await CloudStorageService.upload(paths, folder_name);
			return { local, cloud };
		} catch (e) {
			throw new UploadException(e);
		}
	}

	static async upload_func(req, file_type, folder_name, criarFunc) {
		try {
			const local = await MulterService.upload(req, file_type);
			if (!local) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");

			console.log(req.body);

			const response = await criarFunc();
			if (!response) throw new NotFoundException("Objeto não existe.");

			const paths = UploadService.#formatPathsArray(local);
			const cloud = await CloudStorageService.upload(paths, folder_name);
			if (!cloud) throw new UploadException("Ocorreu um erro a fazer o upload da imagem/ficheiro.");

			return { local, cloud };
		} catch (e) {
			throw new UploadException(e);
		}
	}
}
