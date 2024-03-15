import { models } from "../config/database.config.js";
import {
	AtividadeControllers,
	AutenticacaoControllers,
	TopicoControllers,
	ComentarioControllers,
	ConversaControllers,
	DenunciaControllers,
	EstadoControllers,
	GostoControllers,
	MensagemControllers,
	NotificacaoControllers,
	ParticipanteControllers,
	PerfilControllers,
	RevisaoControllers,
	SubtopicoControllers,
	UtilizadorControllers
} from "../controllers/__init__.js";
import {
	AtividadeRoutes,
	AutenticacaoRoutes,
	TopicoRoutes,
	ComentarioRoutes,
	ConversaRoutes,
	DenunciaRoutes,
	EstadoRoutes,
	GostoRoutes,
	MensagemRoutes,
	NotificacaoRoutes,
	ParticipanteRoutes,
	PerfilRoutes,
	RevisaoRoutes,
	SubtopicoRoutes,
	UtilizadorRoutes
} from "../routes/__init__.js";


const initRoutes = (app) => {
	/* Funções abaixo recebem:
			> app: para criar as rotas
			> controllerClass: instancia do controllerClass definido com o modelo e identificador (opcional)
			> url_base: parametro base da rota
	*/
	AtividadeRoutes(app, new AtividadeControllers(models.atividade), "/atividade");
	AutenticacaoRoutes(app, new AutenticacaoControllers(models.utilizador), "/autenticacao");
	TopicoRoutes(app, new TopicoControllers(models.topico), "/topico");
	ComentarioRoutes(app, new ComentarioControllers(models.comentario), "/comentario");
	ConversaRoutes(app, new ConversaControllers(models.conversa), "/conversa");
	DenunciaRoutes(app, new DenunciaControllers(models.denuncia), "/denuncia");
	EstadoRoutes(app, new EstadoControllers(models.estado), "/estado");
	GostoRoutes(app, new GostoControllers(models.gosto), "/gosto");
	MensagemRoutes(app, new MensagemControllers(models.mensagem), "/mensagem");
	NotificacaoRoutes(app, new NotificacaoControllers(models.notificacao), "/notificacao");
	ParticipanteRoutes(app, new ParticipanteControllers(models.participante), "/participante");
	PerfilRoutes(app, new PerfilControllers(models.perfil), "/perfil");
	RevisaoRoutes(app, new RevisaoControllers(models.revisao), "/revisao");
	SubtopicoRoutes(app, new SubtopicoControllers(models.subtopico), "/subtopico");
	UtilizadorRoutes(app, new UtilizadorControllers(models.utilizador), "/utilizador");
};

export default initRoutes;
