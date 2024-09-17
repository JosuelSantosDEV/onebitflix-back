import { DataTypes, Model } from "sequelize";
import { ICourseInstance } from "./Course";
import { IUserInstance } from "./User";
import { sequelize } from "../database";

export interface IFavorite {
    userId: number,
    courseId: number
};

export interface IFavoriteInstance extends Model<IFavorite>, IFavorite {
    user?: IUserInstance;
    course?: ICourseInstance;
};

export const Favorite = sequelize.define<IFavoriteInstance,IFavorite>("Favorite", {
    userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    courseId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "courses",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },

});