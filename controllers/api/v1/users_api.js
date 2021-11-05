const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }, "email password");

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username or password!",
      });
    }

    return res.status(200).json({
      message: "Login successfull!",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "100000" }),
      },
    });
  } catch (err) {
    console.log("***********\n", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.getUsers = async (req, res) => {
  let users = await User.find({}, "email password");

  return res.status(200).json({
    users,
    message: "Sent users in database!",
  });
};
