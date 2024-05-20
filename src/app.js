import express from "express";
import { InitDatabase, InitModels, InitRoutes, InitServer } from "./config/index.js";

async function main() {
	const app = express();

	//#region INICIALIZAÇÕES
	const sequelize = await InitDatabase();
	await InitModels(sequelize);
	await InitServer(app);
	await InitRoutes(app);
	//#endregion
}

main();
