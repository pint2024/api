import fs from "fs";
import { ConstantsData } from "../data/constants.data.js";
import { log } from "../utils/log.utils.js";

export function LoggerMiddleware(req, res, next) {
	if (req.url === "/favicon.ico") {
		next();
		return;
	}

	const newData = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode}\n`;
	log.access(newData);

	fs.readFile(ConstantsData.ACCESS_LOG_FILENAME, "utf8", (err, data) => {
		if (err) {
			log.error("Erro ao ler o ficheiro de log:", err);
			next();
			return;
		}

		const newContent = newData + data;

		fs.writeFile(ConstantsData.ACCESS_LOG_FILENAME, newContent, "utf8", (err) => {
			if (err) {
				log.error("Erro ao escrever no ficheiro de log:", err);
			}
			next();
		});
	});
}
