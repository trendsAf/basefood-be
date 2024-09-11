import { config } from "dotenv";
import { Sequelize } from "sequelize";
import Models from "../models";

config();

let db_uri: string = "";
const APP_MODE: string = process.env.NODE_ENV || "development";
const DB_MODE: string = process.env.DB_MODE || "local";

switch (APP_MODE) {
	case "test":
		db_uri = process.env.DB_TEST_URL || "";
		break;
	case "production":
		db_uri = process.env.DB_PROD_URL || "";
		break;
	default:
		db_uri = process.env.DB_DEV_URL || "";
		break;
}

if (!db_uri) {
	console.error(
		"Error: Database URI is not defined. Please check your environment variables."
	);
	process.exit(1);
}

const isLocal = DB_MODE === "local";
const sslRequired = process.env.SSL === "true";
const dialect_option = isLocal
	? {}
	: {
			ssl: {
				require: sslRequired,
				rejectUnauthorized: true,
			},
	  };

export const sequelizeConnection: Sequelize = new Sequelize(db_uri, {
	dialect: "postgres",
	dialectOptions: dialect_option,
	logging: false,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export const connectionToDatabase = async () => {
	try {
		await sequelizeConnection.authenticate();
		await sequelizeConnection.sync();
		console.log("Database connected successfully:", db_uri);
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		process.exit(1);
	}
};

const db_models = Models(sequelizeConnection);

Object.keys(db_models).forEach((key) => {
	// @ts-expect-error ignore expected errors
	if (db_models[key].associate) {
		// @ts-expect-error ignore expected errors
		db_models[key].associate(db_models);
	}
});

const database_models = { ...db_models };
export default database_models;
