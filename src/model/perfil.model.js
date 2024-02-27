const { sequelize } = require("../config/database.config");
const DataTypesUtils = require('../utils/modelsDataTypes');

const perfil = sequelize.define(
	"perfil",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		perfil: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = perfil;
