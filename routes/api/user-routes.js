const router = require("express").Router();
const { User } = require("../../models/");

// get all users @ /api/users
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
  })
    // if search for user with no ID value, send 404
    // dbUserData = user retrieved from database
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

router.post("/login", (req, res) => {
  // expects {email: "lernantino@gmail.com", password: "password1234"}
  User.findOne({
    where: {
      email: req.body.email,
    },
    // result of query passed as dbUserData
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // res.json({ user: dbUserData });

    // Verify user, returns boolean
    const validPassword = dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    res.json({ user: dbUserData, message: "You are now logged in!" });
  });
});

// update with PUT /api/users/1
router.put("/:id", (req, res) => {
  // expects {username: "Lernantino", email: "lernantino@gmail.com", password: "password1234"}

  // if req.body has exact key/value pairs to match the model, just use "req.body" to update what's passed through
  // equiv to UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;
  User.update(req.body, {
    // to use beforeUpdate hash
    individualHooks: true,
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
