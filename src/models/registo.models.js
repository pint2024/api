import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"registo",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			campo: foreignKeyDataType(),
			formulario: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_registo",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
