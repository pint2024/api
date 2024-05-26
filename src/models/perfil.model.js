import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	return sequelize.define(
		"perfil",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			perfil: {
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
					name: "pk_perfil",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
