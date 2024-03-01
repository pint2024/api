const { handleSuccess, handleError } = require("../utils/routesUtils");
const models = require("../config/database.config").models;

const model = models.atividade;
const identifier = "id";

module.exports = class Controller {
	static async criar(req, res) {
		try {
			const response = await model.create(req.body);
			handleSuccess(res, response);
		} catch (error) {
			handleError(res, error);
		}
	}

	static async listar(req, res) {
		try {
			const response = await model.findAll();
			handleSuccess(res, response);
		} catch (error) {
			handleError(res, error);
		}
	}

	static async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await model.findOne({ where: { [identifier]: id } });
			handleSuccess(res, response);
		} catch (error) {
			handleError(res, error);
		}
	}

	static async atualizar(req, res) {
		try {
			const { id } = req.params;
			const response = await model.update({ ...req.body }, { where: { [identifier]: id } });
			handleSuccess(res, response);
		} catch (error) {
			handleError(res, error);
		}
	}

	static async remover(req, res) {
		try {
			const { id } = req.params;
			const response = await model.destroy({
				where: { [identifier]: id },
			});
			handleSuccess(res, response);
		} catch (error) {
			handleError(res, error);
		}
	}
};
