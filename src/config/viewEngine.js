/**
 * Config view engine (ejs) for the express app
 */
import express from 'express';

let configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(express.static("./src/public"));
}

module.exports = configViewEngine;