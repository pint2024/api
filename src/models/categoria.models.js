import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"categoria",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
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
