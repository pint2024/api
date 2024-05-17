import { Log } from "../utils/index.js";

export default class BaseControllers {
	constructor(model, identifier = "id") {
		//this.filename = filePath(new URL(import.meta.url).pathname);
		this.model = model;
		this.identifier = identifier;
		Log.instance(model);
	}
}
