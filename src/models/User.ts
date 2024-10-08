import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";
import bcrypt from "bcrypt";
import { IEpisodeInstance } from "./Episode";

type checkPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    birth: Date;
    email: string;
    password: string;
    role: "admin" | "user"
};

export interface IUserCreationAttributes extends Optional<IUser, "id">{};

export interface IUserInstance extends Model<IUser, IUserCreationAttributes> , IUser {
    Episodes?: IEpisodeInstance[];
   checkPassword: (password: string, callbackfn: checkPasswordCallback) => void;
};


export const User = sequelize.define<IUserInstance, IUser>("User", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      birth: {
        allowNull: false,
        type: DataTypes.DATE
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            isIn:[[ "admin", "user"]]
        }
      }
},{
  hooks: {
    beforeSave: async (user) => {
      if(user.isNewRecord || user.changed("password")){
        user.password = await bcrypt.hash(user.password.toString(), 10)
      }
    }
  }
});

// @ts-ignore
User.prototype.checkPassword = function (password : string, callbackfn: checkPasswordCallback) {
  // @ts-ignore
  bcrypt.compare(password, this.password, (err, isSame) => {
      if(err){
          callbackfn(err, false);
      }else {
        callbackfn(err, isSame);
      }
  });
};