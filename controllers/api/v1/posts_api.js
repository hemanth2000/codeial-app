const mongoose = require("mongoose");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
  try {
    posts = await Post.find({});

    return res.status(200).json({
      messages: "List of posts",
      posts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports.createPost = async (req, res) => {
  try {
    let newPost = await Post.create({
      content: req.body.content,
      user: req.body.user,
    });

    return res.status(200).json({
      post: newPost,
      message: "Post created!",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Post creation failed!",
    });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    let id = req.params.id;

    let post = await Post.findById(id);
    if (post.user == req.user.id) {
      await post.remove();

      await Comment.deleteMany({ post: id });

      return res.status(200).json({
        post,
        message: "Post deleted successfully!",
      });
    }

    throw "Not authorized";
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Unauthorized request!",
    });
  }
};
