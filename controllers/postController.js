const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = (req, res) => {
  Post.create({ content: req.body.content, user: req.user.id }, (err, post) => {
    if (err) {
      console.log("Error creating post!");
    }
  });

  return res.redirect("back");
};

module.exports.delete = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting post", err);
    return res.redirect("back");
  }
};
