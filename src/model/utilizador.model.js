const DataTypesUtils = require('../utils/modelsDataTypes');

const utilizador = sequelize.define(
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
		data_nascimento: {
			type: DataTypes.DATE,
			allowNull: true,
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
		perfil: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = utilizador;
