const Sequelize = require('sequelize');
const DataTypesUtils = require('../utils/modelsDataTypes');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
	"classificacao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		classificacao: {
			type: DataTypes.SMALLINT,
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
		validate: {
			isValidClassificacao(value) {
				if (value < 0 || value > 10) {
					throw new Error("A classificação deve estar entre 0 e 10.");
				}
			},
		},
		indexes: [
			{
				name: "pk_classificacao",
				unique: true,
				fields: [
					{ name: "id" },
				]
			},
		]
	});
}
