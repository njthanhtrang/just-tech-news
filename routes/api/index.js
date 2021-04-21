const router = require("express").Router();
const userRoutes = require("./user-routes");

// collect endpoints and prefix them
router.use("/users", userRoutes);

module.exports = router;