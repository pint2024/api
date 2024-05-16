import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"subcomentario",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			subcomentario: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			comentario: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_subcomentario",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
