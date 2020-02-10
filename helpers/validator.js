const User = require("../models/users");
const { check, validationResult } = require("express-validator");

exports.signup = [
    check("fullname")
        .trim()
        .matches(/[a-zA-Z0-9 ]{1,50}$/)
        .withMessage(
            "Has a 50-character limit, must be alphanumeric and nonempty"
        ),

    check("email")
        .trim()
        .isEmail()
        .withMessage("Must be a valid email"),

    check("username")
        .trim()
        .matches(/^[A-Za-z0-9 ]{1,15}$/)
        .withMessage(
            "Has a 15-character limit, must be alphanumeric and nonempty"
        )
        .custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject("Username already taken");
                }
            });
        }),

    check("password")
        .trim()
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.{8,}).*$/)
        .withMessage(
            "Has an 8-character minimum and must include uppercase, lowercase and number"
        )
];

exports.login = [
    check("username")
        .trim()
        .matches(/^[A-Za-z0-9 ]{1,15}$/)
        .withMessage(
            "Has a 15-character limit, must be alphanumeric and nonempty"
        ),

    check("password")
        .trim()
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.{8,}).*$/)
        .withMessage(
            "Has an 8-character minimum and must include uppercase, lowercase and number"
        )
];

exports.tweet = [
    check("text")
        .trim()
        .matches(/^[A-Za-z0-9 ]{1,280}$/)
        .withMessage("Tweets have a 280-character limit and must be nonempty")
];

exports.profile = [
    check("fullname")
        .trim()
        .matches(/^[A-Za-z0-9 ]{1,30}$/)
        .withMessage(
            "Has a 50-character limit, must be alphanumeric and nonempty"
        ),
    check("bio")
        .trim()
        .matches(/^[a-zA-Z0-9 ]{0,100}$/)
        .withMessage("Has a 140-character limit and must be alphanumeric"),
    check("location")
        .trim()
        .matches(/^[A-Za-z0-9 ]{0,30}$/)
        .withMessage("Has a 50-character limit and must be alphanumeric"),
    check("website")
        .trim()
        .matches(
            /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
        )
        .withMessage("Must be a valid website")
];

exports.saveError = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        return res.redirect("back");
    }

    next();
};
