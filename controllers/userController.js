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
  User.create(req.body, (err) => {
    if (err) {
      console.log("Account creation failed!");
      return;
    }
    console.log("Account created successfully!");
  });
};

module.exports.validate = (req, res) => {};
