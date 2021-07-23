const Post = require("../models/post");

// Post.deleteMany({}, (err) => {
//   if (err) {
//     console.log("Error");
//   }
//   console.log("Deleted succesfully!");
// });

module.exports.home = (req, res) => {
  if (req.user) {
    Post.find({ user: req.user.id })
      .populate("user")
      .exec((err, posts) => {
        return res.render("home", {
          title: "Codeial App",
          posts: posts,
        });
      });
  } else {
    return res.render("home", {
      title: "Codeial App",
      posts: [],
    });
  }
};
