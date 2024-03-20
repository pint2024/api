import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../data/constants.js";

export const createAuthToken = async (utilizador) => {
	let token = jwt.sign(
		{
			id: utilizador.id,
			tag: utilizador.tag,
			email: utilizador.email,
			perfil: utilizador.perfil,
			imagem: utilizador.imagem,
		},
		JWT_CONFIG.PASSWORD_SECRET,
		{ expiresIn: JWT_CONFIG.EXPIRES }
	);
	return { token };
};
