import { Sequelize } from "sequelize";
import user_model from "./User";

const Models = (sequelize: Sequelize) => {
  const User = user_model(sequelize);
  return { User };
};

export default Models;
