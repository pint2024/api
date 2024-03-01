const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"estado",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			estado: {
				type: DataTypes.STRING(100),
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
					name: "pk_estado",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
