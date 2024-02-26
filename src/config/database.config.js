const { Sequelize } = require('sequelize');
const initModels = require('../models/init-models');
const { DB_CONFIG } = require('../data/constants').default;


const sequelize = new Sequelize(
	DB_CONFIG.DATABASE,
	DB_CONFIG.USERNAME,
	DB_CONFIG.PASSWORD,
	{
		host: DB_CONFIG.HOST,
		port: DB_CONFIG.PORT,
		dialect: DB_CONFIG.DIALECT,
		logging: false,
		dialectOptions: {
			ssl: { require: true, rejectUnauthorized: false }
		}
	}
);

sequelize.addHook('beforeDefine', (attributes, options) => {
	options.defaultScope = {
		/*attributes: { exclude: ['excluido'] },
		where: { ['excluido']: false },*/
	};
});

sequelize.authenticate()
	.then(() => {
		console.log('Autenticado à base de dados.');
	})
	.catch((error) => {
		console.error('Error ao conectar à base de dados: ', error);
	});


sequelize.sync()
	.then(() => {
		console.log('Base de dados sincronizada com sucesso.');
	})
	.catch((error) => {
		console.error('Error ao sincronizar a base de dados: ', error);
	});

const models = initModels(sequelize);

module.exports = { sequelize, models };