export class log {
	static log(log, type = "") {
		if (typeof log === 'object') {
			log = JSON.stringify(log, null, 2); // Melhor visualização
		}
		console.log(`LOG${type ? ` [${type}]` : ""}: ${log}`);
	}

	static success(response) {
		this.log(response, "SUCCESS");
	}

	static error(response) {
		this.log(response, "ERROR");
		throw new Error(response);
	}

	static endpoint(response) {
		this.log(response, "ENDPOINT");
	}

	static access(response) {
		this.log(response, "ACCESS");
	}

	static database(response) {
		this.log(response, "DATABASE");
	}

	static server(response) {
		this.log(response, "SERVER");
	}
}
