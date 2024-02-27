const DataTypesUtils = require('../utils/modelsDataTypes');

const gosto = sequelize.define(
	"gosto",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		atividade: DataTypesUtils.foreignKeyDataType(),
		utilizador: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = gosto;
