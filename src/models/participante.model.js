import { ModelsUtils } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"participante",
		{
			id: ModelsUtils.primaryKeyDataType(),
			data_criacao: ModelsUtils.dataCriacaoDataType(),
			observacao: {
				type: DataTypes.STRING(200),
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
					name: "pk_participante",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
