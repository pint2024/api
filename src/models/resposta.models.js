import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"resposta",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			valor: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			registo: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_resposta",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
