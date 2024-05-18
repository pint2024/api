import express from "express";
import { InitDatabase } from "./config/database.config.js";
import { InitModels } from "./models/index.js";
import { InitRoutes } from "./routes/index.js";
import { InitServer } from "./config/server.config.js";

async function main() {
	const app = express();

	//#region INICIALIZAÇÕES
	const sequelize = await InitDatabase();
	await InitModels(sequelize);
	await InitRoutes(app);
	await InitServer(app);
	//#endregion
}

main();
