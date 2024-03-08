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
const _conversa = require("./conversa.models");
const _participante = require("./participante.models");
const _mensagem = require("./mensagem.models");

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
	const conversa = _conversa(sequelize, DataTypes);
	const participante = _participante(sequelize, DataTypes);
	const mensagem = _mensagem(sequelize, DataTypes);

	defineAssociation(utilizador, perfil, "utilizador_perfil", "perfil");
	defineAssociation(topico, categoria, "topico_categoria", "categoria");
	defineAssociation(atividade, topico, "atividade_topico", "topico");
	defineAssociation(atividade, revisao, "atividade_revisao", "revisao");
	defineAssociation(atividade, utilizador, "atividade_utilizador", "utilizador");
	defineAssociation(gosto, atividade, "gosto_atividade", "atividade");
	defineAssociation(gosto, utilizador, "gosto_utilizador", "utilizador");
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
	defineAssociation(conversa, topico, "conversa_topico", "topico");
	defineAssociation(participante, conversa, "participante_conversa", "conversa");
	defineAssociation(participante, utilizador, "participante_utilizador", "utilizador");
	defineAssociation(participante, perfil, "participante_perfil", "perfil");
	defineAssociation(mensagem, participante, "mensagem_participante", "participante");
	defineAssociation(mensagem, conversa, "mensagem_conversa", "conversa");
	
	return {
		perfil,
		utilizador,
		categoria,
		topico,
		atividade,
		gosto,
		estado,
		revisao,
		comentario,
		classificacao,
		notificacao,
		denuncia,
		conversa,
		participante,
		mensagem,
	};
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
