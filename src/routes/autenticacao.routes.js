import express from "express";

export const AutenticacaoRoutes = (app, controllerClass, url_base) => {
	const router = express.Router();

	router.route("/obter").get(app, (req, res) => controllerClass.obter(req, res));
	router.route("/atualizar-password").post((req, res) => controllerClass.atualizar_password(req, res));
	router.route("/atualizar").post((req, res) => controllerClass.atualizar(req, res));
	router.route("/entrar").post((req, res) => controllerClass.entrar(req, res));

	app.use(url_base, router);
};
