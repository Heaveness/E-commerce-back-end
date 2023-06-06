// Import the required packages and libraries.
require('dotenv').config(); // Load environment variables from .env file.
const Sequelize = require('sequelize'); // Import Sequelize library.

// Create a new Sequelize instance with the appropriate configuration.
const sequelize = process.env.JAWSDB_URL
	// Use JAWSDB_URL if available.
  	? new Sequelize(process.env.JAWSDB_URL)
	// Use local database configuration if JAWSDB_URL is not available.
  	: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
		host: 'localhost',
		dialect: 'mysql',
		dialectOptions: {
			// Enable support for decimal numbers.
			decimalNumbers: true,
		},
    });

module.exports = sequelize; // Export the configured Sequelize instance for use in other files.
