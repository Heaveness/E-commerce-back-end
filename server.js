// Import the required packages and libraries.
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Create an instance of Express app.
const app = express();

// Set the port for the server.
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON data.
app.use(express.json());
// Middleware to parse URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Set up routes.
app.use(routes);

// Sync sequelize models to the database, then turn on the server.
sequelize.sync({ force: false }).then(() => {
	// Start listening on the specified port.
	app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
