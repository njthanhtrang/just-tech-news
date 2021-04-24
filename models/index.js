const User = require("./User");
const Post = require("./Post");
const Vote = require("./Vote");
const Comment = require("./Comment");

// create associations
// One to many relationship
User.hasMany(Post, {
    foreignKey: "user_id"
});

// One to one relationship
Post.belongsTo(User, {
    foreignKey: "user_id",
});

// Many to many relationship
User.belongsToMany(Post, {
    through: Vote,
    // name of vote model should be displayed as voted_posts
    as: "voted_posts",
    // foriegn key constraint:
    // unique pairing to protect from a single user voting on 1 post multiple times
    foreignKey: "user_id"
});

Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});

Vote.belongsTo(User, {
    foreignKey: "user_id"
});

Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Vote, {
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});

// we don't have to specify comment as a through table
// we don't need to access Post through Comment
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

User.hasMany(Comment, {
    foreignKey: "user_id"
});

Post.hasMany(Comment, {
    foreignKey: "post_id"
});

module.exports = { User, Post, Vote, Comment };