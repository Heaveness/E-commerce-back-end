// Import the seed functions for categories, products, tags, and product tags.
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

// Import the Sequelize connection from the config file.
const sequelize = require('../config/connection');

// Function to seed the database with all data.
const seedAll = async () => {
	// Sync the Sequelize models with the database and force the tables to be recreated.
	await sequelize.sync({ force: true });
	console.log('\n----- DATABASE SYNCED -----\n');
	
	// Seed categories by calling the seedCategories function.
	await seedCategories();
	console.log('\n----- CATEGORIES SEEDED -----\n');

	// Seed products by calling the seedProducts function.
	await seedProducts();
	console.log('\n----- PRODUCTS SEEDED -----\n');

	// Seed tags by calling the seedTags function.
	await seedTags();
	console.log('\n----- TAGS SEEDED -----\n');

	// Seed product tags by calling the seedProductTags function.
	await seedProductTags();
	console.log('\n----- PRODUCT TAGS SEEDED -----\n');

	// Exit the process once seeding is complete.
	process.exit(0);
};

// Call the seedAll function to start seeding the database.
seedAll();
