import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface ILike {
    userId: number;
    courseId: number;
};

export interface ILikeInstance extends Model<ILike>, ILike {};

export const Like = sequelize.define<ILikeInstance, ILike>("Like", {
    userId: {
        allowNull: false,
        primaryKey: true,
        references: {
            model: "users",
            key: "id"
        },
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    courseId: {
        allowNull: false,
        primaryKey: true,
        references: {
            model: "courses",
            key: "id"
        },
        type: DataTypes.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
});