import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"notificacao",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			visualizado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			descricao: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			atividade: foreignKeyDataType({ allowNull: true}),
			comentario: foreignKeyDataType({ allowNull: true}),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			validate: {
				checkExclusividade() {
					if (
						(this.atividade !== null && this.comentario !== null) ||
						(this.atividade !== null && this.revisao !== null) ||
						(this.comentario !== null && this.revisao !== null)
					) {
						throw new Error("A notificação só pode estar associada a uma atividade, um comentário ou uma revisão.");
					}
				},
			},
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
