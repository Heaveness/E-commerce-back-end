// Import the required model for tags.
const { Tag } = require('../models');

// Define an array of tag data with different tag names.
const tagData = [
	{
		tag_name: 'rock music',
	},
	{
		tag_name: 'pop music',
	},
	{
		tag_name: 'blue',
	},
	{
		tag_name: 'red',
	},
	{
		tag_name: 'green',
	},
	{
		tag_name: 'white',
	},
	{
		tag_name: 'gold',
	},
	{
		tag_name: 'pop culture',
	},
];

// Function to seed the tags by bulk creating the tag data using the Tag model.
const seedTags = () => Tag.bulkCreate(tagData);

// Export the seedTags function to be used in the seed script.
module.exports = seedTags;
