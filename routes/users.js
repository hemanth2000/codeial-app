const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/profile", userController.profile);
router.get("/signup", userController.signup);
router.get("/login", userController.login);
router.post("/signup", userController.create);
router.post("/login", userController.createSession);
router.get("/logout", userController.endSession);

module.exports = router;
