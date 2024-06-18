import { LogUtils, Utils } from "../utils/index.js";

export class ResponseService {
	static success(res, response, status = 200) {
		LogUtils.log("Response Success", LogUtils.TIPO.RESPONSE);
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		LogUtils.error("Response Error", LogUtils.TIPO.RESPONSE);
		console.error(error);
		console.log("\nStack Trace:")
		console.log(Utils.getStackTrace());
		return res.status(status).json({ success: false, error: error });
	}
}
