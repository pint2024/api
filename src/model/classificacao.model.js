const DataTypesUtils = require('../utils/modelsDataTypes');

const classificacao = sequelize.define(
	"classificacao",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		classificacao: {
			type: DataTypes.SMALLINT,
			allowNull: false,
		},
		atividade: DataTypesUtils.foreignKeyDataType(),
		utilizador: DataTypesUtils.foreignKeyDataType(),
	},
	{
		timestamps: false,
		freezeTableName: true,
		validate: {
			isValidClassificacao(value) {
				if (value < 0 || value > 10) {
					throw new Error("A classificação deve estar entre 0 e 10.");
				}
			},
		},
	}
);

module.exports = classificacao;
