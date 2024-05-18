import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"comentario",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			comentario: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			conteudo: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_comentario",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
