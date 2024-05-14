import { directory_to_filename } from "./utils.js";

export class Log {
	static log(log, type = "") {
		console.log("LOG [" + type + "]: " + log);
	}

	static success(res, response, status = 200) {
		this.log("success: " + true);
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, response, status = 500) {
		this.log("erro: " + response, "Error");
		return res.status(status).json({ success: false, error: response });
	}

	static instance(filename) {
		this.log(directory_to_filename(filename) + " foi instanciado.", "Instance");
	}

	static access(info) {
		this.log(info, "Access");
	}
}
