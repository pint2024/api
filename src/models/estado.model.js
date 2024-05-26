import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"estado",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			estado: {
				type: DataTypes.STRING(50),
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
					name: "pk_estado",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
