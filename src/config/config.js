require('dotenv').config();

module.exports =
{
  "development": {
    "username": 'root',
    "password": null,
    "database": 'nodejwt',
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
