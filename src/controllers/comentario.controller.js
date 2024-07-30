import { Constants } from "../constants/index.js";
import { ResponseService, ScheduleService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

// ! Métodos predefinidos
export class ComentarioController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const response = await this.service.criar(req.body);
			ScheduleService.enviaEmailDeAlteracoes(req.body.conteudo, false);
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
