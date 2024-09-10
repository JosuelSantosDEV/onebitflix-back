import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface ICategory {
    id: number;
    name: string;
    position: number;
};

export interface CategoryCreationAttributes extends Optional<ICategory , "id">{};

export interface CategoryInstance extends Model<ICategory, CategoryCreationAttributes> , ICategory {};

export const Category = sequelize.define<CategoryInstance, ICategory>("Category", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name:{
        allowNull: false,
        type: DataTypes.STRING
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
});