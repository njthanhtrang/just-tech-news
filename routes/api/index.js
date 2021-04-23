const router = require("express").Router();

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

// collect endpoints and prefix them
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;