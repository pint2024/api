const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"mensagem",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		mensagem: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		participante: DataTypesUtils.foreignKeyDataType(),
	},
	{
		sequelize,
		schema: 'public',
		timestamps: false,
		freezeTableName: true,
		indexes: [
			{
				name: "pk_mensagem",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
