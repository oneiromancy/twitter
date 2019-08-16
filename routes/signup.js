const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

/* GET /signup */
router.get("/", function(req, res, next) {
    res.render("signup");
});

/* POST /signup */
router.post("/", usersController.registerUser);

module.exports = router;
