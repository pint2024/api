import { AuthService } from "../services/index.js";
export const AuthMiddleware = (req, res, next) => {
	try {
		const headerAuthrorization = req.headers.authorization;
		if (headerAuthrorization == null) {
			next({ status: 401, message: "Token does't exist" });
			return;
		}
		const token = headerAuthrorization.replace("Bearer ", "");
		if (token == null) {
			next({ status: 401, message: "Token does't exist" });
			return;
		}
		const decoded = AuthService.verifyToken(token);
		req.user = decoded;
		if (AuthService.hasPermission(req.user, req.method, req.originalUrl)) {
			next();
		} else {
			next({ status: 403, message: "Access denied" });
		}
	} catch (err) {
		next({ status: 401, message: "Invalid or expired token" });
	}
};
