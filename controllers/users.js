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
