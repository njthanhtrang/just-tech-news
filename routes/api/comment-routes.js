const router = require("express").Router();
const { sequelize } = require("sequelize/lib/model");
const { Comment, User } = require("../../models");

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id"],
    order: [["created at", "DESC"]],
    include: [
        {
            model: User,
            attributes: ["username"],
        }
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// /api/comments
router.post("/", (req, res) => {
    console.log("Route hit");
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
