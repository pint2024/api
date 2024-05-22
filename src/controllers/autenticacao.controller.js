import jwt from "jsonwebtoken";
import { DEFAULT_IDENTIFIER, JWT_CONFIG } from "../data/constants.data.js";
import { Response, modelsDirectlyAssociated } from "../utils/index.js";
import { Controller } from "./index.js";
import { Op } from "sequelize";
import { AuthService, EmailService } from "../services/index.js";

export class AutenticacaoController extends Controller {
	constructor(model, identifier = "DEFAULT_IDENTIFIER") {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const token = AuthService.getTokenHeader(req);
			if (!token) Response.error("Token não foi enviado.");
			const decodedToken = jwt.verify(token, JWT_CONFIG.TOKEN_PASSWORD_SECRET);
			Response.success(res, decodedToken);
		} catch (error) {
			Response.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const { token } = req.body;
			jwt.verify(token, JWT_CONFIG.TOKEN_PASSWORD_SECRET, async (err, decoded) => {
				if (err) return Response.error(res, "Invalid refresh token: " + err);

				const userData = await this.model.findOne({
					where: { utilizador_id: decoded.id },
				});

				if (!userData) return Response.error(res, "User not found", 404);

				const accessToken = jwt.sign(
					{
						id: userData.id,
						tag: userData.tag,
						email: userData.email,
						perfil: userData.perfil,
						imagem: userData.imagem,
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
			if (!senha || !login) return Response.error(res, "Campos em branco!");

			const utilizador = await this.model.findOne({
				where: { [Op.or]: [{ tag: login }, { email: login }] },
			});

			if (!utilizador) return Response.error(res, "Utilizador não existe!");

			if (AuthService.comparePassword(senha, utilizador.senha)) {
				if (!utilizador.verificado) {
					const response = await AuthService.createAuthToken(
						utilizador.id,
						utilizador.tag,
						utilizador.email,
						utilizador.perfil,
						utilizador.imagem
					);
					Response.success(res, response);
				} else {
					await EmailService.sendEmail(utilizador, await AuthService.createEmailToken());
					Response.success(res, "Email de confirmação enviado");
				}
			} else {
				Response.error(res, "Senha está errada.")
			}
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async verificar(req, res) {
		// verifica o token do email
		try {
			//Response.success(res, response);
		} catch (error) {
			Response.error(res, error);
		}
	}
}
