const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const categoria = sequelize.define(
	"categoria",
	{
		id: null,
		data_criacao: null,
		categoria: null,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = categoria;
