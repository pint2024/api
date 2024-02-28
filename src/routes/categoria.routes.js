const Controller = require("../controllers/categoria.controllers.js");
const router = require("express").Router();
const { URL_NAMING, FUNCION_NAMING } = require("../data/constants.js");

module.exports = (app) => {
	router.route("/criar").post((req, res) => Controller.criar(req, res));

	router.route("/listar").get((req, res) => Controller.listar(req, res));

	router.route("/obter/:id").get((req, res) => Controller.obter(req, res));

	router.route("/atualizar/:id").put((req, res) => Controller.atualizar(req, res));

	router.route("/remover/:id").delete((req, res) => Controller.remover(req, res));

	app.use("/categoria", router);
};
