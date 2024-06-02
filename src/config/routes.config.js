import { ConteudoController, AutenticacaoController, BaseController, UtilizadorController } from "../controllers/index.js";
import { models } from "./index.js";
import { Log } from "../utils/index.js";
import { AutenticacaoRoutes, BaseRoutes } from "../routes/index.js";
import { LoggerMiddleware, AuthMiddleware, ErrorMiddleware } from "../middlewares/index.js";

export const RoutesConfig = async (app) => {
	app.use(LoggerMiddleware);
	app.use(AuthMiddleware);

	BaseRoutes(app, new BaseController(models.album), "/album");
	AutenticacaoRoutes(app, new AutenticacaoController(models.utilizador), "/autenticacao");
	BaseRoutes(app, new BaseController(models.centro), "/centro");
	BaseRoutes(app, new BaseController(models.classificacao), "/classificacao");
	BaseRoutes(app, new BaseController(models.comentario), "/comentario");
	BaseRoutes(app, new ConteudoController(models.conteudo), "/conteudo");
	BaseRoutes(app, new BaseController(models.denuncia), "/denuncia");
	BaseRoutes(app, new BaseController(models.documento), "/documento");
	BaseRoutes(app, new BaseController(models.estado), "/estado");
	BaseRoutes(app, new BaseController(models.interesse), "/interesse");
	BaseRoutes(app, new BaseController(models.notificacao), "/notificacao");
	BaseRoutes(app, new BaseController(models.participante), "/participante");
	BaseRoutes(app, new BaseController(models.perfil), "/perfil");
	BaseRoutes(app, new BaseController(models.revisao), "/revisao");
	BaseRoutes(app, new BaseController(models.subtopico), "/subtopico");
	BaseRoutes(app, new BaseController(models.tipo), "/tipo");
	BaseRoutes(app, new BaseController(models.topico), "/topico");
	BaseRoutes(app, new UtilizadorController(models.utilizador), "/utilizador");

	Log.routes("Routes inicializados.");

	app.use(ErrorMiddleware);

	Log.middlewares("Middlewares inicializados.");
};
