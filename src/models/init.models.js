import { DataTypes } from "sequelize";
import { defineAssociation } from "../utils/modelsUtils.js";
import {
	AlbumModels,
	AtividadeModels,
	CentroModels,
	ClassificacaoModels,
	ComentarioModels,
	ConteudoModels,
	DenunciaModels,
	DocumentoModels,
	EspacoModels,
	EstadoModels,
	EventoModels,
	InteresseModels,
	NotificacaoModels,
	ParticipanteModels,
	PerfilModels,
	RecomendacaoModels,
	RevisaoModels,
	SubtopicoModels,
	TopicoModels,
	UtilizadorModels,
} from "./index.js";

export function initModels(sequelize) {
	const album = AlbumModels(sequelize, DataTypes);
	const atividade = AtividadeModels(sequelize, DataTypes);
	const centro = CentroModels(sequelize, DataTypes);
	const classificacao = ClassificacaoModels(sequelize, DataTypes);
	const comentario = ComentarioModels(sequelize, DataTypes);
	const conteudo = ConteudoModels(sequelize, DataTypes);
	const denuncia = DenunciaModels(sequelize, DataTypes);
	const documento = DocumentoModels(sequelize, DataTypes);
	const espaco = EspacoModels(sequelize, DataTypes);
	const estado = EstadoModels(sequelize, DataTypes);
	const evento = EventoModels(sequelize, DataTypes);
	const interesse = InteresseModels(sequelize, DataTypes);
	const notificacao = NotificacaoModels(sequelize, DataTypes);
	const participante = ParticipanteModels(sequelize, DataTypes);
	const perfil = PerfilModels(sequelize, DataTypes);
	const recomendacao = RecomendacaoModels(sequelize, DataTypes);
	const revisao = RevisaoModels(sequelize, DataTypes);
	const subtopico = SubtopicoModels(sequelize, DataTypes);
	const topico = TopicoModels(sequelize, DataTypes);
	const utilizador = UtilizadorModels(sequelize, DataTypes);

	defineAssociation(classificacao, conteudo, "classificacao_conteudo", "conteudo");
	defineAssociation(classificacao, comentario, "classificacao_comentario", "comentario");
	defineAssociation(classificacao, utilizador, "classificacao_utilizador", "utilizador");

	defineAssociation(comentario, conteudo, "comentario_conteudo", "conteudo");
	defineAssociation(comentario, utilizador, "comentario_utilizador", "utilizador");

	defineAssociation(conteudo, utilizador, "conteudo_utilizador", "utilizador");
	defineAssociation(conteudo, subtopico, "conteudo_subtopico", "subtopico");
	defineAssociation(conteudo, album, "conteudo_album", "album");
	defineAssociation(conteudo, espaco, "conteudo_espaco", "espaco");
	defineAssociation(conteudo, evento, "conteudo_evento", "evento");
	defineAssociation(conteudo, atividade, "conteudo_atividade", "atividade");
	defineAssociation(conteudo, recomendacao, "conteudo_recomendacao", "recomendacao");

	defineAssociation(denuncia, comentario, "denuncia_comentario", "comentario");
	defineAssociation(denuncia, utilizador, "denuncia_utilizador", "utilizador");

	defineAssociation(documento, conteudo, "documento_conteudo", "conteudo");

	defineAssociation(interesse, subtopico, "interesse_subtopico", "subtopico");
	defineAssociation(interesse, utilizador, "interesse_utilizador", "utilizador");

	defineAssociation(notificacao, conteudo, "notificacao_conteudo", "conteudo");
	defineAssociation(notificacao, comentario, "notificacao_comentario", "comentario");

	defineAssociation(participante, evento, "participante_evento", "evento");
	defineAssociation(participante, atividade, "participante_atividade", "atividade");

	defineAssociation(revisao, estado, "revisao_estado", "estado");
	defineAssociation(revisao, conteudo, "revisao_conteudo", "conteudo");
	defineAssociation(revisao, comentario, "revisao_comentario", "comentario");

	defineAssociation(subtopico, topico, "subtopico_topico", "topico");

	defineAssociation(utilizador, perfil, "utilizador_perfil", "perfil");
	defineAssociation(utilizador, centro, "utilizador_centro", "centro");

	return {
		album,
		atividade,
		centro,
		classificacao,
		comentario,
		conteudo,
		denuncia,
		documento,
		espaco,
		estado,
		evento,
		interesse,
		notificacao,
		participante,
		perfil,
		recomendacao,
		revisao,
		subtopico,
		topico,
		utilizador,
	};
}
