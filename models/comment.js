const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "lastUpdated",
    },
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
