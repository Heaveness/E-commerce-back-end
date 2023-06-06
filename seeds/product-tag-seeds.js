// Import the required model for product tags.
const { ProductTag } = require('../models');

// Define an array of product tag data with different product and tag IDs.
const productTagData = [
	{
		product_id: 1,
		tag_id: 6,
	},
	{
		product_id: 1,
		tag_id: 7,
	},
	{
		product_id: 1,
		tag_id: 8,
	},
	{
		product_id: 2,
		tag_id: 6,
	},
	{
		product_id: 3,
		tag_id: 1,
	},
	{
		product_id: 3,
		tag_id: 3,
	},
	{
		product_id: 3,
		tag_id: 4,
	},
	{
		product_id: 3,
		tag_id: 5,
	},
	{
		product_id: 4,
		tag_id: 1,
	},
	{
		product_id: 4,
		tag_id: 2,
	},
	{
		product_id: 4,
		tag_id: 8,
	},
	{
		product_id: 5,
		tag_id: 3,
	},
];

// Function to seed the product tags by bulk creating the product tag data using the ProductTag model.
const seedProductTags = () => ProductTag.bulkCreate(productTagData);

// Export the seedProductTags function to be used in the seed script.
module.exports = seedProductTags;
