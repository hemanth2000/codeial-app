const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = (req, res) => {
  Post.findById(req.body.post, (err, post) => {
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          user: req.user.id,
          post: req.body.post,
        },

        (err, comment) => {
          if (err) console.log("Error creating comment!");

          if (comment) {
            post.comments.push(comment);
            post.save();
          }
        }
      );
    }
  });

  return res.redirect("back");
};
