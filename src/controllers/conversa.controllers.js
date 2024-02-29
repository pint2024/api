const models = require("../config/database.config").models;

const model = models.conversa;
const identifier = "id";

module.exports = class Controller {
	static async criar(req, res) {
		try {
			const response = await model.create(req.body);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async listar(req, res) {
		try {
			const response = await model.findAll();
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async obter(req, res) {
		try {
			const { id } = req.params;
			const categoria = await model.findOne({ where: { [identifier]: id } });
			res.status(200).json(categoria);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async atualizar(req, res) {
		try {
			const { id } = req.params;
			const response = await model.update({ ...req.body }, { where: { [identifier]: id } });
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	static async remover(req, res) {
		try {
			const { id } = req.params;
			const response = await model.destroy({
				where: { [identifier]: id },
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};
