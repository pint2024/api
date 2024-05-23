import { Response } from "../utils/index.js";

export const ErrorMiddleware = (err, req, res, next) => {
	return Response.error(res, err.message);
};
