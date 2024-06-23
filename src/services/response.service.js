import { LogUtils, Utils } from "../utils/index.js";
import { StatusConstants } from "../constants/index.js";

export class ResponseService {
	static success(res, response, status = 200) {
		LogUtils.log("Response Success", LogUtils.TIPO.RESPONSE);
		return res.status(status).json({ success: true, data: response });
	}

	static error(res, error, status = 500) {
		LogUtils.error("Response Error", LogUtils.TIPO.RESPONSE);
		console.error(error);
		console.log("\nStack Trace:");
		console.log(Utils.getStackTrace());
		return res.status(status).json({ success: false, error: error });
	}

	static unauthorizedError(message) {
		return {
			success: false,
			message,
			error: "Unauthorized",
			status: StatusConstants.statusCodes.unauthorized,
		};
	}

	static forbiddenError(message) {
		return {
			success: false,
			message,
			error: "Forbidden",
			status: StatusConstants.statusCodes.forbidden,
		};
	}

	static notFoundError(message) {
		return {
			success: false,
			message,
			error: "Not Found",
			status: StatusConstants.statusCodes.notFound,
		};
	}

	static internalServerError(message) {
		return {
			success: false,
			message,
			error: "Internal Server Error",
			status: StatusConstants.statusCodes.internalServerError,
		};
	}

	static serviceUnavailableError(message) {
		return {
			success: false,
			message,
			error: "Service Unavailable",
			status: StatusConstants.statusCodes.serviceUnavailable,
		};
	}
}
