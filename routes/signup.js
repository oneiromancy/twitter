const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
var mid = require("../middleware");

/* GET /signup */
router.get("/", mid.isLoggedIn, function(req, res, next) {
    res.render("signup");
});

/* POST /signup */
router.post("/", usersController.registerUser);

module.exports = router;
