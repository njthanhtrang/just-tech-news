// import Model class and Datatypes obj from sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our User model, uses extends keyword so User inherits Model fx
class User extends Model {}

// create User class, use .init() method to initialize model's data & config
// pass in 2 objects as arguments. define table columns and configuration
User.init(
  {
    // TABLE COLUMN DEFINITIONS GO HERE
    // define ID column
    id: {
      // use special Sequelize DataTypes object to provide data type
      type: DataTypes.INTEGER,
      // equiv to SQL's "NOT NULL" option
      allowNull: false,
      // instruct that this is Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating table data
    //   validate email data follows pattern of email address <string>@<string>.<string>
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least 4 char long
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in imported sequelize connection(direct connection to our database)
    sequelize,
    // don't auto create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel casing
    underscored: true,
    // make it so our model name stays lowercased in DB
    modelName: "user",
  }
);

module.exports = User;