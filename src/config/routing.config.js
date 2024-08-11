import { RoutesConfig } from "./index.js";
import { LoggerMiddleware, AuthMiddleware, ErrorMiddleware } from "../middlewares/index.js";
import { LogUtils } from "../utils/index.js";

export const RoutingConfig = async (app) => {
	console.log("oi");
	app.use(LoggerMiddleware);
	app.use(AuthMiddleware);

	RoutesConfig(app);

	app.use(ErrorMiddleware);

	LogUtils.log("Middlewares inicializados!", LogUtils.TIPO.MIDDLEWARES);
};
