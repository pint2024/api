const JWT_CONFIG = {
	PASSWORD_SECRET: "trMCqw7EUQn4FwRyiH9w5jW",
	EMAIL_SECRET: "PjC7q2wspXMhgDZ",
	FORGET_PASSWORD_SECRET: "7AXPRpy1rG22ZSG1hamQ",
};

const PORT = process.env.PORT || 8000;

const EMAIL_INFO = {
	USER: "pintegrado23@gmail.com",
	PASSWORD: "xerqqpeqtpvdkiam",
};

const FRONTEND_URL = "http://localhost:3000";

const DB_CONFIG = {
	DATABASE: process.env.DB_DATABASE,
	USERNAME: process.env.DB_USERNAME,
	PASSWORD: process.env.DB_PASSWORD,
	HOST: process.env.DB_HOST,
	PORT: process.env.DB_PORT,
	DIALECT: process.env.DB_DIALECT,
};

export default {
	JWT_CONFIG,
	PORT,
	EMAIL_INFO,
	FRONTEND_URL,
	DB_CONFIG,
};
