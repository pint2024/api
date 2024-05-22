import { DEFAULT_IDENTIFIER } from "../data/constants.data.js";
import { ErrorException } from "../exceptions/error.exception.js";
import { Response } from "../utils/index.js";
import { Controller } from "./controller.js";

// ! Métodos predefinidos
export class BaseController extends Controller {
	constructor(model, identifier = DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await this.service.obter(id);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async criar(req, res) {
		try {
			const response = await this.service.criar(req.body);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async listar(req, res) {
		try {
			const response = await this.service.listar(req.body);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async atualizar(req, res) {
		try {
			const { id } = req.params;
			const response = await this.service.atualizar(id, req.body);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}

	async remover(req, res) {
		try {
			const { id } = req.params;
			const response = await this.service.remover(id);
			if (!response) throw new ErrorException("Objeto não encontrado.");
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error.message);
		}
	}
}
