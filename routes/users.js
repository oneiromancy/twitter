const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const tweets = require("../controllers/tweets");
const { upload } = require("../helpers/uploader");
const validator = require("../helpers/validator");
const inputHandlers = [
    upload.single("image"),
    validator.tweet,
    validator.saveError
];

// Home Page <=> Feed/Timeline
router.get("/", tweets.getTweetsByUserFeed);

// Profile Page
router.get("/:username", users.getUserIdFromUsername, tweets.getTweetsByAuthor);
router.patch(
    "/:username",
    inputHandlers,
    users.getUserIdFromUsername,
    users.updateUserDetails
);

// Tweet Post
router.get(
    "/:username/status/:tweetId",
    users.getUserIdFromUsername,
    tweets.getTweetById
);

// Follow/Unfollow
router.post("/:username/followers", users.followUser);
router.delete("/:username/followers", users.unfollowUser);

module.exports = router;
