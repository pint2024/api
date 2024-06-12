import fs from "fs";
import { Constants } from "../constants/index.js";
import { LogUtils, Utils } from "../utils/index.js";
import { DateUtils } from "../utils/index.js";

export function LoggerMiddleware(req, res, next) {
	if (req.url === "/favicon.ico") return next();

	Utils.ensureFileExists(Constants.ACCESS_LOG_FILENAME);

	const { method, url, statusCode } = req;
	const currentDate = DateUtils.getCurrentISODateAndTime();

	console.log(req);

	const newData = `${currentDate} - ${method} ${url} - ${statusCode}`;

	fs.readFile(Constants.ACCESS_LOG_FILENAME, "utf8", (err, data) => {
		if (err) {
			LogUtils.error("Erro ao ler o ficheiro de log!", LogUtils.TIPO.REQUEST);
			return next();
		}

		const newContent = newData + "\n" + data;

		fs.writeFile(Constants.ACCESS_LOG_FILENAME, newContent, "utf8", (err) => {
			if (err) {
				LogUtils.error("Erro ao ler o ficheiro de log!", LogUtils.TIPO.REQUEST);
				return next();
			}
			return next();
		});
	});

	LogUtils.log(newData, LogUtils.TIPO.REQUEST);
}
