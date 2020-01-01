const Tweet = require("../models/tweets");
const moment = require("moment");

exports.createTweet = (req, res, next) => {
    const data = {
        text: req.body.text,
        author: req.session.user._id,
        image: req.file ? "./uploads/" + req.file.filename : null
    };

    Tweet.create(data, err => {
        if (err) next(err);

        return res.redirect("back");
    });
};

exports.updateTweet = (req, res, next) => {
    const data = {};
    data["text"] = req.body.text;

    if (req.file) {
        data["image"] = "./uploads/" + req.file.filename;
    }

    Tweet.updateOne({ _id: req.params.tweetId }, data, (err, tweet) => {
        if (err) next(err);

        req.session.errors = null;

        return res.redirect("back");
    });
};

exports.deleteTweet = (req, res, next) => {
    Tweet.deleteOne({ _id: req.params.tweetId }, (err, tweet) => {
        if (err) next(err);

        return res.redirect("back");
    });
};

exports.getTweetsByUserFeed = (req, res, next) => {
    Tweet.find({
        $or: [
            { author: req.session.user._id },
            { author: req.session.user.following }
        ]
    })
        .populate("author")
        .sort({ creationDate: -1 })
        .exec((err, tweets) => {
            if (err) next(err);

            return res.render("pages/feed", {
                title: "Home / Twitter",
                loggedInUser: req.session.user,
                tweets,
                moment
            });
        });
};

exports.getTweetsByAuthor = (req, res, next) => {
    Tweet.find({ author: req.profileRequest._id })
        .sort({ creationDate: -1 })
        .exec((err, tweets) => {
            if (err) next(err);

            tweets.forEach(tweet => {
                tweet.author = req.profileRequest;
            });

            return res.render("pages/profile", {
                title: `${req.profileRequest.fullname} (@${req.profileRequest.username})`,
                loggedInUser: req.session.user,
                user: req.profileRequest,
                tweets,
                moment
            });
        });
};
