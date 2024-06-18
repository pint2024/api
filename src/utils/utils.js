import fs from "fs";
import path from "path";

export class Utils {
	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static toLower(str) {
		return str.toLowerCase().replace(/\s/g, "");
	}

	static toUpper(str) {
		return str.toUpperCase().replace(/\s/g, "");
	}

	static tagDefault = (nome, sobrenome) => {
		return `@${Utils.toLower(nome)}${Utils.toLower(sobrenome)}`;
	};

	static ensureDirectoryExists = (directory) => {
		if (!fs.existsSync(directory)) {
			fs.mkdirSync(directory, { recursive: true });
		}
	};

	static ensureFileExists = (filePath) => {
		const directory = path.dirname(filePath);
		if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
		if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "");
	};

	static getStackTrace() {
		const error = new Error();
		const stack = error.stack.split("\n").slice(1);
		return stack.join("\n");
	}
}
