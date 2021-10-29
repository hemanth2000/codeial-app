const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);

    let comment = await Comment.create({
      content: req.body.content,
      user: req.user.id,
      post: req.body.post,
    });

    post.comments.push(comment);
    post.save();

    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating comment\n", err);
    return;
  }
};

module.exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findById(postId);

      post.comments.pull(req.params.id);
    }

    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting", err);
    return res.redirect("back");
  }
};
