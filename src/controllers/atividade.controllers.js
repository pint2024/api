import { Log, modelosAssociados, filePath } from "../utils/__init__.js";
import { models } from "../config/database.config.js";

export default class Controller {
	constructor(model, identifier = "id") {
		this.filename = filePath(new URL(import.meta.url).pathname);
		this.model = model;
		this.identifier = identifier;
		Log.instance(this.filename);
	}

	async obter(req, res) {
		Log.method(this.filename, "obter");
		try {
			const { id } = req.params;
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: [...modelosAssociados(this.model), ...getMoreModels],
			});
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async criar(req, res) {
		Log.method(this.filename, "criar");
		try {
			const response = await this.model.create(req.body);
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async listar(req, res) {
		Log.method(this.filename, "listar");
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
		Log.method(this.filename, "atualizar");
		try {
			const { id } = req.params;
			const response = await this.model.update({ ...req.body }, { where: { [this.identifier]: id } });
			Log.success(res, response);
		} catch (error) {
			Log.error(res, error);
		}
	}

	async remover(req, res) {
		Log.method(this.filename, "remover");
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
