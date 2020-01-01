const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    creationDate: {
        type: Date,
        default: Date.now
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    profilePicture: {
        type: String
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]
});

// authenticate input against database documents
UserSchema.statics.authenticate = (username, password, callback) => {
    User.findOne({ username }).exec((error, user) => {
        if (error) {
            return callback(error);
        } else if (!user) {
            let err = new Error("User not found.");
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, (error, result) => {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
    });
};

// hash password before saving to database
UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
