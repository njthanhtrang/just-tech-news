const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");;
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const app = express();
// Heroku compatible
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Express.js middleware fx
// takes all contents of a folder, serves them as static assets
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to db Models and server db tables
// force: true would drop and recreate all DB tables on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});