const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updatedDate",
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
    return time + "m ago";
  }

  time = time / 60;

  if (time < 24) {
    time = Math.floor(time);
    return time + "h ago";
  }

  time = Math.floor(time / 24);

  return time + "d ago";
};

postSchema.virtual("posted_time").get(function () {
  return convertTime(
    Math.floor((Date.now() - new Date(this.createdDate).getTime()) / 1000)
  );
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
