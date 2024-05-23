import { ConstantsData } from "../data/constants.data.js";
import { ErrorException } from "../exceptions/error.exception.js";
import { modelsDirectlyAssociated } from "../utils/index.js";
import { Service } from "./index.js";

export class BaseService extends Service {
	constructor(model, identifier = ConstantsData.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async obter(id) {
		try {
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: modelsDirectlyAssociated(this.model),
			});
			if (!response) throw new ErrorException("Objeto não encontrado.");
			return response;
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async criar(data) {
		try {
			const response = await this.model.create(data);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			return response;
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async listar(query, manual_models = []) {
		try {
			const response = await this.model.findAll({
				where: { ...query },
				include: [...modelsDirectlyAssociated(this.model), ...manual_models],
			});
			if (!response) throw new ErrorException("Objeto não encontrado.");
			return response;
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async atualizar(id, data) {
		try {
			const response = await this.model.update(data, {
				where: { [this.identifier]: id },
			});
			if (!response) throw new ErrorException("Objeto não encontrado.");
			return response;
		} catch (e) {
			throw new ErrorException(e);
		}
	}

	async remover(id) {
		try {
			const response = await this.model.destroy({
				where: { [this.identifier]: id },
			});
			if (!response) throw new ErrorException("Objeto não encontrado.");
			return response;
		} catch (e) {
			throw new ErrorException(e);
		}
	}
}
