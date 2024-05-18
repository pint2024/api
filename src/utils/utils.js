export class Utils {
	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static ToLower(str) {
		return str.toLowerCase().replace(/\s/g, "");
	}

	static ToUpper(str) {
		return str.toUpperCase().replace(/\s/g, "");
	}
}
