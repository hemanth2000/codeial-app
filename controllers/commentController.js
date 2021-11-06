const Comment = require("../models/comment");
const Post = require("../models/post");

const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);

    let newComment = await Comment.create({
      content: req.body.content,
      user: req.user.id,
      post: req.body.post,
    });

    await post.comments.unshift(newComment);
    await post.save();

    if (req.xhr || req.headers.accept.indexOf("xml") > -1) {
      let comment = await Comment.findById(newComment.id).populate(
        "user",
        "name email"
      );

      //commentsMailer.newComment(comment);
      let job = queue.create("emails", comment).save((err) => {
        if (err) {
          console.log("Error in creating email queue");
          return;
        }
        console.log("job queued!");
      });

      return res.status(200).json({
        data: comment,
        message: "Comment added!",
      });
    }

    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating comment\n", err);
    return;
  }
};

module.exports.delete = async (req, res) => {
  try {
    let comment = await Comment.findById(req.params.id);

    console.log(comment);

    if (comment.user == req.user.id) {
      let postId = comment.post;
      comment.remove();

      let post = await Post.findById(postId);

      post.comments.pull(req.params.id);

      if (req.xhr || req.headers.accept.indexOf("xml") > -1) {
        console.log("I am here!");

        return res.status(200).json({
          comment: comment,
          message: "Comment deleted!",
        });
      }
    }

    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting", err);
    return res.redirect("back");
  }
};
