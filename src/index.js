import { sequelize, models } from "./config/database.config.js";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { InitRoutes } from "./routes/index.js";
import { log } from "./utils/index.js";
import { SV_PORT } from "./data/constants.js";
import { logger } from "./utils/logger.js";

const { json, urlencoded } = bodyParser;
const app = express();
dotenv.config();

// Configurar CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//Configurações
app.set("port", SV_PORT);

//Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger);

//Rotas
InitRoutes(app);

//Listen
app.listen(app.get("port"), () => {
	log.log("Servidor iniciado na porta " + app.get("port") + ".");
});
