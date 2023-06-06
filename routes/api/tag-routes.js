// Import the required packages and libraries.
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint.

// Retrieve all tags.
router.get('/', async (req, res) => {
	try {
		// Retrieve all tags from the database, including the associated products.
		const tags = await Tag.findAll({
			include: [{ model: Product, through: ProductTag }],
		});
		// Respond with the retrieved tags.
		res.status(200).json(tags);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

// Retrieve a single tag.
router.get('/:id', async (req, res) => {
	try {
		// Retrieve the tag with the given id from the database, including the associated products.
		const tag = await Tag.findByPk(req.params.id, {
			include: [{ model: Product, through: ProductTag }],
		});
		// If no tag was found with the given id, respond with an error message.
		if (!tag) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		// Respond with the retrieved tag.
		res.status(200).json(tag);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

// Create a new tag.
router.post('/', async (req, res) => {
	try {
		// Create a new tag using the data from the request body.
		const tag = await Tag.create(req.body);
		// Respond with the created tag.
		res.status(200).json(tag);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(400).json(err);
	}
});

// Update a tag.
router.put('/:id', async (req, res) => {
	try {
		// Update the tag with the given id using the data from the request body.
		const updatedTag = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		// If no tag was updated, respond with an error message.
		if (!updatedTag[0]) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		// Respond with a success message.
		res.status(200).json({ message: 'Tag updated successfully' });
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

// Delete a tag.
router.delete('/:id', async (req, res) => {
	try {
		// Delete the tag with the given id from the database.
		const deletedTag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});
		// If no tag was deleted, respond with an error message.
		if (!deletedTag) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		// Respond with a success message.
		res.status(200).json({ message: 'Tag deleted successfully' });
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

module.exports = router;
