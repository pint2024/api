import { DEFAULT_IDENTIFIER } from "../data/constants.data.js";
import { ErrorException } from "../exceptions/error.exception.js";
import { modelsDirectlyAssociated } from "../utils/index.js";
import { Service } from "./index.js";

export class BaseService extends Service {
	constructor(model, identifier = DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async obter(id) {
		try {
			return await this.model.findOne({
				where: { [this.identifier]: id },
				include: modelsDirectlyAssociated(this.model),
			});
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async criar(data) {
		try {
			return await this.model.create(data);
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async listar(query, manual_models = []) {
		try {
			return await this.model.findAll({
				where: { ...query },
				include: [...modelsDirectlyAssociated(this.model), ...manual_models],
			});
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async atualizar(id, data) {
		try {
			return await this.model.update(data, {
				where: { [this.identifier]: id },
			});
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async remover(id) {
		try {
			return await this.model.destroy({
				where: { [this.identifier]: id },
			});
		} catch (e) {
			throw new ErrorException(e);
		}
	}
}
