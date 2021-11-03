const mongoose = require("mongoose");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });

    let popPost = await Post.findById(post._id).populate("user", "-password");
    if (req.xhr || req.headers.accept.indexOf("xml") > -1) {
      return res.status(200).json({
        data: {
          post: popPost,
        },
        message: "Post created!",
      });
    }

    req.flash("success", "Post created!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }
};

module.exports.delete = async (req, res) => {
  try {
    var id = req.params.id;

    let post = await Post.findById(id);

    if (post.user == req.user.id) {
      await post.remove();

      await Comment.deleteMany({ post: id });

      if (req.xhr || req.headers.accept.indexOf("xml") > -1) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post deleted!",
        });
      }

      req.flash("success", "Post deleted!");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting post!\n", err);
    return res.redirect("back");
  }
};
