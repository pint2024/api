import { ModelsUtils } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"documento",
		{
			id: ModelsUtils.primaryKeyDataType(),
			data_criacao: ModelsUtils.dataCriacaoDataType(),
			documento: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			conteudo: ModelsUtils.foreignKeyDataType(),
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
