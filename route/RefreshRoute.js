const express = require("express");
const RefreshTokenController = require("../Controller/RefreshTokenController");

const router = express.Router();


router.post("/", RefreshTokenController.refresh);

module.exports = router;