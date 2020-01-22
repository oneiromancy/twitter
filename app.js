// Node modules
const express = require("express");
const path = require("path");
const createError = require("http-errors");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);

// Helpers
const gateway = require("./helpers/gateway");

// routes <=> file paths
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const userRouter = require("./routes/users");
const tweetRouter = require("./routes/tweets");
const searchRouter = require("./routes/search");

const app = express();

// attaches HTTP request methods (other than POST) to HTML form requests
app.use(methodOverride("_method"));

// caching
redisClient.on("error", err => {
    console.log("Redis error: ", err);
});

// Start a session; we use Redis for the session store.
// "secret" will be used to create the session ID hash (the cookie id and the redis key value)
// "name" will show up as your cookie name in the browser
// "cookie" is provided by default; you can add it to add additional personalized options
// The "store" ttl is the expiration time for each Redis session ID, in seconds
app.use(
    session({
        secret: "oneiromancy",
        name: "sid",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        store: new redisStore({
            host: "localhost",
            port: 6379,
            client: redisClient,
            ttl: 86400
        })
    })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// HTTP request logger
app.use(logger("dev"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// mongoose DB connection
const mongoDB = "mongodb://localhost:27017/twitter";
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Make Mongoose use `findOneAndUpdate()`
mongoose.set("useFindAndModify", false);

// routes
app.use("/signup", gateway.redirectLoggedInUser, signupRouter);
app.use("/login", gateway.redirectLoggedInUser, loginRouter);
app.use("/logout", logoutRouter);
app.use("/tweets", gateway.requiresLogin, tweetRouter);
app.use("/search", gateway.requiresLogin, searchRouter);
app.use("/", gateway.requiresLogin, userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("pages/error");
});

module.exports = app;
