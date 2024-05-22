import express from "express";
import { URL_NAMING } from "../data/constants.data.js";

export const AutenticacaoRoutes = (app, controllerClass, url_base) => {
	const router = express.Router();

	router.route("/obter").get(app, (req, res) => controllerClass.obter(req, res));
	router.route("/atualizar").post((req, res) => controllerClass.atualizar(req, res));
	router.route("/entrar").post((req, res) => controllerClass.entrar(req, res));
	router.route("/verificar").get((req, res) => controllerClass.verificar(req, res));

	app.use(url_base, router);
};
