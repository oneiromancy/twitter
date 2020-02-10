const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const validator = require("../helpers/validator");

router.get("/", auth.renderLoginPage);

router.post("/", [validator.login, validator.saveError], auth.loginUser);

module.exports = router;
