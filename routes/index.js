// Import the required packages and libraries.
const router = require('express').Router();
const apiRoutes = require('./api');

// Include the API routes
router.use('/api', apiRoutes);

// Default route handler for any other route
router.use((req, res) => {
    // Respond with a simple HTML message indicating the wrong route.
    res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
