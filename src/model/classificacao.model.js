const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const classificacao = sequelize.define(
	"classificacao",
	{
		id: null,
		data_criacao: null,
		classificacao: null,
		atividade: null,
		utilizador: null,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = classificacao;
