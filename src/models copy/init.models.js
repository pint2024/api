import { DataTypes } from "sequelize";
import {
	AtividadeModels,
	CampoModels,
	ComentarioModels,
	ConversaModels,
	DenunciaModels,
	DocumentoModels,
	EstadoModels,
	FormularioModels,
	GostoModels,
	MensagemModels,
	NotificacaoModels,
	ParticipanteModels,
	PerfilModels,
	RegistoModels,
	RespostaModels,
	RevisaoModels,
	SedeModels,
	SubcomentarioModels,
	SubtopicoModels,
	TopicoModels,
	UtilizadorModels,
} from "./index.js";

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
	const estado = EstadoModels(sequelize, DataTypes);
	const formulario = FormularioModels(sequelize, DataTypes);
	const campo = CampoModels(sequelize, DataTypes);
	const registo = RegistoModels(sequelize, DataTypes);
	const resposta = RespostaModels(sequelize, DataTypes);
	const atividade = AtividadeModels(sequelize, DataTypes);
	const gosto = GostoModels(sequelize, DataTypes);
	const comentario = ComentarioModels(sequelize, DataTypes);
	const subcomentario = SubcomentarioModels(sequelize, DataTypes);
	const revisao = RevisaoModels(sequelize, DataTypes);
	const notificacao = NotificacaoModels(sequelize, DataTypes);
	const denuncia = DenunciaModels(sequelize, DataTypes);
	const conversa = ConversaModels(sequelize, DataTypes);
	const participante = ParticipanteModels(sequelize, DataTypes);
	const mensagem = MensagemModels(sequelize, DataTypes);
	const sede = SedeModels(sequelize, DataTypes);
	const documento = DocumentoModels(sequelize, DataTypes);

	defineAssociation(utilizador, perfil, "utilizador_perfil", "perfil");
	defineAssociation(utilizador, sede, "utilizador_sede", "sede");

	defineAssociation(subtopico, topico, "subtopico_topico", "topico");

	defineAssociation(registo, campo, "registo_campo", "campo");
	defineAssociation(registo, formulario, "registo_formulario", "formulario");

	defineAssociation(resposta, registo, "resposta_registo", "registo");
	defineAssociation(resposta, utilizador, "resposta_utilizador", "utilizador");

	defineAssociation(atividade, formulario, "atividade_formulario", "formulario");
	defineAssociation(atividade, subtopico, "atividade_subtopico", "subtopico");
	defineAssociation(atividade, utilizador, "atividade_utilizador", "utilizador");

	defineAssociation(gosto, atividade, "gosto_atividade", "atividade");
	defineAssociation(gosto, utilizador, "gosto_utilizador", "utilizador");

	defineAssociation(comentario, atividade, "comentario_atividade", "atividade");
	defineAssociation(comentario, utilizador, "comentario_utilizador", "utilizador");

	defineAssociation(subcomentario, comentario, "subcomentario_comentario", "comentario");
	defineAssociation(subcomentario, utilizador, "subcomentario_utilizador", "utilizador");

	defineAssociation(revisao, estado, "revisao_estado", "estado");
	defineAssociation(revisao, atividade, "revisao_atividade", "atividade");
	defineAssociation(revisao, comentario, "revisao_comentario", "comentario");

	defineAssociation(notificacao, atividade, "notificacao_atividade", "atividade");
	defineAssociation(notificacao, comentario, "notificacao_comentario", "comentario");

	defineAssociation(denuncia, atividade, "denuncia_atividade", "atividade");
	defineAssociation(denuncia, comentario, "denuncia_comentario", "comentario");
	defineAssociation(denuncia, utilizador, "denuncia_utilizador", "utilizador");

	defineAssociation(conversa, subtopico, "conversa_subtopico", "subtopico");

	defineAssociation(participante, conversa, "participante_conversa", "conversa");
	defineAssociation(participante, utilizador, "participante_utilizador", "utilizador");
	defineAssociation(participante, perfil, "participante_perfil", "perfil");

	defineAssociation(mensagem, participante, "mensagem_participante", "participante");
	defineAssociation(mensagem, conversa, "mensagem_conversa", "conversa");

	defineAssociation(documento, atividade, "documento_atividade", "atividade");

	return {
		atividade,
		campo,
		comentario,
		conversa,
		denuncia,
		documento,
		estado,
		formulario,
		gosto,
		mensagem,
		notificacao,
		participante,
		perfil,
		registo,
		resposta,
		revisao,
		sede,
		subcomentario,
		subtopico,
		topico,
		utilizador,
	};
}
