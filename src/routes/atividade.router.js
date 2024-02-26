import mongoose from 'mongoose';
import APIError from '~/utils/apiError';
import paginate from './plugins/paginatePlugin';
import toJSON from './plugins/toJSONPlugin';
import Permission from './permissionModel';
import httpStatus from 'http-status';

const roleSchema = mongoose.Schema(
	{
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		data_criacao: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.fn('now')
		},
		titulo: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		descricao: {
			type: DataTypes.STRING(100),
			allowNull: false
		},		
		endereco: {
			descricao: DataTypes.CHAR(500),
			allowNull: true
		},
		preco: {
			type: DataTypes.DECIMAL(19, 4),
			allowNull: true
		},
		data_evento: {
			type: DataTypes.DATE,
			allowNull: true
		},
		imagem: {
			type: DataTypes.DATE,
			allowNull: true
		},
		topico: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'topico',
				key: 'topico'
			}
		},
		revisao: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'revisao',
				key: 'revisao'
			}
		}
	},
	{
		timestamps: true
	}
);

roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

class RoleClass {
	static async isNameAlreadyExists(name, excludeUserId) {
		return !!(await this.findOne({ name, _id: { $ne: excludeUserId } }));
	}

	static async getRoleByName(name) {
		return await this.findOne({ name: name });
	}

	static async getRoleById(id) {
		return await this.findById(id);
	}

	static async createRole(body) {
		if (await this.isNameAlreadyExists(body.name)) {
			throw new APIError('Name already exists', httpStatus.BAD_REQUEST);
		}
		if (body.permissions) {
			await Promise.all(
				body.permissions.map(async (pid) => {
					if (!(await Permission.findById(pid))) {
						throw new APIError('Permissions not exist', httpStatus.BAD_REQUEST);
					}
				})
			);
		}
		return await this.create(body);
	}

	static async updateRoleById(roleId, body) {
		const role = await this.getRoleById(roleId);
		if (!role) {
			throw new APIError('Role not found', httpStatus.NOT_FOUND);
		}
		if (await this.isNameAlreadyExists(body.name, roleId)) {
			throw new APIError('Name already exists', httpStatus.BAD_REQUEST);
		}
		if (body.permissions) {
			await Promise.all(
				body.permissions.map(async (pid) => {
					if (!(await Permission.findById(pid))) {
						throw new APIError('Permissions not exist', httpStatus.BAD_REQUEST);
					}
				})
			);
		}
		Object.assign(role, body);
		return await role.save();
	}

	static async deleteRoleById(roleId) {
		const role = await this.getRoleById(roleId);
		if (!role) {
			throw new APIError('Role not found', httpStatus.NOT_FOUND);
		}
		return await role.remove();
	}
}

roleSchema.loadClass(RoleClass);

const Role = mongoose.model('roles', roleSchema);

export default Role;
