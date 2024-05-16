import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"sede",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			sede: {
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
					name: "pk_sede",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
