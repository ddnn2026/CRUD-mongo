const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/hello", authController.hello);
router.get("/signup", authController.signup);


module.exports = router;
