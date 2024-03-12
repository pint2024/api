import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"classificacao",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			classificacao: {
				type: DataTypes.SMALLINT,
				allowNull: false,
			},
			atividade: foreignKeyDataType(),
			utilizador: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			validate: {
				isValidClassificacao(value) {
					if (value < 0 || value > 10) {
						throw new Error("A classificação deve estar entre 0 e 10.");
					}
				},
			},
			indexes: [
				{
					name: "pk_classificacao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
