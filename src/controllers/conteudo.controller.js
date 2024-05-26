import { Constants } from "../constants/index.js";
import { Response } from "../utils/index.js";
import { BaseController } from "./base.controller.js";

export class ConteudoController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const { tipo } = req.body;
			const response = await this.service.criar(req.body);
			return Response.success(res, response);
		} catch (error) {
			return Response.error(res, error.message);
		}
	}
}
