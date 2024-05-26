import cron from "node-cron";
import { Constants } from "../constants/index.js";
import { ScheduleService } from "../services/index.js";
import { Log } from "../utils/index.js";

export class ScheduleConfig {
	static async init() {
		await this.#verify();
		cron.schedule(`*/${Constants.NOTIFICATION_INTERVAL_MIN} * * * *`, async () => {
			await this.#verify();
		});
	}

	static async #verify() {
		Log.schedule("Verificando se existem eventos próximos...");
		await ScheduleService.verificaProximoEventoOuAtividade();
		Log.schedule("Verificação de eventos próximos concluída.");
	}
}
