import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"conversa",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			descricao: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			subtopico: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_conversa",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
