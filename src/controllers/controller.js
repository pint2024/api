import { DEFAULT_IDENTIFIER } from "../data/constants.data.js";
import { BaseService } from "../services/index.js";
import { log } from "../utils/index.js";

export class Controller {
	constructor(model, identifier = DEFAULT_IDENTIFIER) {
		this.model = model;
		this.identifier = identifier;
		this.service = new BaseService(model, identifier);
		log.controllers(model.name);
	}
}
