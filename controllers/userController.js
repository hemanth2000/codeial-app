const User = require("../models/user");

module.exports.profile = (req, res) => {
  return res.render("user", {
    title: "User page",
  });
};

module.exports.signup = (req, res) => {
  return res.render("signup", {
    title: "Codeial | Signup",
  });
};

module.exports.login = (req, res) => {
  return res.render("login", {
    title: "Codeial | Login",
  });
};

module.exports.create = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    console.log("Password must be same!");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error in signing up!");
      return;
    }

    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Account creation failed!");
          return res.redirect("back");
        }
        console.log(user);
        console.log("Account created successfully!");
        return res.redirect("/user/login");
      });
    } else return res.redirect("back");
  });
};

module.exports.validate = (req, res) => {};
