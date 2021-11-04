const Post = require("../models/post");
const User = require("../models/user");
// Post.deleteMany({}, (err) => {
//   if (err) {
//     console.log("Error");
//   }
//   console.log("Deleted succesfully!");
// });

module.exports.home = async (req, res) => {
  try {
    if (!req.user) {
      return res.render("home", {
        title: "Codeial App",
        posts: [],
        users: [],
      });
    }

    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name _id",
        },
      })
      .sort({ createdDate: "desc" });

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial App",
      posts,
      users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
