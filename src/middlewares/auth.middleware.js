import { ErrorException } from "../exceptions/error.exception.js";
import { AuthService } from "../services/index.js";
export const AuthMiddleware = (req, res, next) => {
	try {
		return next();
		const token = AuthService.getTokenHeader(req);
		if (token == null) throw new ErrorException("Token não existe.");

		const decoded = AuthService.verifyToken(token);
		if (AuthService.hasPermission(decoded, req.method, req.originalUrl)) {
			next();
		} else {
			throw new ErrorException("Não tem permissão.");
		}
	} catch (err) {
		throw new ErrorException(err.message);
	}
};
