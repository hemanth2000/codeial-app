const express = require("express");
const passport = require("passport");

const homeController = require("../controllers/homeController");

const router = express.Router();

console.log("Routes setup successfull!");

router.get("/", homeController.home);
router.use("/user", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comment", require("./comments"));

module.exports = router;
