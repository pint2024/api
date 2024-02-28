const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsDataTypes");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"categoria",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			categoria: {
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
					name: "pk_categoria",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
