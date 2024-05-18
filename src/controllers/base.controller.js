import { CrudService } from "../services/index.js";
import { log } from "../utils/index.js";

export class BaseController {
	constructor(model, identifier = "id") {
		this.model = model;
		this.identifier = identifier;
		this.service = new CrudService(model, identifier);
		log.controllers(model.name);
	}
}
