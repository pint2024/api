import { log } from "./index.js";

export class Response {
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
	static success(res, response, status = 200) {
		log.success("Response Success");
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		log.error("Response Error");
		console.error(error);
		return res.status(status).json({ success: false, error: error });
	}
}
