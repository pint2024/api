import { LogUtils, Utils } from "../utils/index.js";
import { StatusConstants } from "../constants/index.js";

import { LogUtils, Utils } from "../utils/index.js";
import { StatusConstants } from "../constants/index.js";

export class ResponseService {
	static success(res, response) {
		LogUtils.log("Response Success", LogUtils.TIPO.RESPONSE);
		return res.status(StatusConstants.CODES.OK).json({ success: true, data: response });
	}

	static error(res, error) {
		LogUtils.error("Response Error", LogUtils.TIPO.RESPONSE);
		console.error(error);
		console.log("\nStack Trace:");
		console.log(Utils.getStackTrace());
		return res.status(StatusConstants.CODES.BAD_REQUEST).json({ success: false, error: error });
	}

	static unauthorized(res, message = "Unauthorized access") {
		LogUtils.log("Response Unauthorized", LogUtils.TIPO.RESPONSE);
		return res.status(StatusConstants.CODES.UNAUTHORIZED).json({ success: false, error: message });
	}
}
