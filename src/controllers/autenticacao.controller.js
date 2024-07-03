import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Constants } from "../constants/index.js";
import { Controller } from "./index.js";
import { AuthService, EmailService, ResponseService } from "../services/index.js";
import { CreedentialsWrongException, NotFoundException, ValidationException } from "../exceptions/index.js";
import { ModelsUtils } from "../utils/models.utils.js";

export class AutenticacaoController extends Controller {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const token = AuthService.getTokenHeader(req);
			if (!token) return ResponseService.error("Token não foi enviado.");
			const decodedToken = jwt.verify(token, Constants.JWT_CONFIG.TOKEN_PASSWORD_SECRET);
			return ResponseService.success(res, decodedToken);
		} catch (error) {
			return ResponseService.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const { token } = req.body;
			jwt.verify(token, Constants.JWT_CONFIG.TOKEN_PASSWORD_SECRET, async (err, decoded) => {
				if (err) return ResponseService.error(res, "Invalid refresh token: " + err);

				const userData = await this.model.findOne({
					where: { utilizador_id: decoded.id },
				});

				if (!userData) return ResponseService.error(res, "User not found", 404);

				const accessToken = jwt.sign(
					{
						id: userData.id,
						tag: userData.tag,
						email: userData.email,
						perfil: userData.perfil,
						imagem: userData.imagem,
					},
					Constants.JWT_CONFIG.TOKEN_PASSWORD_SECRET,
					{ expiresIn: Constants.JWT_CONFIG.EXPIRES }
				);

				return ResponseService.success(res, accessToken);
			});
		} catch (error) {
			return ResponseService.error(res, error);
		}
	}

	async entrar(req, res) {
		try {
			const { login, senha } = req.body;
			if (!senha || !login) throw new CreedentialsWrongException("Campos em branco!");

			const utilizador = await this.model.findOne({
				where: { [Op.or]: [{ tag: login }, { email: login }] },
			});
			if (!utilizador) throw new CreedentialsWrongException("Utilizador não existe!");

			if (!AuthService.comparePassword(senha, utilizador.senha))
				throw new CreedentialsWrongException("Senha está incorreta.");

			if (utilizador.verificado) {
				const response = await AuthService.createAuthToken(
					utilizador.id,
					utilizador.tag,
					utilizador.email,
					utilizador.perfil,
					utilizador.imagem
				);
				return ResponseService.success(res, { token: response });
			} else {
				return ResponseService.success(res, "Precisa alterar a senha.");
			}
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async atualizar_password(req, res) {
		try {
			const { id, senha, senha_old } = req.body;

			const response = await ModelsUtils.checkExistence(this.model, { id });
			if (!response) throw new NotFoundException("Utilizador não existe.");

			if (!AuthService.comparePassword(senha_old, response.senha))
				throw new CreedentialsWrongException("Senha está incorreta.");

			await this.service.atualizar(id, { senha, verificado: true });
			const auth_token = await AuthService.createAuthToken(
				response.id,
				response.tag,
				response.email,
				response.perfil,
				response.imagem
			);

			return ResponseService.success(res, { token: auth_token });
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
