import { Sequelize } from "sequelize";
import { log } from "../utils/index.js";
import { DB_CONFIG } from "../constants/database.constants.js";
import { ServerException } from "../exceptions/server.exception.js"

export class DatabaseConfig {
	static async connect() {
		const { DATABASE, USERNAME, PASSWORD, HOST, PORT, DIALECT, SSL_ENABLED } = DB_CONFIG;

		const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
			host: HOST,
			port: PORT,
			dialect: DIALECT,
			dialectOptions: SSL_ENABLED ? { ssl: { require: true, rejectUnauthorized: false } } : {},
			logging: false,
		});

		await this.init(sequelize);

		return sequelize;
	}

	static init = async (sequelize) => {
		try {
			await sequelize.authenticate();
			log.database("Autenticado à base de dados.");
		} catch (error) {
			log.error("Erro ao conectar à base de dados: " + error);
			throw new ServerException("Erro ao conectar à base de dados.");
		}
	};

	static sync = async (sequelize) => {
		try {
			await sequelize.sync();
			log.database("Base de dados sincronizada com sucesso.");
		} catch (error) {
			log.error("Erro ao sincronizar a base de dados: " + error);
			throw new ServerException("Erro ao sincronizar a base de dados.");
		}
	};
}
