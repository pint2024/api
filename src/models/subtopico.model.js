import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"subtopico",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			area: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			topico: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_subtopico",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
