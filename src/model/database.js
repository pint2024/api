var Sequelize = require('sequelize');
const sequelize = new Sequelize(
	'postgres',
	'postgres',
	'lucas123',
	{
		host: 'localhost',
		port: '5432',
		dialect: 'postgres'
	}
);

module.exports = sequelize;