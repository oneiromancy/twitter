const User = require("../models/users");

exports.getUserIdFromUsername = (req, res, next) => {
    User.findOne({ username: req.params.username }).exec((err, user) => {
        if (err) next(err);

        req.profileRequest = user;
        next();
    });
};
