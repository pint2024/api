import { directory_to_filename } from './utils.js';

export class Log {
	static log(log) {
		console.log("LOG: " + log);
	}

	static success(res, response, status = 200) {
		this.log("success: " + true);
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, response, status = 500) {
		this.log("success: " + false);
		return res.status(status).json({ success: false, error: response });
	}

	static instance(filename) {
		this.log(directory_to_filename(filename) + " foi instanciado.");
	}

	static method(filename, method) {
		this.log("<" + directory_to_filename(filename) + ">." + method + " foi executado.");
	}
};
