import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"espaco",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_espaco",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
