const User = require("../models/user");

module.exports.profile = (req, res) => {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, (err, user) => {
      if (err) {
        return res.redirect("/user/login");
      }

      if (user) {
        return res.render("user_profile", {
          title: "User profile",
          user: user,
        });
      } else {
        return res.redirect("/user/login");
      }
    });
  } else {
    return res.redirect("/user/login");
  }
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

module.exports.createSession = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error!");
      return res.redirect("back");
    }

    if (user && req.body.password === user.password) {
      res.cookie("user_id", user.id);
      return res.redirect("/user/profile");
    } else {
      console.log("Invalid credentials!");
    }

    return res.redirect("back");
  });
};

module.exports.endSession = (req, res) => {
  delete res.cookie("user_id", null);
  return res.redirect("/user/login");
};
