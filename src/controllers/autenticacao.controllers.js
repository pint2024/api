import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../data/constants.js";
import { createAuthToken, Log, modelosAssociados, filePath } from "../utils/index.js";
import bcrypt from "bcrypt";
import { BaseControllers } from "./index.js";

export default class Controller extends BaseControllers {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(req, res) {
		let token = req.headers["x-access-token"] || req.headers["authorization"];
		if (token && token.startsWith("Bearer ")) token = token.slice(7, token.length);
		try {
			const decodedToken = jwt.verify(token, JWT_CONFIG.PASSWORD_SECRET);
			const response = {
				id: decodedToken.id,
				tag: decodedToken.tag,
				email: decodedToken.email,
				perfil: decodedToken.perfil,
				imagem: decodedToken.imagem,
			};
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const { token } = req.body;
			jwt.verify(token, JWT_CONFIG.PASSWORD_SECRET, async (err, decoded) => {
				if (err) {
					Log.error(res, "Invalid refresh token: " + err);
					return;
				}
				const updatedUser = await this.model.findOne({
					where: { utilizador_id: decoded.id },
					include: modelosAssociados(this.model),
				});
				if (!updatedUser) {
					Log.error(res, "User not found", 404);
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
					JWT_CONFIG.PASSWORD_SECRET,
					{ expiresIn: JWT_CONFIG.EXPIRES }
				);
				Log.success(res, accessToken);
			});
		} catch (error) {
			Log.error(res, error);
		}
	}

	async entrar(req, res) {
		try {
			const { login, senha } = req.body;

			console.log(login, senha);

			if (!senha || !login) return Log.error(res, "Campos em branco!");

			const utilizador = await this.model.findOne({
				where: { tag: login },
			});

			console.log(login, senha, utilizador);

			if (!utilizador) return Log.error(res, "Utilizador não existe!");

			const x = bcrypt.compareSync(senha, utilizador.senha);

			console.log(x);

			if (x) {
				// verifica se a senha encriptada recebida é igual a senha encriptada guardada
				if (utilizador.verificado) {
					const response = await createAuthToken(utilizador);
					Log.success(res, response);
				} else {
					createEmailVerificationToken(utilizador);
					Log.success(res, "Email de confirmação enviado");
				}
			} else {
				res.status(403).json({ success: false, message: "Senha está errada." });
			}
		} catch (error) {
			Log.error(res, error);
		}
	}

	async verificar(req, res) {
		try {
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}
}
