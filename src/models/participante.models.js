const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"participante",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			conversa: DataTypesUtils.foreignKeyDataType(),
			utilizador: DataTypesUtils.foreignKeyDataType(),
			perfil: DataTypesUtils.foreignKeyDataType({ defaultValue: 1 }),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_participante",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
