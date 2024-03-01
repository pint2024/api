const Sequelize = require("sequelize");
const DataTypesUtils = require("../utils/modelsUtils");
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"notificacao",
		{
			id: DataTypesUtils.primaryKeyDataType(),
			data_criacao: DataTypesUtils.dataCriacaoDataType(),
			visualizado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			titulo: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			descricao: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
			utilizador: DataTypesUtils.foreignKeyDataType(),
			atividade: DataTypesUtils.foreignKeyDataType({ allowNull: true}),
			comentario: DataTypesUtils.foreignKeyDataType({ allowNull: true}),
			revisao: DataTypesUtils.foreignKeyDataType({ allowNull: true}),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			validate: {
				checkExclusividade() {
					if (
						(this.atividade !== null && this.comentario !== null) ||
						(this.atividade !== null && this.revisao !== null) ||
						(this.comentario !== null && this.revisao !== null)
					) {
						throw new Error("A notificação só pode estar associada a uma atividade, um comentário ou uma revisão.");
					}
				},
			},
			indexes: [
				{
					name: "pk_notificacao",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
};
