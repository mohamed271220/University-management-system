import { Sequelize } from 'sequelize-typescript';
// add all models here

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: console.log, // Enable detailed logging
  models: [], // Add your models here
});
