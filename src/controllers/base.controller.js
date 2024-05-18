import { log } from "../utils/index.js";

export class BaseController {
	constructor(model, identifier = "id") {
		this.model = model;
		this.identifier = identifier;
		log.endpoint(model.name);
	}
}
