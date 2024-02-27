function attributeDataType(tipo, allowNull = true, autoIncrement = false, defaultValue = null) {
	return { type: tipo, allowNull: allowNull, autoIncrement: autoIncrement, defaultValue: defaultValue };
}

function primaryKeyDataType(tipo, autoIncrement = true) {
	return { type: tipo, allowNull: false, autoIncrement, primaryKey: true };
}

function foreignKeyDataType(tipo, allowNull = false, defaultValue = null, referenciaModelo, referenciaColuna) {
	return { type: tipo, allowNull, defaultValue: defaultValue, references: { model: referenciaModelo, key: referenciaColuna } };
}

export default { attributeDataType, primaryKeyDataType, foreignKeyDataType }