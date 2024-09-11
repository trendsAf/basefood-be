import { Sequelize } from "sequelize";
import user_model from "./User";
import Role_model from "./Role";

const Models = (sequelize: Sequelize) => {
	const User = user_model(sequelize);
	const Role = Role_model(sequelize);
	return { User, Role };
};

export default Models;
