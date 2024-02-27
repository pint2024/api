const DataTypesUtils = require('../utils/modelsDataTypes');

const atividade = sequelize.define(
	"atividade",
	{
		id: DataTypesUtils.primaryKeyDataType(),
		data_criacao: DataTypesUtils.dataCriacaoDataType(),
		titulo: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		descricao: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		endereco: {
			type: DataTypes.STRING(500),
			allowNull: true,
		},
		preco: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true,
		},
		data_evento: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		imagem: {
			type: DataTypes.STRING(500),
			allowNull: true,
		},
		topico: DataTypesUtils.foreignKeyDataType(),
		revisao: DataTypesUtils.foreignKeyDataType({ allowNull: true }),
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = atividade;
