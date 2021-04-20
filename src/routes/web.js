/**
 * config all web routes
 */

import express from "express";
import hompageController from "../controllers/homepageController";
import auth from "../middleware/auth";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', hompageController.getHomepage);
    router.post('/register', hompageController.handleRegister);
    router.post('/login', hompageController.handleLogin);

    router.get('/get-all-users', auth.validateJWT, hompageController.getAllUser);


    return app.use('/', router);
};

module.exports = initWebRoutes;
