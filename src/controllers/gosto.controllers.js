const { logSuccess, logError, logInstances, logMethods, modelosAssociados } = require("../utils/controllersUtils");

module.exports = class Controller {
	constructor(model, identifier = "id") {
		this.filename = __filename;
		this.model = model;
		this.identifier = identifier;
		logInstances(this.filename);
	}

	async obter(req, res) {
		logMethods(this.filename, "obter")
		try {
			const { id } = req.params;
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: modelosAssociados(this.model),
			});
			logSuccess(res, response);
		} catch (error) {
			logError(res, error);
		}
	}

	async criar(req, res) {
		logMethods(this.filename, "criar")
		try {
			const response = await this.model.create(req.body);
			logSuccess(res, response);
		} catch (error) {
			logError(res, error);
		}
	}

	async listar(req, res) {
		logMethods(this.filename, "listar")
		try {
			const response = await this.model.findAll({
				where: { ...req.body },
				include: modelosAssociados(this.model),
			});
			logSuccess(res, response);
		} catch (error) {
			logError(res, error);
		}
	}

	async atualizar(req, res) {
		logMethods(this.filename, "atualizar")
		try {
			const { id } = req.params;
			const response = await this.model.update({ ...req.body }, { where: { [this.identifier]: id } });
			logSuccess(res, response);
		} catch (error) {
			logError(res, error);
		}
	}

	async remover(req, res) {
		logMethods(this.filename, "remover")
		try {
			const { id } = req.params;
			const response = await this.model.destroy({
				where: { [this.identifier]: id },
			});
			logSuccess(res, response);
		} catch (error) {
			logError(res, error);
		}
	}
};
