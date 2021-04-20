require('dotenv').config();

import db from "../models/index";
import userService from '../services/userService';
import jwt from 'jsonwebtoken';


let getHomepage = async (req, res) => {
    return res.render('homepage.ejs')
}

let handleRegister = async (req, res) => {
    try {

        //check email exist?
        let isExist = await userService.isEmailUserExist(req.body.email);
        if (isExist) {
            return res.status(200).json({
                message: `user's email: ${req.body.email} already exist`
            })
        } else {

            //hash the user's password
            let hashPassword = await userService.hashUserPassword(req.body.password);

            //create a new user
            await db.User.create({
                email: req.body.email,
                password: hashPassword
            });

            return res.status(200).json({
                message: 'ok'
            })
        }


    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error from the server'
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        let users = await userService.getUsers();
        return res.status(200).json({
            data: users
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error from the server'
        })
    }
}

let handleLogin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(500).json({
            message: 'Missing input parameters: email and password are required'
        })
    }

    let user = await userService.handleLoginUser(req.body.email, req.body.password);
    if (user) {
        //true
        // return jwt token
        // Create a token
        let payload = { user: user.email };
        let options = { expiresIn: '2d' };
        let secret = process.env.JWT_SECRET;
        let token = jwt.sign(payload, secret, options);

        return res.status(200).json({
            message: 'ok',
            jwt: token
        })

    } else {
        return res.status(500).json({
            message: 'Unauthentiacted user'
        })
    }
}


module.exports = {
    getHomepage: getHomepage,
    handleRegister: handleRegister,
    getAllUser: getAllUser,
    handleLogin: handleLogin,
}
