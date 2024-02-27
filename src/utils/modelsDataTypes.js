function dataCriacaoDataType() {
	return attributeDataType(DataTypes.DATE, Sequelize.Sequelize.fn('now'));
}

function primaryKeyDataType() {
	return { type: DataTypes.INTEGER, allowNull: false, primaryKey: true };
}

function foreignKeyDataType({ allowNull = false, defaultValue = null }) {
	return { type: DataTypes.INTEGER, allowNull: allowNull, defaultValue: defaultValue };
}

module.exports = { dataCriacaoDataType, primaryKeyDataType, foreignKeyDataType }