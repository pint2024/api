import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"participante",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			observacao: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			evento: foreignKeyDataType({ allowNull: true }),
			atividade: foreignKeyDataType({ allowNull: true }),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_participante",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
