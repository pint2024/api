import { ModelsUtils } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"album",
		{
			id: ModelsUtils.primaryKeyDataType(),
			data_criacao: ModelsUtils.dataCriacaoDataType(),
			descricao: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			imagem: {
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
					name: "pk_album",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
