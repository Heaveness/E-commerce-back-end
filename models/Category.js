// Import the required packages and libraries.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Category model as a subclass of Sequelize's Model class.
class Category extends Model {}

Category.init(
  	{
		// Define the model's columns.
		id: {
			type: DataTypes.INTEGER, // Column data type: INTEGER.
			primaryKey: true, // Make this column the primary key.
			autoIncrement: true, // Enable auto-increment for this column.
		},
		category_name: {
			type: DataTypes.STRING, // Column data type: STRING.
			allowNull: false, // Disallow null values for this column.
		},
  	},
  	{
		sequelize, // Pass the configured Sequelize instance.
		timestamps: false, // Disable timestamps.
		freezeTableName: true, // Prevent Sequelize from pluralizing the table name.
		underscored: true, // Use underscores instead of camel-casing for column names.
		modelName: 'category', // Set the model name.
  	}
);

// Export the Category model for use in other files.
module.exports = Category;
