import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConstants } from "../constants/index.js";
import { CloudinaryException } from "../exceptions/index.js";

cloudinary.config({
	cloud_name: CloudinaryConstants.CREEDENTIALS.CLOUD_NAME,
	api_key: CloudinaryConstants.CREEDENTIALS.API_KEY,
	api_secret: CloudinaryConstants.CREEDENTIALS.API_SECRET,
});

export class CloudStorageService {
	static async uploadCloud(filePath, folder) {
		try {
			return await cloudinary.uploader.upload(filePath, { folder: folder });
		} catch (error) {
			throw new CloudinaryException(error);
		}
	}
}
