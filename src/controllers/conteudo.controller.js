import { models } from "../config/models.config.js";
import { Response, modelsDirectlyAssociated } from "../utils/index.js";
import { BaseController } from "./base.controller.js";

export class ConteudoController extends BaseController {
	constructor(model, identifier = "id") {
		super(model, identifier);
	}

	async obter(req, res) {
		try {
			const { id } = req.params;
			const response = await this.model.findOne({
				where: { [this.identifier]: id },
				include: [...modelsDirectlyAssociated(this.model)/*, ...getMoreModels*/],
			});
			Response.success(res, response);
		} catch (error) {
			console.log(error);
			Response.error(res, error);
		}
	}

	async listar(req, res) {
		console.log(1)
		try {
			const response = await this.model.findAll({
				where: { ...req.body },
				include: [...modelsDirectlyAssociated(this.model)/*, ...getMoreModels*/],
			});
			Response.success(res, response);
		} catch (error) {
			Response.error(res, error);
		}
	}
}

const getMoreModels = [
	{
		model: models.subtopico,
		as: "conteudo_subtopico",
		include: [
			{
				model: models.topico,
				as: "subtopico_topico",
			},
		],
	},
];
