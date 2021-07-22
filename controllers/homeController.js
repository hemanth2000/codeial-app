module.exports.home = (req, res) => {
  console.log(res.locals);
  return res.render("home", {
    title: "Codeial App",
  });
};
