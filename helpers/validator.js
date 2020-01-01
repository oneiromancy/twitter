const User = require("../models/users");
const { check } = require("express-validator");

exports.createUser = [
    check("fullname")
        .not()
        .isEmpty()
        .withMessage("Fullname was not given"),

    check("email")
        .not()
        .isEmpty()
        .withMessage("Email was not given")
        .isEmail()
        .withMessage("Email must be legitimate")
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject("Email already taken");
                }
            });
        }),

    check("username")
        .not()
        .isEmpty()
        .withMessage("Username was not given")
        .custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject("Username already taken");
                }
            });
        }),

    check("password")
        .not()
        .isEmpty()
        .withMessage("Password was not given")
        .isLength({ min: 8 })
        .withMessage("Password must contain a minimum of 8 characters")
        .matches(/\d/)
        .withMessage("Password must include numbers and letters")
];
