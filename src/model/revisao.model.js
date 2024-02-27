const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const revisao = sequelize.define(
	"revisao",
	{
		id: null,
		data_criacao: null,
		motivo: null,
		utilizador: null,
		estado: null,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = revisao;
