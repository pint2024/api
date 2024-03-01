const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"utilizador",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			tag: {
				type: DataTypes.STRING(21),
				allowNull: true,
				unique: "utilizador_tag_key",
			},
			nome: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			sobrenome: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: "utilizador_email_key",
			},
			senha: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			imagem: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			linkedin: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			instagram: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			facebook: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			perfil: DataTypesUtils.foreignKeyDataType({ defaultValue: 1}),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_utilizador",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
