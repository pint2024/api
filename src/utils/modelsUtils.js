import { DataTypes } from "sequelize";
import { Sequelize as _Sequelize } from "sequelize";

export function dataCriacaoDataType() {
	return { type: DataTypes.DATE, defaultValue: _Sequelize.fn("now") };
}

export function primaryKeyDataType() {
	return { autoIncrement: true, type: DataTypes.INTEGER, allowNull: false, primaryKey: true };
}

export function foreignKeyDataType({ allowNull = false, defaultValue = null } = {}) {
	return { type: DataTypes.INTEGER, allowNull, defaultValue };
}

export function defineAssociation(childModel, parentModel, asKeyword, foreignKeyKeyword) {
	childModel.belongsTo(parentModel, {
		as: asKeyword,
		foreignKey: foreignKeyKeyword,
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});
	parentModel.hasMany(childModel, { as: asKeyword, foreignKey: foreignKeyKeyword, onDelete: "CASCADE", onUpdate: "CASCADE" });
}
