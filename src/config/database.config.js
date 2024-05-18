import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../data/database.js";
import { InitModels } from "../models/init.models.js";
import { log } from '../utils/index.js';

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
		},*/
		logging: false,
	}
);

/*sequelize.addHook('beforeDefine', (attributes, options) => {
	options.defaultScope = { };
});*/

sequelize.authenticate()
	.then(() => {
		log.success("Autenticado à base de dados.");

		sequelize.sync()
			.then(() => {
				log.success("Base de dados sincronizada com sucesso.");
			})
			.catch((error) => {
				log.error("Error ao sincronizar a base de dados: ", error);
			});
	})
	.catch((error) => {
		log.error("Error ao conectar à base de dados: ", error);
	});

export const models = InitModels(sequelize);
