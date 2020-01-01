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

// Arrow functions (ES6) cannot be used in Mongoose hooks
UserSchema.pre("save", function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) next(err);

        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
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

// Arrow functions (ES6) cannot be used in Mongoose hooks
UserSchema.pre("save", function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) next(err);

        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
