import { sequelize, models } from "./config/database.config.js";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import initRoutes from "./routes/init.routes.js";
import { Log } from "./utils/__init__.js";
import { SV_PORT } from "./data/constants.js";

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

//Rotas
initRoutes(app);

//Listen
app.listen(app.get("port"), () => {
	Log.log("Servidor iniciado na porta " + app.get("port") + ".");
});
