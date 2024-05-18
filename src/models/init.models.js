import { DataTypes } from "sequelize";
import { defineAssociation } from "../utils/models.utils.js";
import {
	AlbumModel,
	AtividadeModel,
	CentroModel,
	ClassificacaoModel,
	ComentarioModel,
	ConteudoModel,
	DenunciaModel,
	DocumentoModel,
	EspacoModel,
	EstadoModel,
	EventoModel,
	InteresseModel,
	NotificacaoModel,
	ParticipanteModel,
	PerfilModel,
	RecomendacaoModel,
	RevisaoModel,
	SubtopicoModel,
	TopicoModel,
	UtilizadorModel,
} from "./index.js";
import { Database } from "../config/database.config.js";

const models = {};

export const InitModels = async (sequelize) => {
	const album = AlbumModel(sequelize, DataTypes);
	const atividade = AtividadeModel(sequelize, DataTypes);
	const centro = CentroModel(sequelize, DataTypes);
	const classificacao = ClassificacaoModel(sequelize, DataTypes);
	const comentario = ComentarioModel(sequelize, DataTypes);
	const conteudo = ConteudoModel(sequelize, DataTypes);
	const denuncia = DenunciaModel(sequelize, DataTypes);
	const documento = DocumentoModel(sequelize, DataTypes);
	const espaco = EspacoModel(sequelize, DataTypes);
	const estado = EstadoModel(sequelize, DataTypes);
	const evento = EventoModel(sequelize, DataTypes);
	const interesse = InteresseModel(sequelize, DataTypes);
	const notificacao = NotificacaoModel(sequelize, DataTypes);
	const participante = ParticipanteModel(sequelize, DataTypes);
	const perfil = PerfilModel(sequelize, DataTypes);
	const recomendacao = RecomendacaoModel(sequelize, DataTypes);
	const revisao = RevisaoModel(sequelize, DataTypes);
	const subtopico = SubtopicoModel(sequelize, DataTypes);
	const topico = TopicoModel(sequelize, DataTypes);
	const utilizador = UtilizadorModel(sequelize, DataTypes);

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

	models.album = album;
	models.atividade = atividade;
	models.centro = centro;
	models.classificacao = classificacao;
	models.comentario = comentario;
	models.conteudo = conteudo;
	models.denuncia = denuncia;
	models.documento = documento;
	models.espaco = espaco;
	models.estado = estado;
	models.evento = evento;
	models.interesse = interesse;
	models.notificacao = notificacao;
	models.participante = participante;
	models.perfil = perfil;
	models.recomendacao = recomendacao;
	models.revisao = revisao;
	models.subtopico = subtopico;
	models.topico = topico;
	models.utilizador = utilizador;

	await Database.sync(sequelize);
};

export { models };
