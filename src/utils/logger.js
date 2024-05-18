import fs from "fs";
import { ACCESS_LOG_FILENAME } from "../data/constants.js";
import { log } from "./log.utils.js";

export function logger(req, res, next) {
	const newData = `${new Date().toISOString()} - ${req.method} ${req.url} - ${res.statusCode}\n`;
	log.access(newData);

	fs.readFile(ACCESS_LOG_FILENAME, "utf8", (err, data) => {
		if (err) {
			console.error("Erro ao ler o ficheiro de log:", err);
			next();
			return;
		}

		const newContent = newData + data;

		fs.writeFile(ACCESS_LOG_FILENAME, newContent, "utf8", (err) => {
			if (err) {
				console.error("Erro ao escrever no ficheiro de log:", err);
			}
			next();
		});
	});
}
