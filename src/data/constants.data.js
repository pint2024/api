import { Utils } from "../utils/utils.js";

export const ACCESS_LOG_FILENAME = "access.log";

export const JWT_CONFIG = {
	TOKEN_AUTH_SECRET: "trMCqw7EUQn4FwRyiH9w5jW",
	TOKEN_PASSWORD_SECRET: "trMCqw7EUQn4FwRyiH9w5jW",
	TOKEN_EMAIL_SECRET: "PjC7q2wspXMhgDZ",
	TOKEN_FORGET_PASSWORD_SECRET: "7AXPRpy1rG22ZSG1hamQ",
	EXPIRES: "30d",
};

export const SV_PORT = process.env.PORT || 8000;

export const FRONTEND_URL = "http://localhost:3000";

export const FUNCION_NAMING = {
	LIST: "list",
	CREATE: "create",
	UPDATE: "update",
	DELETE: "delete",
};

export const URL_NAMING = {
	GET: "/obter/:id",
	CREATE: "/criar",
	LIST: "/listar",
	UPDATE: "/atualizar/:id",
	DELETE: "/remover/:id",
};

export const DEFAULT_IDENTIFIER = "id";
