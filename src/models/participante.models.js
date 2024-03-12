import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"participante",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			conversa: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
			perfil: foreignKeyDataType({ defaultValue: 1 }),
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
