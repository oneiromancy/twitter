const Tweet = require("../models/tweets");

exports.createComment = (req, res, next) => {
    const data = {
        text: req.body.text,
        author: req.session.user._id,
        image: req.file ? "./uploads/" + req.file.filename : null
    };

    Tweet.findOneAndUpdate(
        { _id: req.params.tweetId },
        { $push: { comments: data } }
    )
        .populate("author")
        .exec((err, tweet) => {
            if (err) next(err);

            return res.redirect(
                `/${tweet.author.username}/status/${tweet._id}`
            );
        });
};

exports.updateComment = (req, res, next) => {
    const data = {
        "comments.$.text": req.body.text
    };

    if (req.file) {
        data["comments.$.image"] = "./uploads/" + req.file.filename;
    }

    Tweet.updateOne(
        {
            _id: req.params.tweetId,
            "comments._id": req.params.commentId,
            "comments.author": req.session.user._id
        },
        { $set: data },
        (err, tweet) => {
            if (err) next(err);

            return res.redirect("back");
        }
    );
};

exports.deleteComment = (req, res, next) => {
    Tweet.updateOne(
        { _id: req.params.tweetId },
        { $pull: { comments: { _id: req.params.commentId } } },
        (err, tweet) => {
            if (err) next(err);

            return res.redirect("back");
        }
    );
};
