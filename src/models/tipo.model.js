import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"tipo",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			tipo: {
				type: DataTypes.STRING(100),
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
					name: "pk_tipo",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
