import {
	ConteudoController,
	AutenticacaoController,
	BaseController,
	UtilizadorController,
	AlbumController,
	TipoController,
	RevisaoController,
	ClassificacaoController,
	TopicoController,
	CentroController,
	InteresseController,
	ParticipanteController,
	DenunciaController,
	ComentarioController,
} from "../controllers/index.js";
import { models } from "./index.js";
import { LogUtils } from "../utils/index.js";
import { AutenticacaoRoutes, BaseRoutes, UtilizadorRoutes, ConteudoRoutes, ParticipanteRoutes } from "../routes/index.js";

export const RoutesConfig = async (app) => {
	BaseRoutes(app, new AlbumController(models.album), "/album");
	AutenticacaoRoutes(app, new AutenticacaoController(models.utilizador), "/autenticacao");
	BaseRoutes(app, new CentroController(models.centro), "/centro");
	BaseRoutes(app, new ClassificacaoController(models.classificacao), "/classificacao");
	BaseRoutes(app, new ComentarioController(models.comentario), "/comentario");
	ConteudoRoutes(app, new ConteudoController(models.conteudo), "/conteudo");
	BaseRoutes(app, new DenunciaController(models.denuncia), "/denuncia");
	BaseRoutes(app, new BaseController(models.estado), "/estado");
	BaseRoutes(app, new InteresseController(models.interesse), "/interesse");
	BaseRoutes(app, new BaseController(models.notificacao), "/notificacao");
	ParticipanteRoutes(app, new ParticipanteController(models.participante), "/participante");
	BaseRoutes(app, new BaseController(models.perfil), "/perfil");
	BaseRoutes(app, new RevisaoController(models.revisao), "/revisao");
	BaseRoutes(app, new BaseController(models.subtopico), "/subtopico");
	BaseRoutes(app, new TipoController(models.tipo), "/tipo");
	BaseRoutes(app, new TopicoController(models.topico), "/topico");
	UtilizadorRoutes(app, new UtilizadorController(models.utilizador), "/utilizador");

	LogUtils.log("Routes inicializados!", LogUtils.TIPO.ROUTES);
};
