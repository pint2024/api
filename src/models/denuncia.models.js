import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"denuncia",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			motivo: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			atividade: foreignKeyDataType({ allowNull: true }),
			comentario: foreignKeyDataType({ allowNull: true }),
			utilizador: foreignKeyDataType({ allowNull: true }),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			validate: {
				checkExclusividade() {
					if (
						(denuncia.atividade !== null && denuncia.comentario !== null) ||
						(denuncia.atividade === null && denuncia.comentario === null)
					) {
						throw new Error("A revisão só pode estar associada a uma atividade ou um comentário.");
					}
				},
			},
			indexes: [
				{
					name: "pk_denuncia",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
