import bcrypt from "bcrypt";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType, Utils } from "../utils/index.js";
export default function (sequelize, DataTypes) {
	const Models = sequelize.define(
		"utilizador",
		{
			id: primaryKeyDataType(),
			data_criacao: dataCriacaoDataType(),
			tag: {
				type: DataTypes.STRING(21),
				allowNull: true,
				unique: "utilizador_tag_key",
			},
			nome: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			sobrenome: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: "utilizador_email_key",
			},
			senha: {
				type: DataTypes.STRING(500),
				allowNull: false,
				set(value) {
					const hashedPassword = bcrypt.hashSync(value, 10);
					this.setDataValue("senha", hashedPassword);
				},
			},
			verificado: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			inativo: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			imagem: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			linkedin: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			instagram: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			facebook: {
				type: DataTypes.STRING(500),
				allowNull: true,
			},
			perfil: foreignKeyDataType({ defaultValue: 1 }),
			centro: foreignKeyDataType(),
		},
		{
			sequelize,
			schema: "public",
			timestamps: false,
			freezeTableName: true,
			indexes: [
				{
					name: "pk_utilizador",
					unique: true,
					fields: [{ name: "id" }],
				},
			],
		}
	);
	Models.beforeCreate(async (user, options) => {
		const tagDefault = Utils.TagDefault(user.nome, user.sobrenome);
		let tag = tagDefault;
		let encontrou = false;
		while (!encontrou) {
			const tagResponse = await Models.findOne({ where: { tag } });
			if (tagResponse) {
				tag = tagDefault + Utils.random(0, 10000);
			} else {
				encontrou = true;
			}
		}
		user.tag = tag;
	});

	return Models;
}
