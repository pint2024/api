import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Constants } from "../constants/index.js";
import { Controller } from "./index.js";
import { AuthService, EmailService, ResponseService } from "../services/index.js";
import { CreedentialsWrongException, NotFoundException, ValidationException } from "../exceptions/index.js";
import { ModelsUtils } from "../utils/models.utils.js";
import { models } from "../config/index.js";

export class AutenticacaoController extends Controller {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const token = AuthService.getTokenHeader(req);
			if (!token) throw new NotFoundException("Token não foi recebido!");

			const decoded_token = await AuthService.verifyAuthToken(token);
			if (!decoded_token) throw new NotFoundException("Erro ao descodificar o token.");

			const response = await this.service.buscar(decoded_token.id, null, AutenticacaoController.#modelos_adicionais());
			if (!response) throw new NotFoundException("Utilizador não existe!");

			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const token = AuthService.getTokenHeader(req);
			if (!token) throw new NotFoundException("Token não foi recebido!");

			const decoded_token = await AuthService.verifyAuthToken(token);
			if (!decoded_token) throw new NotFoundException("Erro ao descodificar o token.");

			const response = await this.service.buscar(decoded_token.id);
			if (!response) throw new NotFoundException("Utilizador não existe!");

			const new_token = await AuthService.createAuthToken(response.id);

			return ResponseService.success(res, { token: new_token });
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
				const response = await AuthService.createAuthToken(utilizador.id);
				return ResponseService.success(res, { token: response });
			} else {
				const response = await AuthService.createAtualizarPasswordToken(utilizador.id);
				return ResponseService.message(res, "Precisa alterar a senha.", { token: response });
			}
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async forgot_password(req, res) {
		try {
			const { email } = req.body;

			const response = await this.service.buscar(email, "email");
			if (!response) throw new NotFoundException("Utilizador não existe.");

			const token = await AuthService.createForgetPasswordToken(response.id, response.email);
			await EmailService.enviaVerificacaoPassword(response.email, response.nome, token);

			return ResponseService.success(res, "Email de verificacao da palavra-passe foi enviado!");
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async reset_password(req, res) {
		try {
			const { senha, confirmacao_senha, token } = req.body;
			if (!token) throw new NotFoundException("Token não foi recebido!");
			if (senha != confirmacao_senha) throw new CreedentialsWrongException("Senhas não coincidem.");

			const decoded_token = await AuthService.verifyForgetPasswordToken(token);
			if (!decoded_token) throw new NotFoundException("Erro ao descodificar o token.");

			const response = await ModelsUtils.checkExistence(this.model, { id: decoded_token.id });
			if (!response) throw new NotFoundException("Utilizador não existe.");

			await this.service.atualizar(response.id, { senha: confirmacao_senha });

			return ResponseService.success(res, "Senha atualizada com sucesso!");
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async atualizar_password(req, res) {
		try {
			const { token, senha, senha_old } = req.body;

			const decoded_token = await AuthService.verifyAtualizarPasswordToken(token);
			if (!decoded_token) throw new NotFoundException("Erro ao descodificar o token.");

			const response = await ModelsUtils.checkExistence(this.model, { id: decoded_token.id });
			if (!response) throw new NotFoundException("Utilizador não existe.");

			if (!AuthService.comparePassword(senha_old, response.senha))
				throw new CreedentialsWrongException("Senha está incorreta.");

			await this.service.atualizar(response.id, { senha, verificado: true });
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

	static #modelos_adicionais = () => {
		return [
			{
				model: models.centro,
				as: "utilizador_centro",
			},
			{
				model: models.perfil,
				as: "utilizador_perfil",
			},
		];
	};
}
