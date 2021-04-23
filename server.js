const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db Models and server db tables
// force: true would drop and recreate all DB tables on startup
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});