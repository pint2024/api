import express from "express";
import { URL_NAMING } from "../data/constants.js";

const router = express.Router();

export const AutenticacaoRoutes = (app, controllerClass, url_base) => {
	router.route("/obter").get((req, res) => controllerClass.obter(req, res));
	router.route(URL_NAMING.UPDATE).post((req, res) => controllerClass.atualizar(req, res));
	router.route("/entrar").post((req, res) => controllerClass.entrar(req, res));
	router.route("/verificar").get((req, res) => controllerClass.verificar(req, res));

	app.use(url_base, router);
};
