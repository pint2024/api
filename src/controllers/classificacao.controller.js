import { Constants } from "../constants/index.js";
import { OutOfRangeException } from "../exceptions/index.js";
import { ResponseService } from "../services/index.js";
import { ModelsUtils } from "../utils/index.js";
import { BaseController } from "./index.js";

export class ClassificacaoController extends BaseController {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		super(model, identifier);
	}

	async criar(req, res) {
		try {
			const { conteudo, utilizador, classificacao } = req.body;
			if (classificacao > 5 || classificacao < 0) throw new OutOfRangeException("A classificação tem que estar entre 0-5.");
			const exists = await ModelsUtils.checkExistence(this.model, { conteudo, utilizador })
			let response;
			if (exists == null) {
				response = await this.service.criar(req.body);
			} else {
				response = await this.service.atualizar(exists.id, req.body);
			}
			return ResponseService.success(res, response);
		} catch (error) {
			return ResponseService.error(res, error.message);
		}
	}
}
