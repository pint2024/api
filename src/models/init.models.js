import { DataTypes } from "sequelize";
import {
	AtividadeModels,
	TopicoModels,
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
	SubtopicoModels,
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
	const topico = TopicoModels(sequelize, DataTypes);
	const subtopico = SubtopicoModels(sequelize, DataTypes);
	const atividade = AtividadeModels(sequelize, DataTypes);
	const gosto = GostoModels(sequelize, DataTypes);
	const estado = EstadoModels(sequelize, DataTypes);
	const revisao = RevisaoModels(sequelize, DataTypes);
	const comentario = ComentarioModels(sequelize, DataTypes);
	const notificacao = NotificacaoModels(sequelize, DataTypes);
	const denuncia = DenunciaModels(sequelize, DataTypes);
	const conversa = ConversaModels(sequelize, DataTypes);
	const participante = ParticipanteModels(sequelize, DataTypes);
	const mensagem = MensagemModels(sequelize, DataTypes);

	defineAssociation(utilizador, perfil, "utilizador_perfil", "perfil");
	defineAssociation(subtopico, topico, "subtopico_topico", "topico");
	defineAssociation(atividade, formulario, "atividade_formulario", "formulario");
	defineAssociation(atividade, revisao, "atividade_revisao", "revisao");
	defineAssociation(atividade, subtopico, "atividade_subtopico", "subtopico");
	defineAssociation(atividade, utilizador, "atividade_utilizador", "utilizador");
	defineAssociation(gosto, atividade, "gosto_atividade", "atividade");
	defineAssociation(gosto, utilizador, "gosto_utilizador", "utilizador");
	defineAssociation(revisao, estado, "revisao_estado", "estado");
	defineAssociation(revisao, atividade, "revisao_atividade", "atividade");
	defineAssociation(revisao, comentario, "revisao_comentario", "comentario");
	defineAssociation(comentario, atividade, "comentario_atividade", "atividade");
	defineAssociation(comentario, utilizador, "comentario_utilizador", "utilizador");
	defineAssociation(notificacao, utilizador, "notificacao_utilizador", "utilizador");
	defineAssociation(notificacao, atividade, "notificacao_atividade", "atividade");
	defineAssociation(notificacao, comentario, "notificacao_comentario", "comentario");
	defineAssociation(notificacao, revisao, "notificacao_revisao", "revisao");
	defineAssociation(denuncia, atividade, "denuncia_atividade", "atividade");
	defineAssociation(denuncia, comentario, "denuncia_comentario", "comentario");
	defineAssociation(denuncia, utilizador, "denuncia_utilizador", "utilizador");
	defineAssociation(conversa, subtopico, "conversa_subtopico", "subtopico");
	defineAssociation(participante, conversa, "participante_conversa", "conversa");
	defineAssociation(participante, utilizador, "participante_utilizador", "utilizador");
	defineAssociation(participante, perfil, "participante_perfil", "perfil");
	defineAssociation(mensagem, participante, "mensagem_participante", "participante");
	defineAssociation(mensagem, conversa, "mensagem_conversa", "conversa");

	return {
		perfil,
		utilizador,
		topico,
		topico,
		atividade,
		gosto,
		estado,
		revisao,
		comentario,
		notificacao,
		denuncia,
		conversa,
		participante,
		mensagem,
	};
}
