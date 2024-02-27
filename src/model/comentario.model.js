const DataTypesUtils = require('../utils/modelsDataTypes');

const comentario = sequelize.define(
	"comentario",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		comentario: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		atividade: DataTypesUtils.foreignKeyDataType(),
		utilizador: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = comentario;
