const express = require("express");
const router = express.Router();
const tweets = require("../controllers/tweets");
const comments = require("../controllers/comments");
const { upload } = require("../helpers/uploader");

// Tweets
router.post("/", upload.single("image"), tweets.createTweet);
router.patch("/:tweetId", upload.single("image"), tweets.updateTweet);
router.delete("/:tweetId", tweets.deleteTweet);

// Tweet Comments
router.post(
    "/:tweetId/comments",
    upload.single("image"),
    comments.createComment
);
router.patch(
    "/:tweetId/comments/:commentId",
    upload.single("image"),
    comments.updateComment
);
router.delete("/:tweetId/comments/:commentId", comments.deleteComment);

// Tweet Likes
router.post("/:tweetId/likes", tweets.likeTweet);
router.delete("/:tweetId/likes", tweets.unlikeTweet);

module.exports = router;
