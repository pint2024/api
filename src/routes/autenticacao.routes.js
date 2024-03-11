const router = require("express").Router();
const { URL_NAMING } = require("../data/constants.js");


module.exports = (app, controllerClass, url_base) => {
	router.route(URL_NAMING.GET).get((req, res) => controllerClass.obter(req, res));
	router.route("temp").get((req, res) => controllerClass.tempCriarToken(req, res));
	router.route(URL_NAMING.UPDATE).post((req, res) => controllerClass.atualizar(req, res));
	router.route("/entrar").post((req, res) => controllerClass.entrar(req, res));
	router.route("/verificar").get((req, res) => controllerClass.verificar(req, res));

	app.use(url_base, router);
};
