import express from "express";
import { DatabaseConfig, ModelsConfig, ServerConfig, ScheduleConfig, RoutingConfig } from "./config/index.js";

async function main() {
	const app = express();

	//#region INICIALIZAÇÕES
	const sequelize = await DatabaseConfig.connect(); // Configura e autentica-se a Base de Dados
	await ModelsConfig(sequelize); // Configura as relações entre os modelos e sincroniza as Base de Dados
	await ServerConfig(app); // Configura o servidor
	await RoutingConfig(app); // Configura os middlewares e as rotas
	await ScheduleConfig.init();
	//#endregion
}

main();
