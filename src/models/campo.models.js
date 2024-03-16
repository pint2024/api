import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"campo",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			campo: {
				type: DataTypes.STRING(20),
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
					name: "pk_campo",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
