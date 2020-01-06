const User = require("../models/users");
const { validationResult } = require("express-validator");

exports.signupUser = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.session.errors = errors.array();
        return res.redirect("/signup");
    } else {
        const { fullname, email, username, password } = req.body;

        const data = {
            fullname,
            email,
            username,
            password
        };

        User.create(data, (err, user) => {
            if (err) next(err);

            req.session.user = user;
            req.session.errors = null;

            return res.redirect("/");
        });
    }
};

exports.renderSignupPage = (req, res, next) => {
    const errors = req.session.errors;
    req.session.errors = false;

    return res.render("pages/signup", {
        title: "Sign up for Twitter",
        errors
    });
};

exports.loginUser = (req, res, next) => {
    const { username, password } = req.body;

    User.authenticate(username, password, (err, user) => {
        if (!user || err) {
            req.session.errors = true;
            return res.redirect("/login");
        } else {
            req.session.errors = false;
            req.session.user = user;
            return res.redirect("/");
        }
    });
};

exports.renderLoginPage = (req, res, next) => {
    const errors = req.session.errors;
    req.session.errors = false;

    return res.render("pages/login", {
        title: "Login on Twitter",
        errors
    });
};

exports.logoutUser = (req, res, next) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) next(err);

            return res.redirect("/login");
        });
    }
};
