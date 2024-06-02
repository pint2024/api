import { ResponseService } from "../services/response.service.js";

export const ErrorMiddleware = (err, req, res, next) => {
	return ResponseService.error(res, err.message);
};
