const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"revisao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		area: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		categoria: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_topico",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
