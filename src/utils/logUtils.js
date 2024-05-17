import { directory_to_filename } from "./utils.js";

export class Log {
	static log(log, type = "") {
		console.log(`LOG [${type}]: ${log}`);
	}

	static success(response) {
		this.log(response, "SUCCESS");
	}

	static error(response) {
		this.log(response, "ERROR");
	}

	static instance(response) {
		console.log(response)
		this.log(response, "INSTANCE");
	}

	static access(response) {
		this.log(response, "ACCESS");
	}
}
