import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../data/constants.data.js";
import bcrypt from "bcrypt";

export class AuthService {
	static getTokenHeader = () => {
		const tokenWithBearer = req.headers["x-access-token"] || req.headers["authorization"];
		if (tokenWithBearer && tokenWithBearer.startsWith("Bearer ")) {
			return tokenWithBearer.slice(7, tokenWithBearer.length);
		}
		return null;
	};

	static createAuthToken = async (id, tag, email, perfil, imagem) => {
		return jwt.sign(
			{
				id: id,
				tag: tag,
				email: email,
				perfil: perfil,
				imagem: imagem,
			},
			JWT_CONFIG.TOKEN_AUTH_SECRET,
			{ expiresIn: JWT_CONFIG.EXPIRES }
		);
	};

	static createEmailToken = async (id, email) => {
		return jwt.sign(
			{
				id: id,
				email: email,
			},
			JWT_CONFIG.TOKEN_EMAIL_SECRET,
			{ expiresIn: JWT_CONFIG.EXPIRES }
		);
	};

	static verifyAuthToken = async (token) => {
		return jwt.verify(token, JWT_CONFIG.TOKEN_AUTH_SECRET);
	};

	static comparePassword = (senha_recebida, senha) => {
		//return bcrypt.compareSync(senha_recebida, senha);
		if (senha_recebida == senha) return true;
		return false;
	};

	static hasPermission = (user, method, path) => {
		return true;
	};
}
