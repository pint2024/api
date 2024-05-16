import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"revisao",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			motivo: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			estado: foreignKeyDataType({ defaultValue: 1 }),
			atividade: foreignKeyDataType({ allowNull: true }),
			comentario: foreignKeyDataType({ allowNull: true }),
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
					name: "pk_revisao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
