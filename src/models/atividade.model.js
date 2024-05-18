import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"atividade",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			data_evento: {
				type: DataTypes.DATE,
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
					name: "pk_atividade",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
