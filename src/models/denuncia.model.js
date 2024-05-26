import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"denuncia",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			motivo: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			comentario: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
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
