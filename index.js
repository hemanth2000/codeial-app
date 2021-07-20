const express = require("express");
const path = require("path");
const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts");

const router = require("./routes");

const app = express();

// Setting view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//1) MIDDLEWARES

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(expressLayouts);

// Setting routes
app.use("/", router);

// Setting static files
app.use(express.static("public"));

const PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server!");
    return;
  }

  console.log(`Server running at PORT ${PORT}`);
});
