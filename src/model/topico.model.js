const DataTypesUtils = require('../utils/modelsDataTypes');

const revisao = sequelize.define(
	"revisao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		area: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		categoria: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = revisao;
