const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"revisao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		motivo: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		estado: DataTypesUtils.foreignKeyDataType(false, 1),
	},
	{
		sequelize,
		schema: 'public',
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_revisao",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
