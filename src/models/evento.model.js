import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";

export default function (sequelize, DataTypes) {
    return sequelize.define(
        "evento",
        {
            id: primaryKeyDataType(),
            data_criacao: dataCriacaoDataType(),
            data_evento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            schema: "public",
            timestamps: false,
            freezeTableName: true,
            indexes: [
                {
                    name: "pk_evento",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
