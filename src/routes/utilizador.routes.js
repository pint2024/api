import express from "express";
import { Constants } from "../constants/index.js";

/** 
 * * Controllers functions recebem:
 * @param app para criar as rotas
 * @param controllerClass instancia do controllerClass definido com o modelo e identificador (opcional)
 * @param url_base parametro base da rota
 */
export const UtilizadorRoutes = (app, controllerClass, url_base) => {
	const router = express.Router();

	router.route(Constants.URL_NAMING.GET).get((req, res) => controllerClass.obter(req, res));
	router.route(Constants.URL_NAMING.CREATE).post((req, res) => controllerClass.criar(req, res));
	router.route(Constants.URL_NAMING.LIST).post((req, res) => controllerClass.listar(req, res));
	router.route("/atualizar/imagem/:id").put((req, res) => controllerClass.atualizar_imagem(req, res));
	router.route(Constants.URL_NAMING.UPDATE).put((req, res) => controllerClass.atualizar(req, res));
	router.route(Constants.URL_NAMING.DELETE).delete((req, res) => controllerClass.remover(req, res));

	app.use(url_base, router);
};
