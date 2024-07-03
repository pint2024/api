import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Constants } from "../constants/index.js";

export class AuthService {
	static getTokenHeader = (req) => {
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
			Constants.JWT_CONFIG.TOKEN_AUTH_SECRET,
			{ expiresIn: Constants.JWT_CONFIG.EXPIRES }
		);
	};

	static createEmailToken = async (id, email) => {
		return jwt.sign(
			{
				id: id,
				email: email,
			},
			Constants.JWT_CONFIG.TOKEN_EMAIL_SECRET,
			{ expiresIn: Constants.JWT_CONFIG.EXPIRES }
		);
	};

	static verifyAuthToken = async (token) => {
		return jwt.verify(token, Constants.JWT_CONFIG.TOKEN_AUTH_SECRET);
	};

	static verifyEmailToken = async (token) => {
		return jwt.verify(token, Constants.JWT_CONFIG.TOKEN_EMAIL_SECRET);
	};

	static comparePassword = (senha_recebida, senha) => {
		return bcrypt.compareSync(senha_recebida, senha);
	};

	static hasPermission = (user, method, path) => {
		return true;
	};
}
