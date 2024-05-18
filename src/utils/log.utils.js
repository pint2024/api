export class log {
	static #log(log, type = "") {
		if (typeof log === "object") {
			log = JSON.stringify(log, null, 2); // Melhor visualização
		}
		console.log(`LOG${type ? ` [${type}]` : ""}: ${log}`);
	}

	static #log_file() {
		
	}

	static success(response) {
		this.#log(response, "SUCCESS");
	}

	static error(response) {
		this.#log(response, "ERROR");
		throw new Error(response);
	}

	static controllers(response) {
		this.#log(response, "CONTROLLERS");
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
}
