import { models } from "../config/database.config.js";
import { AtividadeControllers, AutenticacaoControllers, CrudControllers } from "../controllers/index.js";
import { AutenticacaoRoutes, CrudRoutes } from "./index.js";

const initRoutes = (app) => {
	/** 
	 * * Controllers functions recebem:
	 * @param app para criar as rotas
	 * @param controllerClass instancia do controllerClass definido com o modelo e identificador (opcional)
	 * @param url_base parametro base da rota
	 */
	CrudRoutes(app, new AtividadeControllers(models.atividade), "/atividade");
	CrudRoutes(app, new CrudControllers(models.album), "/album");
	AutenticacaoRoutes(app, new AutenticacaoControllers(models.utilizador), "/autenticacao");
	CrudRoutes(app, new CrudControllers(models.centro), "/centro");
	CrudRoutes(app, new CrudControllers(models.classificacao), "/classificacao");
	CrudRoutes(app, new CrudControllers(models.comentario), "/comentario");
	CrudRoutes(app, new CrudControllers(models.conteudo), "/conteudo");
	CrudRoutes(app, new CrudControllers(models.denuncia), "/denuncia");
	CrudRoutes(app, new CrudControllers(models.documento), "/documento");
	CrudRoutes(app, new CrudControllers(models.espaco), "/espaco");
	CrudRoutes(app, new CrudControllers(models.estado), "/estado");
	CrudRoutes(app, new CrudControllers(models.evento), "/evento");
	CrudRoutes(app, new CrudControllers(models.interesse), "/interesse");
	CrudRoutes(app, new CrudControllers(models.notificacao), "/notificacao");
	CrudRoutes(app, new CrudControllers(models.participante), "/participante");
	CrudRoutes(app, new CrudControllers(models.perfil), "/perfil");
	CrudRoutes(app, new CrudControllers(models.recomendacao), "/recomendacao");
	CrudRoutes(app, new CrudControllers(models.revisao), "/revisao");
	CrudRoutes(app, new CrudControllers(models.subtopico), "/subtopico");
	CrudRoutes(app, new CrudControllers(models.topico), "/topico");
	CrudRoutes(app, new CrudControllers(models.utilizador), "/utilizador");
};

export default initRoutes;
