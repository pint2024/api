const DataTypes = require("sequelize").DataTypes;
const _perfil = require("./perfil.models");
const _utilizador = require("./utilizador.models");
const _categoria = require("./categoria.models");
const _topico = require("./topico.models");
const _atividade = require("./atividade.models");
const _gosto = require("./gosto.models");
const _estado = require("./estado.models");
const _revisao = require("./revisao.models");
const _classificacao = require("./classificacao.models");
const _comentario = require("./comentario.models");
const _notificacao = require("./notificacao.models");
const _denuncia = require("./denuncia.models");


function defineAssociation(childModel, parentModel, asKeyword, foreignKeyKeyword) {
	childModel.belongsTo(parentModel, {
		as: asKeyword,
		foreignKey: foreignKeyKeyword,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	parentModel.hasMany(childModel, { as: asKeyword, foreignKey: foreignKeyKeyword, onDelete: "CASCADE", onUpdate: "CASCADE" });
}


function initModels(sequelize) {
	const perfil = _perfil(sequelize, DataTypes);
	const utilizador = _utilizador(sequelize, DataTypes);
	const categoria = _categoria(sequelize, DataTypes);
	const topico = _topico(sequelize, DataTypes);
	const atividade = _atividade(sequelize, DataTypes);
	const gosto = _gosto(sequelize, DataTypes);
	const estado = _estado(sequelize, DataTypes);
	const revisao = _revisao(sequelize, DataTypes);
	const comentario = _comentario(sequelize, DataTypes);
	const classificacao = _classificacao(sequelize, DataTypes);
	const notificacao = _notificacao(sequelize, DataTypes);
	const denuncia = _denuncia(sequelize, DataTypes);

	defineAssociation(utilizador, perfil, "utilizador_perfil", "perfil");
	defineAssociation(topico, categoria, "topico_categoria", "categoria");
	defineAssociation(atividade, topico, "atividade_topico", "topico");
	defineAssociation(atividade, revisao, "atividade_revisao", "revisao");
	defineAssociation(gosto, atividade, "gosto_atividade", "atividade");
	defineAssociation(gosto, utilizador, "gosto_utilizador", "utilizador");
	defineAssociation(revisao, utilizador, "revisao_utilizador", "utilizador");
	defineAssociation(revisao, estado, "revisao_estado", "estado");
	defineAssociation(comentario, atividade, "comentario_atividade", "atividade");
	defineAssociation(comentario, utilizador, "comentario_utilizador", "utilizador");
	defineAssociation(classificacao, atividade, "classificacao_atividade", "atividade");
	defineAssociation(classificacao, utilizador, "classificacao_utilizador", "utilizador");
	defineAssociation(notificacao, utilizador, "notificacao_utilizador", "utilizador");
	defineAssociation(notificacao, atividade, "notificacao_atividade", "atividade");
	defineAssociation(notificacao, comentario, "notificacao_comentario", "comentario");
	defineAssociation(notificacao, revisao, "notificacao_revisao", "revisao");
	defineAssociation(denuncia, atividade, "denuncia_atividade", "atividade");
	defineAssociation(denuncia, utilizador, "denuncia_utilizador", "utilizador");

	return {
		atividade,
		categoria,
		classificacao,
		comentario,
		estado,
		notificacao,
		perfil,
		revisao,
		topico,
		utilizador,
	};
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
