import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"classificacao",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			conteudo: foreignKeyDataType({ allowNull: true }),
			comentario: foreignKeyDataType({ allowNull: true }),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_classificacao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
