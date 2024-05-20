import { modelsDirectlyAssociated } from "../utils/index.js";
import { Service } from "./index.js";

export class BaseService extends Service {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(id) {
		return await this.model.findOne({
			where: { [this.identifier]: id },
			include: modelsDirectlyAssociated(this.model),
		});
	}

	async criar(data) {
		return await this.model.create(data);
	}

	async listar(query) {
		return await this.model.findAll({
			where: { ...query },
			include: modelsDirectlyAssociated(this.model),
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
