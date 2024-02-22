var Sequelize = require('sequelize');
var database = require('./database');
var Role = database.define('role', {
		role: Sequelize.STRING
	},
	{
		timestamps: false,
	}
);

module.exports = Role