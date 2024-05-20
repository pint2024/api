import { log } from "../utils/index.js";

export class Service {
	constructor(model, identifier = "id") {
		this.model = model;
		this.identifier = identifier;
		log.service(model.name);
	}
}
