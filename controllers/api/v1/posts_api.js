module.exports.index = (req, res) => {
  return res.status(200).json({
    messages: "List of posts",
    posts: [],
  });
};
