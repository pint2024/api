import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../data/constants.js";
import { Response, modelsDirectlyAssociated } from "../utils/index.js";
import { Controller } from "./index.js";
import { Op } from "sequelize";
import { AuthUtils } from "../utils/auth.utils.js";

export class AutenticacaoController extends Controller {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(req, res) {
		const token = AuthUtils.getTokenHeader(req);
		if (!token)
			Response.error("Token não foi enviado.");
		try {
			const decodedToken = jwt.verify(token, JWT_CONFIG.TOKEN_PASSWORD_SECRET);
			const response = {
				id: decodedToken.id,
				tag: decodedToken.tag,
				email: decodedToken.email,
				perfil: decodedToken.perfil,
				imagem: decodedToken.imagem,
			};
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const { token } = req.body;
			jwt.verify(token, JWT_CONFIG.TOKEN_PASSWORD_SECRET, async (err, decoded) => {
				if (err) {
					Response.error(res, "Invalid refresh token: " + err);
					return;
				}
				const updatedUser = await this.model.findOne({
					where: { utilizador_id: decoded.id },
					include: modelsDirectlyAssociated(this.model),
				});
				if (!updatedUser) {
					Response.error(res, "User not found", 404);
					return;
				}
				const accessToken = jwt.sign(
					{
						id: updatedUser.id,
						tag: updatedUser.tag,
						email: updatedUser.email,
						perfil: updatedUser.perfil,
						imagem: updatedUser.imagem,
					},
					JWT_CONFIG.TOKEN_PASSWORD_SECRET,
					{ expiresIn: JWT_CONFIG.EXPIRES }
				);
				Response.success(res, accessToken);
			});
		} catch (error) {
			Response.error(res, error);
		}
	}

	async entrar(req, res) {
		try {
			const { login, senha } = req.body;

			if (!senha || !login)
				return Response.error(res, "Campos em branco!");

			const utilizador = await this.model.findOne({
				where: {
					[Op.or]: [{ tag: login }, { email: login }],
				},
			});

			if (!utilizador)
				return Response.error(res, "Utilizador não existe!");

			if (AuthUtils.comparePassword(senha, utilizador.senha)) {
				if (utilizador.verificado) {
					const response = await AuthUtils.createAuthToken(
						utilizador.id,
						utilizador.tag,
						utilizador.email,
						utilizador.perfil,
						utilizador.imagem
					);
					Response.success(res, response);
				} else {
					createEmailVerificationToken(utilizador);
					Response.success(res, "Email de confirmação enviado");
				}
			} else {
				res.status(403).json({ success: false, message: "Senha está errada." });
			}
		} catch (error) {
			Response.error(res, error);
		}
	}

	async verificar(req, res) {
		try {
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error);
		}
	}
}
