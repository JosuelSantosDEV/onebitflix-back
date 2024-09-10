import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface ICourse {
    id: number,
    name: string,
    synopsis: string,
    thumbnailUrl: string,
    featured: boolean,
    categoryId: number
};

export interface ICourseCreationAttributes extends Optional<ICourse, "id" | "thumbnailUrl" | "featured"> {};

export interface ICourseInstance extends Model<ICourse, ICourseCreationAttributes>, ICourse {};

export const Course = sequelize.define<ICourseInstance, ICourse>("Course", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      synopsis: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      thumbnailUrl: {
        type: DataTypes.STRING
      },
      featured: {
        defaultValue: false,
        type: DataTypes.BOOLEAN
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "categories", key: "id"},
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      }
})
