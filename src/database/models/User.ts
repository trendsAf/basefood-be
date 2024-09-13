import { Model, DataTypes, Sequelize, UUIDV4, INET } from "sequelize";
import database_models from "../config/db.config";
import { UserModelAttributes } from "../../types/models";

interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  companyCategory: string;
  position: string;
  password: string;
  role?: string;
}

export class User extends Model<UserAttributes> {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public companyName!: string;
  public companyAddress!: string;
  public companyCategory!: string;
  public position!: string;
  public email!: string;
  public role!: string;
  public password!: string;
}

const user_model = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      companyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      companyAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      companyCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        validate: {
          isIn: [["admin", "user"]],
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return User;
};

export default user_model;
