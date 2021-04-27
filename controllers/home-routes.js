const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

// get all posts for homepage
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass single post obj into homepage template
      // because we're using template engine, use res.render()
      // specify which template we want to use (homepage.handlebars), .handlebars ext implied
      //   loop over and map each Sequelize obj into serialized version, saving results in a new posts array
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      //   serialize obj down to properties you need with get()
      // this is what res.json() does automatically
      //   .render() can accept array or obj
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
    // login doesn't need variables so no second argument to render()
    res.render("login");
});

module.exports = router;
