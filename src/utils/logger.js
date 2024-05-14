import fs from "fs";
import { ACCESS_LOG_FILENAME } from "../data/constants.js";
import { Log } from "./logUtils.js";

export function logger(req, res, next) {
	const log = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode}\n`;
	Log.access(log);

	fs.readFile(ACCESS_LOG_FILENAME, "utf8", (err, data) => {
		if (err) {
			console.error("Erro ao ler o ficheiro de log:", err);
			next();
			return;
		}

		const newContent = log + data;

		fs.writeFile(ACCESS_LOG_FILENAME, newContent, "utf8", (err) => {
			if (err) {
				console.error("Erro ao escrever no ficheiro de log:", err);
			}
			next();
		});
	});
}
