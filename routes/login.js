const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");

router.get("/", auth.renderLoginPage);

router.post("/", auth.loginUser);

module.exports = router;
