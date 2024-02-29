const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"conversa",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		titulo: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		descricao: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		topico: DataTypesUtils.foreignKeyDataType(),
	},
	{
		sequelize,
		schema: 'public',
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_conversa",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
