import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"gosto",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			atividade: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_gosto",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
