var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");
var mid = require("../middleware");

/* GET /login */
router.get("/", mid.isLoggedIn, function(req, res, next) {
    res.render("login");
});

/* POST /login */
router.post("/", usersController.loginUser);

module.exports = router;
