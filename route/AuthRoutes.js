const express = require("express");
const AuthenticationController = require("../Controller/AuthenticationController");

const router = express.Router();

router.post("/signup", AuthenticationController.signup);
router.post("/login", AuthenticationController.login);
router.post("/logout", AuthenticationController.logout);

module.exports = router;