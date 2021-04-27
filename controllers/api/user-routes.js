const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");

// GET all users /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method
  // .findAll() queries all users from user table, equiv to SELECT*FROM users;
  // returns an array of data
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  // returns single object of data
  User.findOne({
    attributes: { exclude: ["password"] },
    // equiv to SELECT*FROM users WQHERE id=1
    where: {
      id: req.params.id,
    },
    include: [
      {
        //   get list of posts user created
        model: Post,
        attributes: ["id", "title", "post_url", "created_at"],
      },
      {
        //   include Post on Comment model so we can see which posts user commented
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        //   get list of posts user voted on via Vote table
        model: Post,
        attributes: ["title"],
        through: Vote,
        as: "voted_posts",
      },
    ],
  })
    // if search for user with no ID value, send 404
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: "Lernantino", email: "lernantino@gmail.com", password: "password1234"}
  // equiv to INSERT INTO users (username, email, password)
  // VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update with PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: "Lernantino", email: "lernantino@gmail.com", password: "password1234"}

  // if req.body has exact key/value pairs to match the model, just use "req.body" to update what's passed through
  // equiv to UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
