function modelosAssociados(models) {
	const modelsObject = [];
	Object.keys(models.associations).forEach((key) => {
		const association = models.associations[key];
		modelsObject.push({ model: association.target, as: association.as });
	});
	return Object.values(modelsObject);
}
