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

    // Include comments of the posts
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
    return time + "min ago";
  }

  time = time / 60;

  if (time < 24) {
    time = Math.floor(time);
    return time + "h ago";
  }

  time = time / 24;

  if (time < 30) {
    time = Math.floor(time);

    return time + "d ago";
  }

  time = Math.floor(time / 30);

  return time + "mon ago";
};

postSchema.virtual("posted_time").get(function () {
  return convertTime(
    Math.floor((Date.now() - new Date(this.createdDate).getTime()) / 1000)
  );
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
