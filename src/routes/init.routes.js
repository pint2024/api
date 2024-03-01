const models = require("../config/database.config").models;
const atividadeRoutes = require("./atividade.routes.js");
const atividadeControllers = require("../controllers/atividade.controllers.js");
const categoriaRoutes = require("./categoria.routes");
const categoriaControllers = require("../controllers/categoria.controllers");
const classificacaoRoutes = require("./classificacao.routes.js");
const classificacaoControllers = require("../controllers/classificacao.controllers.js");
const comentarioRoutes = require("./comentario.routes.js");
const comentarioControllers = require("../controllers/comentario.controllers.js");
const conversaRoutes = require("./conversa.routes.js");
const conversaControllers = require("../controllers/conversa.controllers.js");
const denunciaRoutes = require("./denuncia.routes.js");
const denunciaControllers = require("../controllers/denuncia.controllers.js");
const estadoRoutes = require("./estado.routes.js");
const estadoControllers = require("../controllers/estado.controllers.js");
const gostoRoutes = require("./gosto.routes.js");
const gostoControllers = require("../controllers/gosto.controllers.js");
const mensagemRoutes = require("./mensagem.routes.js");
const mensagemControllers = require("../controllers/mensagem.controllers.js");
const notificacaoRoutes = require("./notificacao.routes.js");
const notificacaoControllers = require("../controllers/notificacao.controllers.js");
const participanteRoutes = require("./participante.routes.js");
const participanteControllers = require("../controllers/participante.controllers.js");
const perfilRoutes = require("./perfil.routes.js");
const perfilControllers = require("../controllers/perfil.controllers.js");
const revisaoRoutes = require("./revisao.routes.js");
const revisaoControllers = require("../controllers/revisao.controllers.js");
const topicoRoutes = require("./topico.routes.js");
const topicoControllers = require("../controllers/topico.controllers.js");
const utilizadorRoutes = require("./utilizador.routes.js");
const utilizadorControllers = require("../controllers/utilizador.controllers.js");



const initRoutes = (app) => {
	/* Funções abaixo recebem:
			> app: para criar as rotas
			> controllerClass: instancia do controllerClass definido com o modelo e identificador (opcional)
			> url_base: parametro base da rota
	*/
	atividadeRoutes(app, new atividadeControllers(models.atividade), "/atividade");
	categoriaRoutes(app, new categoriaControllers(models.categoria), "/categoria");
	classificacaoRoutes(app, new classificacaoControllers(models.classificacao), "/classificacao");
	comentarioRoutes(app, new comentarioControllers(models.comentario), "/comentario");
	conversaRoutes(app, new conversaControllers(models.conversa), "/conversa");
	denunciaRoutes(app, new denunciaControllers(models.denuncia), "/denuncia");
	estadoRoutes(app, new estadoControllers(models.estado), "/estado");
	gostoRoutes(app, new gostoControllers(models.gosto), "/gosto");
	mensagemRoutes(app, new mensagemControllers(models.mensagem), "/mensagem");
	notificacaoRoutes(app, new notificacaoControllers(models.notificacao), "/notificacao");
	participanteRoutes(app, new participanteControllers(models.participante), "/participante");
	perfilRoutes(app, new perfilControllers(models.perfil), "/perfil");
	revisaoRoutes(app, new revisaoControllers(models.revisao), "/revisao");
	topicoRoutes(app, new topicoControllers(models.topico), "/topico");
	utilizadorRoutes(app, new utilizadorControllers(models.utilizador), "/utilizador");
};


module.exports = initRoutes;
