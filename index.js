const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");
const router = require("./routes");

const app = express();

//1) MIDDLEWARES

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Setting routes
app.use("/", router);

// Setting static files path
app.use(express.static("assets"));

const PORT = 8000;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server!");
    return;
  }

  console.log(`Server running at PORT ${PORT}`);
});
