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

        return res.redirect("back");
    });
};

exports.deleteTweet = (req, res, next) => {
    Tweet.deleteOne({ _id: req.params.tweetId }, (err, tweet) => {
        if (err) next(err);

        return res.redirect("back");
    });
};

exports.likeTweet = (req, res, next) => {
    Tweet.updateOne(
        { _id: req.params.tweetId },
        { $push: { likes: req.session.user._id } },
        (err, tweet) => {
            if (err) next(err);

            return res.redirect("back");
        }
    );
};

exports.unlikeTweet = (req, res, next) => {
    Tweet.updateOne(
        { _id: req.params.tweetId },
        { $pull: { likes: req.session.user._id } },
        (err, tweet) => {
            if (err) next(err);

            return res.redirect("back");
        }
    );
};

exports.getTweetById = (req, res, next) => {
    const errors = req.session.errors;
    req.session.errors = null;

    Tweet.findOne({ _id: req.params.tweetId })
        .populate("author")
        .populate("comments.author")
        .exec((err, tweet) => {
            if (err) next(err);

            return res.render("pages/tweet", {
                title: `${tweet.author.fullname} on Twitter: "${tweet.text}"`,
                loggedInUser: req.session.user,
                tweet,
                moment,
                errors
            });
        });
};

exports.getTweetsByUserFeed = (req, res, next) => {
    const errors = req.session.errors;
    req.session.errors = null;

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
                moment,
                errors
            });
        });
};

exports.getTweetsByAuthor = (req, res, next) => {
    const errors = req.session.errors;
    req.session.errors = null;

    Tweet.find({ author: req.profileRequest._id })
        .sort({ creationDate: -1 })
        .populate("author")
        .exec((err, tweets) => {
            if (err) next(err);

            return res.render("pages/profile", {
                title: `${req.profileRequest.fullname} (@${req.profileRequest.username})`,
                loggedInUser: req.session.user,
                user: req.profileRequest,
                tweets,
                moment,
                errors
            });
        });
};
