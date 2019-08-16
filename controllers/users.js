const Users = require("../models/users");

exports.registerUser = (req, res, next) => {
    const { fullname, email, username, password } = req.body;

    if (fullname && email && username && password) {
        // create object with form input
        var userData = {
            fullname,
            email,
            username,
            password
        };

        // use schema's `create` method to insert document into Mongo
        Users.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                return res.redirect("/");
            }
        });
    } else {
        const err = new Error("All fields required.");
        err.status = 400;
        return next(err);
    }
};

exports.loginUser = (req, res, next) => {
    const { username, password } = req.body;

    if (username && password) {
        Users.authenticate(username, password, function(error, user) {
            if (error || !user) {
                const err = new Error("Wrong password.");
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect("/");
            }
        });
    } else {
        var err = new Error("Username and password are required.");
        err.status = 401;
        return next(err);
    }
};

exports.logoutUser = (req, res, next) => {
    console.log("testing");
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect("/login");
            }
        });
    }
};
