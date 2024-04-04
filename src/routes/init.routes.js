import { models } from "../config/database.config.js";
import {
	AtividadeControllers,
	AutenticacaoControllers,
	CampoControllers,
	ComentarioControllers,
	ConversaControllers,
	DenunciaControllers,
	DocumentoControllers,
	EstadoControllers,
	FormularioControllers,
	GostoControllers,
	MensagemControllers,
	NotificacaoControllers,
	ParticipanteControllers,
	PerfilControllers,
	RegistoControllers,
	RespostaControllers,
	RevisaoControllers,
	SedeControllers,
	SubcomentarioControllers,
	SubtopicoControllers,
	TopicoControllers,
	UtilizadorControllers,
} from "../controllers/index.js";
import {
	AtividadeRoutes,
	AutenticacaoRoutes,
	CampoRoutes,
	ComentarioRoutes,
	ConversaRoutes,
	DenunciaRoutes,
	DocumentoRoutes,
	EstadoRoutes,
	FormularioRoutes,
	GostoRoutes,
	MensagemRoutes,
	NotificacaoRoutes,
	ParticipanteRoutes,
	PerfilRoutes,
	RegistoRoutes,
	RespostaRoutes,
	RevisaoRoutes,
	SedeRoutes,
	SubcomentarioRoutes,
	SubtopicoRoutes,
	TopicoRoutes,
	UtilizadorRoutes,
} from "./index.js";

const initRoutes = (app) => {
	/* Funções abaixo recebem:
			> app: para criar as rotas
			> controllerClass: instancia do controllerClass definido com o modelo e identificador (opcional)
			> url_base: parametro base da rota
	*/
	AtividadeRoutes(app, new AtividadeControllers(models.atividade), "/atividade");
	AutenticacaoRoutes(app, new AutenticacaoControllers(models.utilizador), "/autenticacao");
	CampoRoutes(app, new CampoControllers(models.campo), "/campo");
	ComentarioRoutes(app, new ComentarioControllers(models.comentario), "/comentario");
	ConversaRoutes(app, new ConversaControllers(models.conversa), "/conversa");
	DenunciaRoutes(app, new DenunciaControllers(models.denuncia), "/denuncia");
	DocumentoRoutes(app, new DocumentoControllers(models.documento), "/documento");
	EstadoRoutes(app, new EstadoControllers(models.estado), "/estado");
	FormularioRoutes(app, new FormularioControllers(models.formulario), "/formulario");
	GostoRoutes(app, new GostoControllers(models.gosto), "/gosto");
	MensagemRoutes(app, new MensagemControllers(models.mensagem), "/mensagem");
	NotificacaoRoutes(app, new NotificacaoControllers(models.notificacao), "/notificacao");
	ParticipanteRoutes(app, new ParticipanteControllers(models.participante), "/participante");
	PerfilRoutes(app, new PerfilControllers(models.perfil), "/perfil");
	RegistoRoutes(app, new RegistoControllers(models.registo), "/registo");
	RespostaRoutes(app, new RespostaControllers(models.resposta), "/resposta");
	RevisaoRoutes(app, new RevisaoControllers(models.revisao), "/revisao");
	SedeRoutes(app, new SedeControllers(models.sede), "/sede");
	SubcomentarioRoutes(app, new SubcomentarioControllers(models.subcomentario), "/subcomentario");
	SubtopicoRoutes(app, new SubtopicoControllers(models.subtopico), "/subtopico");
	TopicoRoutes(app, new TopicoControllers(models.topico), "/topico");
	UtilizadorRoutes(app, new UtilizadorControllers(models.utilizador), "/utilizador");
};

export default initRoutes;
