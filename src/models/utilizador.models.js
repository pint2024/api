import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import { primaryKeyDataType, dataCriacaoDataType, foreignKeyDataType } from "../utils/__init__.js";
import { random, ToLower } from "../utils/utils.js";
import { TAG_DEFAULT } from "../data/constants.js";
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
		const tagDefault = TAG_DEFAULT(user.nome, user.sobrenome);
		let tag = tagDefault;
		console.log(tag);
		let encontrou = false;
		while (!encontrou) {
			console.log("a");
			const tagResponse = await Models.findOne({ where: { tag } });
			console.log(tagResponse);
			if (tagResponse) {
				tag = tagDefault + random(0, 10000);
			} else {
				encontrou = true;
			}
		}
		user.tag = tag;
	});

	return Models;
}
