const express = require("express");
const passport = require("passport");

const userController = require("../controllers/userController");

const router = express.Router();
router.get("/profile", passport.checkAuthentication, userController.profile);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.get("/signup", userController.signup);
router.get("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/signup", userController.createUser);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/user/login" }),
  userController.createSession
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  userController.updateUser
);

router.post("/forgot-password",userController.);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/signup" }),
  userController.createSession
);

module.exports = router;
