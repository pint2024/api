import { modelosAssociados, Response } from "../utils/index.js";
import { BaseControllers } from "./index.js";

export default class Controller extends BaseControllers {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: modelosAssociados(this.model),
			});
			if (response == null) throw new Error("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async criar(req, res) {
		try {
			const response = await this.model.create(req.body);
			if (response == null) throw new Error("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async listar(req, res) {
		try {
			const response = await this.model.findAll({
				where: { ...req.body },
				include: modelosAssociados(this.model),
			});
			if (response == null) throw new Error("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async atualizar(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.update({ ...req.body }, { where: { [this.identifier]: id } });
			if (response == null) throw new Error("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async remover(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.destroy({
				where: { [this.identifier]: id },
			});
			if (response == null) throw new Error("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}
}
