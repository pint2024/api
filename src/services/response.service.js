import { Log } from "../utils/index.js";

export class ResponseService {
	static success(res, response, status = 200) {
		Log.success("Response Success");
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		Log.error("Response Error");
		console.error(error);
		return res.status(status).json({ success: false, error: error });
	}
}
