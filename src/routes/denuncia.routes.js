import express from 'express';
import { URL_NAMING } from '../data/constants.js';

const router = express.Router();


export default (app, controllerClass, url_base) => {
	router.route(URL_NAMING.GET).get((req, res) => controllerClass.obter(req, res));
	router.route(URL_NAMING.CREATE).post((req, res) => controllerClass.criar(req, res));
	router.route(URL_NAMING.LIST).post((req, res) => controllerClass.listar(req, res));
	router.route(URL_NAMING.UPDATE).put((req, res) => controllerClass.atualizar(req, res));
	router.route(URL_NAMING.DELETE).delete((req, res) => controllerClass.remover(req, res));

	app.use(url_base, router);
};
