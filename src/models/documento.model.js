import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"documento",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			documento: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			conteudo: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_documento",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
