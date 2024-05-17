import { Log, modelosAssociados, filePath } from "../utils/index.js";
import { models } from "../config/database.config.js";
import BaseControllers from "./base.controllers.js";

export default class Controller extends BaseControllers {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: [...modelosAssociados(this.model), ...getMoreModels],
			});
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error.message);
		}
	}

	async criar(req, res) {
		try {
			const response = await this.model.create(req.body);
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async listar(req, res) {
		try {
			const response = await this.model.findAll({
				where: { ...req.body },
				include: [...modelosAssociados(this.model), ...getMoreModels],
			});
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async atualizar(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.update({ ...req.body }, { where: { [this.identifier]: id } });
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async remover(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.destroy({
				where: { [this.identifier]: id },
			});
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}
}

const getMoreModels = [
	{
		model: models.subtopico,
		as: "atividade_subtopico",
		include: [
			{
				model: models.topico,
				as: "subtopico_topico",
			},
		],
	},
];
