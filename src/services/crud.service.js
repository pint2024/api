import { modelosAssociados } from "../utils/index.js";
import { BaseService } from "./index.js";

export class CrudService extends BaseService {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(id) {
		return await this.model.findOne({
			where: { [this.identifier]: id },
			include: modelosAssociados(this.model),
		});
	}

	async criar(data) {
		return await this.model.create(data);
	}

	async listar(query) {
		return await this.model.findAll({
			where: { ...query },
			include: modelosAssociados(this.model),
		});
	}

	async atualizar(id, data) {
		return await this.model.update(data, {
			where: { [this.identifier]: id },
		});
	}

	async remover(id) {
		return await this.model.destroy({
			where: { [this.identifier]: id },
		});
	}
}
