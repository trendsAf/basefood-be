import { DataTypes, INTEGER, Model, Sequelize, UUIDV4 } from "sequelize";
import database_models from "../config/db.config";

interface UserAttributes {
  id?: number;
  name: string;
}

class Role extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;

  public static associate(models: { User: typeof database_models.Role }) {
    Role.hasMany(models.User, { foreignKey: "roleId", as: "users" });
  }
}
const Role_model = (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Roles",
      modelName: "Role",
    }
  );
  return Role;
};
export default Role_model;
