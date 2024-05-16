import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"formulario",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			descricao: {
				type: DataTypes.STRING(100),
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
					name: "pk_formulario",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
