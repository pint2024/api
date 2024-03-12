import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"topico",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			area: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			categoria: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_topico",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
