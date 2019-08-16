var express = require("express");
var router = express.Router();
var mid = require("../middleware");
const Users = require("../models/users");

/* GET home page. */
router.get("/", mid.requiresLogin, function(req, res, next) {
    Users.findById(req.session.userId).exec(function(error, user) {
        if (error) {
            return next(error);
        } else {
            return res.render("index", { title: "Express" });
        }
    });
});

module.exports = router;
