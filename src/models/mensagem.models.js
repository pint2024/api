import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"mensagem",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			mensagem: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			participante: foreignKeyDataType(),
			conversa: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_mensagem",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
