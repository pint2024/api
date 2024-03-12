import { DataTypes } from "sequelize";
import {
	AtividadeModels,
	CategoriaModels,
	ClassificacaoModels,
	ComentarioModels,
	ConversaModels,
	DenunciaModels,
	EstadoModels,
	GostoModels,
	MensagemModels,
	NotificacaoModels,
	ParticipanteModels,
	PerfilModels,
	RevisaoModels,
	TopicoModels,
	UtilizadorModels,
} from "./__init__.js";

function defineAssociation(childModel, parentModel, asKeyword, foreignKeyKeyword) {
	childModel.belongsTo(parentModel, {
		as: asKeyword,
		foreignKey: foreignKeyKeyword,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	parentModel.hasMany(childModel, { as: asKeyword, foreignKey: foreignKeyKeyword, onDelete: "CASCADE", onUpdate: "CASCADE" });
}

export function initModels(sequelize) {
	const perfil = PerfilModels(sequelize, DataTypes);
	const utilizador = UtilizadorModels(sequelize, DataTypes);
	const categoria = CategoriaModels(sequelize, DataTypes);
	const topico = TopicoModels(sequelize, DataTypes);
	const atividade = AtividadeModels(sequelize, DataTypes);
	const gosto = GostoModels(sequelize, DataTypes);
	const estado = EstadoModels(sequelize, DataTypes);
	const revisao = RevisaoModels(sequelize, DataTypes);
	const comentario = ComentarioModels(sequelize, DataTypes);
	const classificacao = ClassificacaoModels(sequelize, DataTypes);
	const notificacao = NotificacaoModels(sequelize, DataTypes);
	const denuncia = DenunciaModels(sequelize, DataTypes);
	const conversa = ConversaModels(sequelize, DataTypes);
	const participante = ParticipanteModels(sequelize, DataTypes);
	const mensagem = MensagemModels(sequelize, DataTypes);

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
