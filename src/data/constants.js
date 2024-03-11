const JWT_CONFIG = {
	PASSWORD_SECRET: "trMCqw7EUQn4FwRyiH9w5jW",
	EMAIL_SECRET: "PjC7q2wspXMhgDZ",
	FORGET_PASSWORD_SECRET: "7AXPRpy1rG22ZSG1hamQ",
	EXPIRES: "30d"
};


const SV_PORT = process.env.PORT || 8000;


const FRONTEND_URL = "http://localhost:3000";


/*const DB_CONFIG = { // cloud
	DATABASE: "pint_r71c",
	USERNAME: "manager",
	PASSWORD: "2Tes25NellX6Es9MM92Mg1a5g59Jz5J3",
	HOST: "dpg-cnge0pq1hbls73fq15vg-a.frankfurt-postgres.render.com",
	PORT: "5432",
	DIALECT: "postgres",
};*/


const DB_CONFIG = { // local, editar!
	DATABASE: "pint",
	USERNAME: "postgres",
	PASSWORD: "lucas123",
	HOST: "localhost",
	PORT: "5432",
	DIALECT: "postgres",
};


const FUNCION_NAMING = {
	LIST: "list",
	CREATE: "create",
	UPDATE: "update",
	DELETE: "delete",
};


const URL_NAMING = {
	GET: "/obter/:id",
	CREATE: "/criar",
	LIST: "/listar",
	UPDATE: "/atualizar/:id",
	DELETE: "/remover/:id",
};


const EMAIL_INFO = {
	USER: "pintegrado23@gmail.com",
	PASSWORD: "xerqqpeqtpvdkiam",
};


module.exports = {
	JWT_CONFIG,
	SV_PORT,
	FRONTEND_URL,
	DB_CONFIG,
	FUNCION_NAMING,
	URL_NAMING,
	EMAIL_INFO,
};
