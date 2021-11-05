const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = async (req, res) => {
  if (req.params.id) {
    let profile_user = await User.findById(req.params.id);

    return res.render("user_profile", {
      title: "User page",
      profile_user,
    });
  } else {
    return res.render("user_profile", {
      title: "User page",
      profile_user: req.user,
    });
  }
};

module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("signup", {
    title: "Codeial | Signup",
  });
};

module.exports.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("login", {
    title: "Codeial | Login",
  });
};

module.exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      await User.create(req.body);

      return res.redirect("/user/login");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error in ", err);
    return res.redirect("back");
  }
};

module.exports.updateUser = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("****Multer Error****", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        if (req.file) {
          let avatar_path = path.join(__dirname, "..", user.avatar);

          if (user.avatar && fs.existsSync(avatar_path)) {
            fs.unlinkSync(avatar_path);
          }

          user.avatar = User.avatarPath + "\\" + req.file.filename;
        }

        user.save();

        return res.redirect("back");
      });
    } catch (err) {
      console.log("Error in ", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in successfully!");
  return res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.flash("success", "Logged out successfully!");
  req.logout();
  return res.redirect("/");
};
