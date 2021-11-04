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

var convertTime = (time) => {
  if (time < 60) {
    return "Just now";
  }

  time = time / 60;

  if (time < 60) {
    time = Math.floor(time);
    return time + "m";
  }

  time = time / 60;

  if (time < 24) {
    time = Math.floor(time);
    return time + "h";
  }

  time = time / 24;

  if (time < 30) {
    time = Math.floor(time);

    return time + "d";
  }

  time = Math.floor(time / 30);

  return time + "mon";
};

commentSchema.virtual("posted_time").get(function () {
  return convertTime(
    Math.floor((Date.now() - new Date(this.createdDate).getTime()) / 1000)
  );
});

commentSchema.set("toJSON", { virtuals: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
