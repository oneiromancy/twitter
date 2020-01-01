const express = require("express");
const router = express.Router();
const tweets = require("../controllers/tweets");
const { upload } = require("../helpers/uploader");

router.post("/", upload.single("image"), tweets.createTweet);

router.patch("/:tweetId", upload.single("image"), tweets.updateTweet);

router.delete("/:tweetId", tweets.deleteTweet);

module.exports = router;
