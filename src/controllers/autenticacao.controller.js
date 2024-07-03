import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Constants } from "../constants/index.js";
import { Controller } from "./index.js";
import { AuthService, EmailService, ResponseService } from "../services/index.js";
import { CreedentialsWrongException, NotFoundException, ValidationException } from "../exceptions/index.js";

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

			if (AuthService.comparePassword(senha, utilizador.senha)) {
				if (utilizador.verificado) {
					const response = await AuthService.createAuthToken(
						utilizador.id,
						utilizador.tag,
						utilizador.email,
						utilizador.perfil,
						utilizador.imagem
					);
					return ResponseService.success(res, response);
				} else {
					const token = await AuthService.createEmailToken(utilizador.id, utilizador.email);
					await EmailService.mandaConfirmacao(utilizador.email, utilizador.nome + " " + utilizador.sobrenome, token);
					return ResponseService.success(res, "Email de confirmação enviado");
				}
			} else {
				throw new CreedentialsWrongException("Senha está errada.");
			}
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async verificar(req, res) {
		try {
			const { token } = req.params;
			
			const decoded_token = await AuthService.verifyEmailToken(token);
			console.log("a", decoded_token);
			if (!decoded_token && !decoded_token.id && !decoded_token.email)
				throw new CreedentialsWrongException("O token não é válido.");

			const response = await this.model.findOne({ where: { id: decoded_token.id, email: decoded_token.email } });
			if (!response) throw new NotFoundException("Utilizador não existe.");
			if (response.verificado) throw new ValidationException("Conta já esta verificada!");

			await this.model.update({ verificado: true }, { where: { id: response.id } });
			const auth_token = await AuthService.createAuthToken(
				response.id,
				response.tag,
				response.email,
				response.perfil,
				response.imagem
			);
			return ResponseService.success(res, auth_token);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
