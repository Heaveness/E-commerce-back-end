// Import the important parts of the Sequelize library.
const { Model, DataTypes } = require('sequelize');

// Import the database connection from config.js.
const sequelize = require('../config/connection.js');

// Initialize the Tag model by extending off Sequelize's Model class.
class Tag extends Model {}

// Set up the fields and rules for the Tag model.
Tag.init(
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
		modelName: 'tag',
	}
);

// Export the Tag model for use in other files.
module.exports = Tag;
