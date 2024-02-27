const DataTypesUtils = require('../utils/modelsDataTypes');

const revisao = sequelize.define(
	"revisao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		motivo: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		utilizador: DataTypesUtils.foreignKeyDataType(),
		estado: DataTypesUtils.foreignKeyDataType({ defaultValue: 1 }),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = revisao;
