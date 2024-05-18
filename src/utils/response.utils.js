import { log } from "./index.js";

export class Response {
	static success(res, response, status = 200) {
		log.success(res, response);
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		log.error(res, error);
		return res.status(status).json({ success: false, data: {}, error: error });
	}
}
