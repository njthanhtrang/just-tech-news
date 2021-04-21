const router = require("express").Router();
const { User } = require("../../models/");

// GET /api/users
router.get("/", (req, res) => {
    // Access our User model and run .findAll() method
    // .findAll() queries all users from user table, equiv to SELECT*FROM users;
    User.findAll({
        attributes: { exclude: ["password"] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: { exclide: ["password"] },
        // equiv to SELECT*FROM users WQHERE id=1
        where: {
            id: req.params.id
        }
    })
    // if search for user with no ID value, send 404
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
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
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update with PUT /api/users/1
router.put("/:id", (req, res) => {
    // expects {username: "Lernantino", email: "lernantino@gmail.com", password: "password1234"}

    // if req.body has exact key/value pairs to match the model, just use "req.body"
    // equiv to UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;