import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"notificacao",
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
			visualizado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			conteudo: foreignKeyDataType({ allowNull: true}),
			comentario: foreignKeyDataType({ allowNull: true}),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_notificacao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
