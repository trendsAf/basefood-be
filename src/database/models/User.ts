import { Model, DataTypes, Sequelize, UUIDV4, INET } from "sequelize";
import database_models from "../config/db.config";
import { UserModelAttributes } from "../../types/models";

interface UserAttributes {
  id?: number;
  fullName: string;
  userName: string;
  phoneNumber: string;
  companyName: string;
  companyAddress: string;
  companyType: string;
  companyCategory: string;
  email: string;
  roleId: number;
  password: string;
}

export class User extends Model<UserAttributes> {
  public id!: number;
  public fullName!: string;
  public phoneNumber!: string;
  public companyName!: string;
  public companyAddress!: string;
  public companyType!: string;
  public companyCategory!: string;
  public userName!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;

  public static associate(models: { Role: typeof database_models.Role }) {
    User.belongsTo(models.Role, { as: "Roles", foreignKey: "roleId" });
  }
}

const user_model = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phoneNumber: {
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
      companyType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyCategory: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
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
