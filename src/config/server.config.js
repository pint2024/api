import { logger, log } from "../utils/index.js";
import { SV_PORT } from "../data/constants.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

export const InitServer = async (app) => {
	const { json, urlencoded } = bodyParser;

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

	//Middlewares
	app.use(json());
	app.use(urlencoded({ extended: true }));
	app.use(logger);

	//Configurações
	app.set("port", SV_PORT);

	//Listen
	app.listen(app.get("port"), () => {
		log.server("Servidor iniciado na porta " + app.get("port") + ".");
	});
};
