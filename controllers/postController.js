const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.create({ content: req.body.content, user: req.user.id }, (err, post) => {
    if (err) {
      console.log("Error creating post!");
    }
  });

  return res.redirect("back");
};