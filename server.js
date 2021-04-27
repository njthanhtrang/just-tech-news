const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
// Heroku compatible
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
    // hash based message auth code
    // assign session cookie, server compares to secret to make sure cookie wasn't modified by client
    // replaced by secret stored in .env file
    secret: "Super secret secret",
    cookie: {},
    // forces session to be saved back to session store even if cookie not modified
    resave: false,
    // save session as part of Store
    saveUninitialized: true,
    // create connection with DB. set up session table. allow sequelize to save session into DB
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Express.js middleware fx
// takes all contents of a folder, serves them as static assets
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(require("./controllers"));

// turn on connection to db Models and server db tables
// force: true would drop and recreate all DB tables on startup
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});