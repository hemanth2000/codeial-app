const express = require("express");
const router = require("./routes");

const app = express();

// Setting routes
app.use("/", router);

// Setting view engine
app.set("view engine", "ejs");
app.set("views", "./views");

const PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server!");
    return;
  }

  console.log(`Server running at PORT ${PORT}`);
});
