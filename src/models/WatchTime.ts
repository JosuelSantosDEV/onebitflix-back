import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface IWatchTime {
    seconds: number;
    userId: number;
    episodeId: number;
};

export interface IWatchTimeInstance extends Model<IWatchTime>, IWatchTime {};

export const WatchTime = sequelize.define<IWatchTimeInstance, IWatchTime>("WatchTime",{
      seconds: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      episodeId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
});