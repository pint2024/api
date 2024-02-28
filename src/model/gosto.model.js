const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"gosto",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		atividade: DataTypesUtils.foreignKeyDataType(),
		utilizador: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_gosto",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
