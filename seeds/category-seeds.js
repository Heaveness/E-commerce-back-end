// Import the required model for category.
const { Category } = require('../models');

// Define an array of category data with different category names.
const categoryData = [
	{
		category_name: 'Shirts',
	},
	{
		category_name: 'Shorts',
	},
	{
		category_name: 'Music',
	},
	{
		category_name: 'Hats',
	},
	{
		category_name: 'Shoes',
	},
];
// Function to seed the categories by bulk creating the category data using the Category model.
const seedCategories = () => Category.bulkCreate(categoryData);

// Export the seedCategories function to be used in the seed script.
module.exports = seedCategories;

