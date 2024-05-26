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
			conteudo: foreignKeyDataType(),
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
