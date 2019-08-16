var express = require("express");
var router = express.Router();
const usersController = require("../controllers/users");

// GET /logout
router.get("/", usersController.logoutUser);

module.exports = router;
