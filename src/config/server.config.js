import { ConstantsData } from "../data/constants.data.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { log } from "../utils/log.utils.js";
dotenv.config();

export const InitServer = async (app) => {
	const { json, urlencoded } = bodyParser;

	//! Configurar CORS
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

	//! Middlewares
	app.use(json());
	app.use(urlencoded({ extended: true }));

	//! Configurações
	app.set("port", ConstantsData.SV_PORT);

	//! Listen
	app.listen(app.get("port"), () => {
		log.server("Servidor iniciado na porta " + app.get("port") + ".");
	});
};
