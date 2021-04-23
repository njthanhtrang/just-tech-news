const User = require("./User");
const Post = require("./Post");

// create associations
// one to many relationship
User.hasMany(Post, {
    foreignKey: "user_id"
});

// one to one relationship
Post.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Post };