const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { post } = require("../routes");

// create our Post model
class Post extends Model {
  // JS built in static keyword indicates upvote method is based on Post model
  // and not an instance method like User model
  // Post.upvote() is a custom static Sequelize model method
  static upvote(body, models) {
    //   pass the Vote model in as an argument from post-routes.js
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "post_url",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    // foreign key to User's id column
    user_id: {
      type: DataTypes.INTEGER,
      //   establish relationship between post and user by connecting
      // primary key (id)
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    // define column names to have underscore naming convention
    // in Sequelize, columns are camelcase by default
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
