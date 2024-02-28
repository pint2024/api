const JWT_CONFIG = {
	PASSWORD_SECRET: "trMCqw7EUQn4FwRyiH9w5jW",
	EMAIL_SECRET: "PjC7q2wspXMhgDZ",
	FORGET_PASSWORD_SECRET: "7AXPRpy1rG22ZSG1hamQ",
};

const SV_PORT = process.env.PORT || 8000;

const EMAIL_INFO = {
	USER: "pintegrado23@gmail.com",
	PASSWORD: "xerqqpeqtpvdkiam",
};

const FRONTEND_URL = "http://localhost:3000";

const DB_CONFIG = {
	DATABASE: "pint",
	USERNAME: "postgres",
	PASSWORD: "lucas123",
	HOST: "localhost",
	PORT: "5432",
	DIALECT: "postgres",
};


const FUNCION_NAMING = {
	LIST: "list",
	GET: "get",
	CREATE: "create",
	UPDATE: "update",
	DELETE: "delete",
}


const URL_NAMING = {
	LIST: "/list",
	GET: "/get/:id",
	CREATE: "/create",
	UPDATE: "/update/:id",
	DELETE: "/delete/:id",
};


module.exports = {
	JWT_CONFIG,
	SV_PORT,
	EMAIL_INFO,
	FRONTEND_URL,
	DB_CONFIG,
	FUNCION_NAMING,
	URL_NAMING,
};
