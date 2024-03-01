const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"perfil",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			perfil: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_perfil",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
