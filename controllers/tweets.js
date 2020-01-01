const Tweet = require("../models/tweets");

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
