const { directory_to_filename, log } = require("./utils");

const logSuccess = (res, response, status = 200) => {
	res.status(status).json({success: true, data: response});
};


const logError = (res, response, status = 500) => {
	res.status(status).json({success: false, error: response});
};


const logInstances = (filename) => {
	log(directory_to_filename(filename) + " foi instanciado.");
}


const logMethods = (filename, method) => {
	log("<" + directory_to_filename(filename) + ">." + method + " foi executado.");
}


const modelosAssociados = (model) => {
	const modelsObject = [];
	Object.keys(model.associations).forEach((key) => {
		const association = model.associations[key];
		modelsObject.push({ model: association.target, as: association.as });
	});
		return Object.values(modelsObject);
}


module.exports = {
	logSuccess,
	logError,
	logInstances,
	logMethods,
	modelosAssociados,
}