import { models } from "../config/database.config.js";
import { AtividadeController, AutenticacaoController, CrudController } from "../controllers/index.js";
import { AutenticacaoRoutes, CrudRoutes } from "./index.js";

export const InitRoutes = (app) => {
	/** 
	 * * Controllers functions recebem:
	 * @param app para criar as rotas
	 * @param controllerClass instancia do controllerClass definido com o modelo e identificador (opcional)
	 * @param url_base parametro base da rota
	 */
	CrudRoutes(app, new CrudController(models.album), "/album");
	CrudRoutes(app, new AtividadeController(models.atividade), "/atividade");
	AutenticacaoRoutes(app, new AutenticacaoController(models.utilizador), "/autenticacao");
	CrudRoutes(app, new CrudController(models.centro), "/centro");
	CrudRoutes(app, new CrudController(models.classificacao), "/classificacao");
	CrudRoutes(app, new CrudController(models.comentario), "/comentario");
	CrudRoutes(app, new CrudController(models.conteudo), "/conteudo");
	CrudRoutes(app, new CrudController(models.denuncia), "/denuncia");
	CrudRoutes(app, new CrudController(models.documento), "/documento");
	CrudRoutes(app, new CrudController(models.espaco), "/espaco");
	CrudRoutes(app, new CrudController(models.estado), "/estado");
	CrudRoutes(app, new CrudController(models.evento), "/evento");
	CrudRoutes(app, new CrudController(models.interesse), "/interesse");
	CrudRoutes(app, new CrudController(models.notificacao), "/notificacao");
	CrudRoutes(app, new CrudController(models.participante), "/participante");
	CrudRoutes(app, new CrudController(models.perfil), "/perfil");
	CrudRoutes(app, new CrudController(models.recomendacao), "/recomendacao");
	CrudRoutes(app, new CrudController(models.revisao), "/revisao");
	CrudRoutes(app, new CrudController(models.subtopico), "/subtopico");
	CrudRoutes(app, new CrudController(models.topico), "/topico");
	CrudRoutes(app, new CrudController(models.utilizador), "/utilizador");
};
