const { directory_to_filename } = require('./utils');

module.exports = class Log {
	static log(log) {
		console.log("LOG: " + log);
	}

	static success(res, response, status = 200) {
		res.status(status).json({ success: true, data: response });
		this.log("success: " + true);
	}

	static error(res, response, status = 500) {
		res.status(status).json({ success: false, error: response });
		this.log("success: " + false);
	}

	static instance(filename) {
		this.log(directory_to_filename(filename) + " foi instanciado.");
	}

	static method(filename, method) {
		this.log("<" + directory_to_filename(filename) + ">." + method + " foi executado.");
	}
};
