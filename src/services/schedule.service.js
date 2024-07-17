import { models } from "../config/index.js";
import { Constants, DataConstants } from "../constants/index.js";
import { ScheduleException } from "../exceptions/index.js";
import { LogUtils } from "../utils/index.js";
import { NotificationService } from "./index.js";

export class ScheduleService {
	static async verificaProximoEventoOuAtividade() {
		try {
			const conteudos = await models.conteudo.findAll({
				include: {
					model: models.utilizador,
					as: "conteudo_utilizador",
				},
			});

			await conteudos.forEach(async (conteudo) => {
				if (this.#isConteudoAtividadeOuEvento(conteudo.tipo) && this.#isDateWithinInterval(conteudo.data_evento)) {
					LogUtils.log(`Evento próximo encontrado para o conteúdo: ${conteudo.titulo}`, LogUtils.TIPO.EVENTO);
					NotificationService.subscribedContentBegining(conteudo.conteudo_utilizador);
				}
			});
		} catch (error) {
			throw new ScheduleException("Erro ao verificar eventos próximos:", error);
		}
	}

	static #isConteudoAtividadeOuEvento(tipo) {
		if (tipo === DataConstants.TIPO_CONTEUDO.ATIVIDADE || tipo === DataConstants.TIPO_CONTEUDO.EVENTO) return true;
		return false;
	}

	static #isDateWithinInterval(date) {
		const now = new Date();
		const intervalAgo = new Date(now.getTime() + Constants.NOTIFICATION_SEND_MIN * 60 * 1000);
		return date <= intervalAgo && date >= now;
	}
}
