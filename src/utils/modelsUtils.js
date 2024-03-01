const DataTypes = require("sequelize").DataTypes;
const Sequelize = require("sequelize");

function dataCriacaoDataType() {
	return { type: DataTypes.DATE, defaultValue: Sequelize.Sequelize.fn("now") };
}

function primaryKeyDataType() {
	return { autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, primaryKey: true };
}

function foreignKeyDataType({ allowNull = false, defaultValue = null } = {}) {
	return { type: DataTypes.INTEGER, allowNull, defaultValue };
}

module.exports = { dataCriacaoDataType, primaryKeyDataType, foreignKeyDataType };
