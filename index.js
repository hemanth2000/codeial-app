const express = require("express");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server!");
    return;
  }

  console.log(`Server running at PORT ${PORT}`);
});
