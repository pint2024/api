import { Sequelize } from "sequelize";
import { DB_CONFIG } from "../data/database.js";
import { log } from "../utils/index.js";

export const InitDatabase = async () => {
	const { DATABASE, USERNAME, PASSWORD, HOST, PORT, DIALECT, SSL_ENABLED } = DB_CONFIG;

	const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
		host: HOST,
		port: PORT,
		dialect: DIALECT,
		dialectOptions: SSL_ENABLED ? { ssl: { require: true, rejectUnauthorized: false } } : {},
		logging: false,
	});

	await Database.init(sequelize);

	return sequelize;
};

export class Database {
	static init = async (sequelize) => {
		try {
			await sequelize.authenticate();
			log.database("Autenticado à base de dados.");
		} catch (error) {
			log.error("Erro ao conectar à base de dados: ", error);
		}
	};

	static sync = async (sequelize) => {
		try {
			await sequelize.sync();
			log.database("Base de dados sincronizada com sucesso.");
		} catch (error) {
			log.error("Erro ao sincronizar a base de dados: ", error);
		}
	};
}
