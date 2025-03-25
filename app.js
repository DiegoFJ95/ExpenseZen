const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const session = require("express-session");

app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(
  session({
    secret: "asjkldbakjsbdqjmnsad-poijqwopehoasdb9quowdbhn123asdasd",
    resave: false,
    saveUninitialized: false,
  })
);

const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));


app.use("/modules", express.static(path.join(__dirname, "node_modules/@handsontable/hyperformula/dist"), {
  setHeaders: (res, path) => {
      if (path.endsWith(".mjs")) {
          res.setHeader("Content-Type", "application/javascript");
      }
  }
}));


//PROTECCION CONTRA CROSS-SITE REQUEST FORGERY
const csrf = require("csurf");
const csrfProtection = csrf();
app.use(csrfProtection);




// const routesLogin = require("./routes/login.routes");
const routesGeneral = require("./routes/general.routes");
const routesDashboard = require("./routes/dashboard.routes");

// app.use("/", routesLogin);

app.use("/", routesGeneral);
app.use("/dashboard", routesDashboard);

app.use((request, response, next) => {
  response.status(404);
  response.render("404")
})




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});