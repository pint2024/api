import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"topico",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			topico: {
				type: DataTypes.STRING(50),
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
					name: "pk_topico",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
