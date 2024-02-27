const DataTypesUtils = require('../utils/modelsDataTypes');

const categoria = sequelize.define(
	"categoria",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		categoria: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = categoria;
