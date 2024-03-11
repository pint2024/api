const { JWT_CONFIG } = require("../data/constants");
const { createAuthToken } = require("../utils/autenticacaoUtils");
const { Log, modelosAssociados } = require("../utils/controllersUtils");

module.exports = class Controller {
	constructor(model, identifier = "id") {
		this.filename = __filename;
		this.model = model;
		this.identifier = identifier;
		Log.instance(this.filename);
	}

	async obter(req, res) {
		Log.method(this.filename, "obter");
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

	async tempCriarToken(req, res) {
		Log.method(this.filename, "tempCriarToken");
		try {
			const { id } = req.params;
			const utilizador = await mainModel.findOne({
				where: { [this.identifier]: id },
			});
			const response = createAuthToken(utilizador);
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async atualizar(req, res) {
		Log.method(this.filename, "atualizar");
		try {
			const { token } = req.body;
			jwt.verify(token, JWT_CONFIG.PASSWORD_SECRET, async (err, decoded) => {
				if (err) {
					Log.error(res, "Invalid refresh token: " + err);
					return;
				}
				const updatedUser = await mainModel.findOne({
					where: { utilizador_id: decoded.id },
					include: modelosAssociados(mainModel),
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
		Log.method(this.filename, "entrar");
		try {
			const { login } = req.body;
			const { senha } = req.body;

			if (!senha || !login) {
				return Log.error(res, "Campos em branco!");
			}

			const utilizador = await mainModel.findOne({
				where: { tag: login },
			});

			if (!utilizador) {
				return Log.error(res, "Utilizador não existe");
			}
			const isMatch = bcrypt.compareSync(senha, utilizador.senha);
			if ((login === utilizador.utilizador_email || login === utilizador.utilizador_tag) && isMatch) {
				if (utilizador.utilizador_confirmada) {
					await createAuthToken(res, utilizador);
				} else {
					createEmailVerificationToken(utilizador);
					Log.success(res, "Email de confirmação enviado");
				}
			} else {
				res.status(403).json({ success: false, message: "Dados de autenticação inválidos." });
			}
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async verificar(req, res) {
		Log.method(this.filename, "verificar");
		try {
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}
};
