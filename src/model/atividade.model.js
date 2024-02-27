const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const atividade = sequelize.define(
	"atividade",
	{
		id: null,
		data_criacao: null,
		titulo: null,
		descricao: null,
		endereco: null,
		preco: null,
		data_evento: null,
		imagem: null,
		topico: null,
		revisao: null,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = atividade;
