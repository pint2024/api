import { models } from "../config/index.js";
import { Constants } from "../constants/index.js";
import { BaseService, ResponseService, ScheduleService } from "../services/index.js";
import { BaseController } from "./base.controller.js";

// ! Métodos predefinidos
export class ComentarioController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const response = await this.service.criar(req.body);
			const revisaoService = new BaseService(models.revisao);
			const revisao_response = await revisaoService.criar({ comentario: response.id });

			ScheduleService.enviaEmailDeAlteracoes(req.body.conteudo, false);
			return ResponseService.success(res, { conteudo: response, revisao: revisao_response });
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	async revisao_listar(req, res) {
		try {
			const { centro } = req.user;
			const response = await this.service.simples_listar(req.body, ComentarioController.#modelos_adicionais_revisao());
			ComentarioController.#verifyCentro(response, centro);
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}

	static #verifyCentro(data, user_centro) {
		for (let i = data.length - 1; i >= 0; i--) {
			console.log(data[i].comentario_utilizador.centro, user_centro);
			if (data[i] && data[i].comentario_utilizador && data[i].comentario_utilizador.centro != user_centro) {
				data.splice(i, 1);
			}
		}
	}

	static #modelos_adicionais_revisao = () => {
		return [
			{
				model: models.revisao,
				as: "revisao_comentario",
				include: [
					{
						model: models.estado,
						as: "revisao_estado",
					},
				],
			},
			{
				model: models.utilizador,
				as: "comentario_utilizador",
			},
			{
				model: models.conteudo,
				as: "comentario_conteudo",
			},
		];
	};
}
