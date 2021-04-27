// import the Sequelize constructor from the library
const Sequelize = require("sequelize");

// we don't have to save dotenv to var
require("dotenv").config();

// create connection to our DB, pass in MySQL info for user and pass
// new Sequelize accepts DB name, MySQL user, and pass, pass config settings
// sequelize MUST be declared with let, not const
let sequelize;

// when app is deployed, has access to process.env.JAWSDB_URL
// otherwise, uses localhost config
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
