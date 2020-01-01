const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const tweets = require("../controllers/tweets");
const { upload } = require("../helpers/uploader");

// Home Page <=> Feed/Timeline
router.get("/", tweets.getTweetsByUserFeed);

// Profile Page
router.get("/:username", users.getUserIdFromUsername, tweets.getTweetsByAuthor);

// // Profile Picture
router.post(
    "/:username/profile-picture",
    upload.single("image"),
    users.updateProfilePicture
);

// Follow/Unfollow
router.post("/:username/follow", users.followUser);
router.post("/:username/unfollow", users.unfollowUser);

module.exports = router;
