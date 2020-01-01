const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        maxlength: 280,
        required: true
    },
    image: {
        type: String
    }
});

const Tweet = mongoose.model("Tweet", TweetSchema);

module.exports = Tweet;
