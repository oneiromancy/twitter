const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

// routes
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const tweetRouter = require("./routes/tweets");

const app = express();

// use sessions to track user login
app.use(
    session({
        secret: "oneiromancy",
        resave: true,
        saveUninitialized: false
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);

//Set up mongoose connection
const mongoDB = "mongodb://localhost:27017/twitter";
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });

//Get mongoose connection
const db = mongoose.connection;

// Get notification of connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// caching disabled for every route
app.use(function(req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

// routes
app.use("/signup", gateway.redirectLoggedInUser, signupRouter);
app.use("/login", gateway.redirectLoggedInUser, loginRouter);
app.use("/logout", logoutRouter);
app.use("/tweets", gateway.requiresLogin, tweetRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
