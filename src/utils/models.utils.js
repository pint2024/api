import { DataTypes, Sequelize } from "sequelize";

export class ModelsUtils {
	static dataCriacaoDataType() {
		return { type: DataTypes.DATE, defaultValue: Sequelize.fn("now") };
	}
	
	static primaryKeyDataType() {
		return { autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, primaryKey: true };
	}
	
	static foreignKeyDataType({ allowNull = false, defaultValue = null } = {}) {
		return { type: DataTypes.INTEGER, allowNull, defaultValue };
	}
	
	static defineAssociation(childModel, parentModel) {
		const asKeyword = childModel.name + "_" + parentModel.name;
		const foreignKeyKeyword = parentModel.name;
	
		childModel.belongsTo(parentModel, {
			as: asKeyword,
			foreignKey: foreignKeyKeyword,
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		});
		parentModel.hasMany(childModel, { as: asKeyword, foreignKey: foreignKeyKeyword, onDelete: "CASCADE", onUpdate: "CASCADE" });
	}
}
