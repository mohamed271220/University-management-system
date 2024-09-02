import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PWD as string;
console.log(dbName, dbUser, dbPassword);

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT as string) || 5432,
  // logging: console.log,
  logging: false,
});

export default dbConnection;
