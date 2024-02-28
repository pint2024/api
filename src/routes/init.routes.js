/*const atividadeRoutes = require("./atividade.routes.js");*/
const categoriaRoutes = require("./categoria.routes");
/*const classificacaoRoutes = require("./classificacao.routes.js");
const comentarioRoutes = require("./comentario.routes.js");
const estadoRoutes = require("./estado.routes.js");
const gostoRoutes = require("./gosto.routes.js");
const notificacaoRoutes = require("./notificacao.routes.js");
const perfilRoutes = require("./perfil.routes.js");
const revisaoRoutes = require("./revisao.routes.js");
const topicoRoutes = require("./topico.routes.js");
const utilizadorRoutes = require("./utilizador.routes.js");*/

module.exports = (app) => {
	categoriaRoutes(app);
};
