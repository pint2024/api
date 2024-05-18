import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"conteudo",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			descricao: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			imagem: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			endereco: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			utilizador: foreignKeyDataType(),
			subtopico: foreignKeyDataType(),
			album: foreignKeyDataType(),
			espaco: foreignKeyDataType({ allowNull: true }),
			evento: foreignKeyDataType({ allowNull: true }),
			atividade: foreignKeyDataType({ allowNull: true }),
			recomendacao: foreignKeyDataType({ allowNull: true }),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_conteudo",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
}
