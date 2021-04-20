import db from "../models/index";
import bcrypt from 'bcrypt';


const saltRounds = 10;

let isEmailUserExist = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ where: { email: userEmail } });

            if (!user) {
                //not found
                resolve(false)
            }

            //found a record
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })
};

let hashUserPassword = (myPlaintextPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                    resolve(hash)
                });
            });
        } catch (e) {
            reject(e)
        }
    })
}

let getUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ attributes: ['email', 'password'] });
            resolve(users);
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}

let handleLoginUser = (userEmail, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })

            if (!user) {
                resolve(false)
            }

            //checking user's password

            let result = await bcrypt.compare(userPassword, user.password);
            if (result) {
                //true
                resolve(user);
            } else {
                //result === false
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    isEmailUserExist: isEmailUserExist,
    hashUserPassword: hashUserPassword,
    getUsers: getUsers,
    handleLoginUser: handleLoginUser,
}