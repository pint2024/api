import { Response, modelsDirectlyAssociated } from "../utils/index.js";
import { Service } from "./index.js";

export class BaseService extends Service {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(id) {
		try {
			return await this.model.findOne({
				where: { [this.identifier]: id },
				include: modelsDirectlyAssociated(this.model),
			});
		} catch (e) {
			throw Error(e);
		}
	}

	async criar(data) {
		try {
			return await this.model.create(data);
		} catch (e) {
			throw Error(e);
		}
	}

	async listar(query, manual_models = []) {
		try {
			return await this.model.findAll({
				where: { ...query },
				include: [...modelsDirectlyAssociated(this.model), ...manual_models],
			});
		} catch (e) {
			throw Error(e);
		}
	}

	async atualizar(id, data) {
		try {
			return await this.model.update(data, {
				where: { [this.identifier]: id },
			});
		} catch (e) {
			throw Error(e);
		}
	}

	async remover(id) {
		try {
			return await this.model.destroy({
				where: { [this.identifier]: id },
			});
		} catch (e) {
			throw Error(e);
		}
	}
}
