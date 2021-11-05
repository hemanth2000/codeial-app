const express = require("express");
const passport = require("passport");

const postsAPI = require("../../../controllers/api/v1/posts_api");

const router = express.Router();

router.get("/", postsAPI.index);
router.post("/", postsAPI.createPost);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsAPI.deletePost
);

module.exports = router;
