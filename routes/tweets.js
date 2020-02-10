const express = require("express");
const router = express.Router();
const tweets = require("../controllers/tweets");
const comments = require("../controllers/comments");
const { upload } = require("../helpers/uploader");
const validator = require("../helpers/validator");
const inputHandlers = [
    upload.single("image"),
    validator.tweet,
    validator.saveError
];

// Tweets
router.post("/", inputHandlers, tweets.createTweet);
router.patch("/:tweetId", inputHandlers, tweets.updateTweet);
router.delete("/:tweetId", tweets.deleteTweet);

// Tweet Comments
router.post("/:tweetId/comments", inputHandlers, comments.createComment);
router.patch(
    "/:tweetId/comments/:commentId",
    inputHandlers,
    comments.updateComment
);
router.delete("/:tweetId/comments/:commentId", comments.deleteComment);

// Tweet Likes
router.post("/:tweetId/likes", tweets.likeTweet);
router.delete("/:tweetId/likes", tweets.unlikeTweet);

module.exports = router;
