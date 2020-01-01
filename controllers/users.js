const User = require("../models/users");

exports.getUserIdFromUsername = (req, res, next) => {
    User.findOne({ username: req.params.username }).exec((err, user) => {
        if (err) next(err);

        req.profileRequest = user;
        next();
    });
};

exports.getUsersByQuery = (req, res, next) => {
    User.find({
        $or: [
            { username: { $regex: req.query.q, $options: "i" } },
            { fullname: { $regex: req.query.q, $options: "i" } }
        ]
    }).exec((err, users) => {
        if (err) next(err);

        return res.render("pages/search", {
            title: `${req.query.q} - Twitter Search / Twitter`,
            loggedInUser: req.session.user,
            users
        });
    });
};

exports.updateProfilePicture = (req, res, next) => {
    const data = {
        profilePicture: req.file ? "./uploads/" + req.file.filename : null
    };

    User.updateOne({ username: req.params.username }, data, (err, user) => {
        if (err) next(err);

        req.session.user.profilePicture = data["profilePicture"];
        return res.redirect("back");
    });
};

exports.followUser = (req, res, next) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $push: { followers: req.session.user._id } }
    ).exec((err, profile) => {
        if (err) next(err);

        User.updateOne(
            { _id: req.session.user._id },
            { $push: { following: profile._id } }
        ).exec((err, result) => {
            if (err) next(err);

            req.session.user.following.push(profile._id);
            return res.redirect("/");
        });
    });
};

exports.unfollowUser = (req, res, next) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { followers: req.session.user._id } }
    ).exec((err, profile) => {
        if (err) next(err);

        User.updateOne(
            { _id: req.session.user._id },
            { $pull: { following: profile._id } }
        ).exec((err, result) => {
            if (err) next(err);

            const index = req.session.user.following.indexOf(profile._id);
            req.session.user.following.splice(index, 1);
            return res.redirect("/");
        });
    });
};
