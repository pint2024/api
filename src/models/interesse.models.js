import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"interesse",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			subtopico: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_interesse",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
