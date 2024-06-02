export class CloudinaryConstants {
	static CLOUDINARY_CREEDENTIALS = {
		CLOUD_NAME: process.env.CD_CLOUD_NAME,
		API_KEY: process.env.CD_API_KEY,
		API_SECRET: process.env.CD_API_SECRET,
		API_ENVIRONMENT_VARIABLE: process.env.CD_API_ENVIRONMENT_VARIABLE,
	};
}
