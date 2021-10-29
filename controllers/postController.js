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

module.exports.delete = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany({ post: req.params.id }, (err) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
