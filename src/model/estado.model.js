const DataTypesUtils = require('../utils/modelsDataTypes');

const estado = sequelize.define(
	"estado",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		estado: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = estado;
