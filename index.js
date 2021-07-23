const cookieParser = require("cookie-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const passportLocal = require("./config/passport-local-strategy");
const dbUrl = require("./config/mongoose");
const router = require("./routes");

const PORT = 8000;

const app = express();

//1) MIDDLEWARES

// app.use(
//   sassMiddleware({
//     src: "./assets/scss",
//     dest: "./assets/css",
//     debug: "true",
//     outputStyle: "extended",
//     prefix: "/css",
//   })
// );

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Setting static files
app.use(express.static("assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Setting view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    secret: "sometext",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: MongoStore.create(
      {
        mongoUrl: dbUrl,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Setting routes
app.use("/", router);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server!");
    return;
  }

  console.log(`Server running at PORT ${PORT}`);
});
