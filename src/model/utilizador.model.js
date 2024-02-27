const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const utilizador = sequelize.define(
	"utilizador",
	{
		id: null,
		data_criacao: null,
		tag: null,
		nome: null,
		sobrenome: null,
		email: null,
		senha: null,
		data_nascimento: null,
		imagem: null,
		linkedin: null,
		instagram: null,
		facebook: null,
		perfil: null,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = utilizador;
