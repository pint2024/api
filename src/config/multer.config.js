import multer from "multer";

export class MulterConfig {
	static storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "uploads/");
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
			cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
		},
	});
	
	static upload = multer({ storage: this.storage });
}
