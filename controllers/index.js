const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

// collect packaged group of API endpoints and prefix with /api
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

// if we make a request to any endpoint that doesn't exist
router.use((req, res) => {
    // error message indicates requested incorrect resource
    res.status(404).end();
});

module.exports = router;