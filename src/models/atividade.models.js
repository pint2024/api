import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"atividade",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			descricao: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			endereco: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			preco: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			data_evento: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			imagem: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			topico: foreignKeyDataType(),
			revisao: foreignKeyDataType({ allowNull: true}),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_atividade",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
