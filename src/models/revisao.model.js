import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"revisao",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			motivo: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			estado: foreignKeyDataType({ defaultValue: 1 }),
			conteudo: foreignKeyDataType({ allowNull: true }),
			comentario: foreignKeyDataType({ allowNull: true }),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_revisao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
