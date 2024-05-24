import { DataTypes } from "sequelize";
import { defineAssociation } from "../utils/models.utils.js";
import {
	AlbumModel,
	CentroModel,
	ClassificacaoModel,
	ComentarioModel,
	ConteudoModel,
	DenunciaModel,
	DocumentoModel,
	EstadoModel,
	InteresseModel,
	NotificacaoModel,
	ParticipanteModel,
	PerfilModel,
	RevisaoModel,
	SubtopicoModel,
	TipoModel,
	TopicoModel,
	UtilizadorModel,
} from "../models/index.js";
import { DatabaseConfig } from "./database.config.js";
import { log } from "../utils/log.utils.js";

export const models = {};

export const ModelsConfig = async (sequelize) => {
	const album = AlbumModel(sequelize, DataTypes);
	const centro = CentroModel(sequelize, DataTypes);
	const classificacao = ClassificacaoModel(sequelize, DataTypes);
	const comentario = ComentarioModel(sequelize, DataTypes);
	const conteudo = ConteudoModel(sequelize, DataTypes);
	const denuncia = DenunciaModel(sequelize, DataTypes);
	const documento = DocumentoModel(sequelize, DataTypes);
	const estado = EstadoModel(sequelize, DataTypes);
	const interesse = InteresseModel(sequelize, DataTypes);
	const notificacao = NotificacaoModel(sequelize, DataTypes);
	const participante = ParticipanteModel(sequelize, DataTypes);
	const perfil = PerfilModel(sequelize, DataTypes);
	const revisao = RevisaoModel(sequelize, DataTypes);
	const subtopico = SubtopicoModel(sequelize, DataTypes);
	const tipo = TipoModel(sequelize, DataTypes);
	const topico = TopicoModel(sequelize, DataTypes);
	const utilizador = UtilizadorModel(sequelize, DataTypes);

	defineAssociation(classificacao, conteudo);
	defineAssociation(classificacao, comentario);
	defineAssociation(classificacao, utilizador);

	defineAssociation(comentario, conteudo);
	defineAssociation(comentario, utilizador);

	defineAssociation(conteudo, utilizador);
	defineAssociation(conteudo, subtopico);
	defineAssociation(conteudo, album);
	defineAssociation(conteudo, tipo);

	defineAssociation(denuncia, comentario);
	defineAssociation(denuncia, utilizador);

	defineAssociation(documento, conteudo);

	defineAssociation(interesse, subtopico);
	defineAssociation(interesse, utilizador);

	defineAssociation(notificacao, conteudo);
	defineAssociation(notificacao, comentario);

	defineAssociation(participante, conteudo);

	defineAssociation(revisao, estado);
	defineAssociation(revisao, conteudo);
	defineAssociation(revisao, comentario);

	defineAssociation(subtopico, topico);

	defineAssociation(utilizador, perfil);
	defineAssociation(utilizador, centro);

	models.album = album;
	models.centro = centro;
	models.classificacao = classificacao;
	models.comentario = comentario;
	models.conteudo = conteudo;
	models.denuncia = denuncia;
	models.documento = documento;
	models.estado = estado;
	models.interesse = interesse;
	models.notificacao = notificacao;
	models.participante = participante;
	models.perfil = perfil;
	models.revisao = revisao;
	models.subtopico = subtopico;
	models.tipo = tipo;
	models.topico = topico;
	models.utilizador = utilizador;

	log.models("Models inicializados.");
	await DatabaseConfig.sync(sequelize);
};
