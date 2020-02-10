const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const validator = require("../helpers/validator");

router.get("/", auth.renderSignupPage);

router.post("/", [validator.signup, validator.saveError], auth.signupUser);

module.exports = router;
