import { Constants } from "../constants/index.js";
import { Log } from "../utils/index.js";

export class Service {
	constructor(model, identifier = Constants.DEFAULT_IDENTIFIER) {
		this.model = model;
		this.identifier = identifier;
		Log.service(model.name);
	}
}
