const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Sign In route
router.post("/api/signin", userController.signInUser);
// Sign Up route
router.post("/api/signup", userController.signUpUser);
module.exports = router;