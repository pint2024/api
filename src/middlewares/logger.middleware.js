import fs from "fs";
import { Constants } from "../constants/index.js";
import { Log } from "../utils/index.js";
import { DateUtils } from "../utils/index.js";

export function LoggerMiddleware(req, res, next) {
	if (req.url === "/favicon.ico") return next();

	const newData = `${DateUtils.getCurrentISODateAndTime()} - ${req.method} ${req.url} - ${res.statusCode}`;
	Log.access(newData);

	fs.readFile(Constants.ACCESS_LOG_FILENAME, "utf8", (err, data) => {
		if (err) {
			Log.error("Erro ao ler o ficheiro de log:", err);
			return next();
		}

		const newContent = newData + "\n" + data;

		fs.writeFile(Constants.ACCESS_LOG_FILENAME, newContent, "utf8", (err) => {
			if (err) {
				Log.error("Erro ao escrever no ficheiro de log:", err);
				return next();
			}
			next();
		});
	});
}
