require('dotenv').config();

const { Sequelize, Model } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

let db = async () => {

    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: DB_PORT,
        logging: false,
    })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = db;
