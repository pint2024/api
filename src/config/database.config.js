import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../data/constants.js";
import { initModels } from "../models/init.models.js";
import { Log } from '../utils/__init__.js';

export const sequelize = new Sequelize(
	DB_CONFIG.DATABASE,
	DB_CONFIG.USERNAME,
	DB_CONFIG.PASSWORD,
	{
		host: DB_CONFIG.HOST,
		port: DB_CONFIG.PORT,
		dialect: DB_CONFIG.DIALECT,
		/*dialectOptions: {
			ssl: { require: true, rejectUnauthorized: false }
		}*/
		logging: false,
	}
);

/*sequelize.addHook('beforeDefine', (attributes, options) => {
	options.defaultScope = { };
});*/

sequelize.authenticate()
	.then(() => {
		Log.log("Autenticado à base de dados.");

		sequelize.sync()
			.then(() => {
				Log.log("Base de dados sincronizada com sucesso.");
			})
			.catch((error) => {
				Log.log("Error ao sincronizar a base de dados: ", error);
			});
	})
	.catch((error) => {
		Log.log("Error ao conectar à base de dados: ", error);
	});

export const models = initModels(sequelize);
