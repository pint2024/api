import { DEFAULT_IDENTIFIER } from "../data/constants.data.js";
import { log } from "../utils/index.js";

export class Service {
	constructor(model, identifier = DEFAULT_IDENTIFIER) {
		this.model = model;
		this.identifier = identifier;
		log.service(model.name);
	}
}
