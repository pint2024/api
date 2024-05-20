import { ConteudoController, AutenticacaoController, BaseController } from "../controllers/index.js";
import { models } from "./models.config.js";
import { log } from "../utils/log.utils.js";
import { AutenticacaoRoutes, BaseRoutes } from "../routes/index.js";

export const InitRoutes = async (app) => {
	/** 
	 * * Controllers functions recebem:
	 * @param app para criar as rotas
	 * @param controllerClass instancia do controllerClass definido com o modelo e identificador (opcional)
	 * @param url_base parametro base da rota
	 */
	BaseRoutes(app, new BaseController(models.album), "/album");
	BaseRoutes(app, new BaseController(models.atividade), "/atividade");
	AutenticacaoRoutes(app, new AutenticacaoController(models.utilizador), "/autenticacao");
	BaseRoutes(app, new BaseController(models.centro), "/centro");
	BaseRoutes(app, new BaseController(models.classificacao), "/classificacao");
	BaseRoutes(app, new BaseController(models.comentario), "/comentario");
	BaseRoutes(app, new ConteudoController(models.conteudo), "/conteudo");
	BaseRoutes(app, new BaseController(models.denuncia), "/denuncia");
	BaseRoutes(app, new BaseController(models.documento), "/documento");
	BaseRoutes(app, new BaseController(models.espaco), "/espaco");
	BaseRoutes(app, new BaseController(models.estado), "/estado");
	BaseRoutes(app, new BaseController(models.evento), "/evento");
	BaseRoutes(app, new BaseController(models.interesse), "/interesse");
	BaseRoutes(app, new BaseController(models.notificacao), "/notificacao");
	BaseRoutes(app, new BaseController(models.participante), "/participante");
	BaseRoutes(app, new BaseController(models.perfil), "/perfil");
	BaseRoutes(app, new BaseController(models.recomendacao), "/recomendacao");
	BaseRoutes(app, new BaseController(models.revisao), "/revisao");
	BaseRoutes(app, new BaseController(models.subtopico), "/subtopico");
	BaseRoutes(app, new BaseController(models.topico), "/topico");
	BaseRoutes(app, new BaseController(models.utilizador), "/utilizador");

	log.routes("Routes inicializados.")
};
