import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"album",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			descricao: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			imagem: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
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
