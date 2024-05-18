import Sequelize from "sequelize";
import { primaryKeyDataType, dataCriacaoDataType } from "../utils/index.js";

export default function (sequelize, DataTypes) {
    return sequelize.define(
        "recomendacao",
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
                    name: "pk_recomendacao",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};
