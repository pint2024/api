import { log } from "./index.js";

export class Response {
	static success(res, response, status = 200) {
		log.success("Response Success");
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		log.error("Response Error");
		return res.status(status).json({ success: false, data: {}, error: error });
	}
}
