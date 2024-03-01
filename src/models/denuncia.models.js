const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"denuncia",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			motivo: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			atividade: DataTypesUtils.foreignKeyDataType(),
			utilizador: DataTypesUtils.foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_denuncia",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
