import { DateUtils } from "./index.js";

export class Log {
	static #log(log, type = "") {
		
		console.log(`${DateUtils.getCurrentTime()} - LOG${type ? ` [${type}]` : ""}:`);
		console.log(log);
		console.log();
	}

	static #log_file() {}

	static success(response) {
		this.#log(response, "SUCCESS");
	}

	static error(response) {
		this.#log(response, "ERROR");
	}

	static controllers(response) {
		this.#log(response, "CONTROLLERS");
	}

	static service(response) {
		this.#log(response, "SERVICE");
	}

	static access(response) {
		this.#log(response, "ACCESS");
	}

	static database(response) {
		this.#log(response, "DATABASE");
	}

	static server(response) {
		this.#log(response, "SERVER");
	}

	static models(response) {
		this.#log(response, "MODELS");
	}

	static routes(response) {
		this.#log(response, "ROUTES");
	}

	static middlewares(response) {
		this.#log(response, "MIDDLEWARES");
	}

	static email(response) {
		this.#log(response, "EMAIL");
	}

	static schedule(response) {
		this.#log(response, "SCHEDULE");
	}
}
