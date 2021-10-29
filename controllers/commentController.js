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

          res.redirect("back");
        }
      );
    }
  });
};

module.exports.delete = (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      Post.findById(
        postId,
        {
          $pull: {
            comments: req.params.id,
          },
        },
        (err, post) => {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};
