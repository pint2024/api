import { RoutesConfig } from "./index.js";
import { LoggerMiddleware, AuthMiddleware, ErrorMiddleware } from "../middlewares/index.js";
import { Log } from "../utils/index.js";

export const RoutingConfig = async (app) => {
	app.use(LoggerMiddleware);
	app.use(AuthMiddleware);

	RoutesConfig(app);

	app.use(ErrorMiddleware);

	Log.middlewares("Middlewares inicializados.");
};
