export class log {
	static log(log, type = "") {
		console.log(`LOG [${type}]: ${log}`);
	}

	static success(response) {
		this.log(response, "SUCCESS");
	}

	static error(response) {
		this.log(response, "ERROR");
		throw new Error(response);
	}

	static instance(response) {
		console.log(response);
		this.log(response, "INSTANCE");
	}

	static access(response) {
		this.log(response, "ACCESS");
	}
}
