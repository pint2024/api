const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"comentario",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		comentario: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		atividade: DataTypesUtils.foreignKeyDataType(),
		utilizador: DataTypesUtils.foreignKeyDataType(),
	},
	{
		sequelize,
		schema: 'public',
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_comentario",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
