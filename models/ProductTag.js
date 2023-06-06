// Import the important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');

// Import the database connection from config.js.
const sequelize = require('../config/connection');

// Initialize the ProductTag model by extending off Sequelize's Model class.
class ProductTag extends Model {}

// Set up the fields and rules for the ProductTag model.
ProductTag.init(
	{
		// Defining the columns.
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		tag_name: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'product_tag',
	}
);

// Export the ProductTag model for use in other files.
module.exports = ProductTag;
