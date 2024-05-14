import { models } from "../config/database.config.js";
import { AtividadeControllers, AutenticacaoControllers, ConversaControllers, CrudControllers } from "../controllers/index.js";
import { AutenticacaoRoutes, CrudRoutes } from "./index.js";

const initRoutes = (app) => {
	/* Funções abaixo recebem:
			> app: para criar as rotas
			> controllerClass: instancia do controllerClass definido com o modelo e identificador (opcional)
			> url_base: parametro base da rota
	*/
	CrudRoutes(app, new AtividadeControllers(models.atividade), "/atividade");
	AutenticacaoRoutes(app, new AutenticacaoControllers(models.utilizador), "/autenticacao");
	CrudRoutes(app, new ConversaControllers(models.conversa), "/conversa");
	CrudRoutes(app, new CrudControllers(models.comentario), "/comentario");
	CrudRoutes(app, new CrudControllers(models.denuncia), "/denuncia");
	CrudRoutes(app, new CrudControllers(models.documento), "/documento");
	CrudRoutes(app, new CrudControllers(models.estado), "/estado");
	CrudRoutes(app, new CrudControllers(models.formulario), "/formulario");
	CrudRoutes(app, new CrudControllers(models.gosto), "/gosto");
	CrudRoutes(app, new CrudControllers(models.mensagem), "/mensagem");
	CrudRoutes(app, new CrudControllers(models.notificacao), "/notificacao");
	CrudRoutes(app, new CrudControllers(models.participante), "/participante");
	CrudRoutes(app, new CrudControllers(models.perfil), "/perfil");
	CrudRoutes(app, new CrudControllers(models.registo), "/registo");
	CrudRoutes(app, new CrudControllers(models.resposta), "/resposta");
	CrudRoutes(app, new CrudControllers(models.revisao), "/revisao");
	CrudRoutes(app, new CrudControllers(models.sede), "/sede");
	CrudRoutes(app, new CrudControllers(models.subcomentario), "/subcomentario");
	CrudRoutes(app, new CrudControllers(models.subtopico), "/subtopico");
	CrudRoutes(app, new CrudControllers(models.topico), "/topico");
	CrudRoutes(app, new CrudControllers(models.utilizador), "/utilizador");
};

export default initRoutes;
