const User = require("../models/user");

module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "User page",
    user: req.user,
  });
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

module.exports.createSession = (req, res) => {
  return res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.logout();
  return res.redirect("/");
};
