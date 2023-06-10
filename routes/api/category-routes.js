// Import the required packages and libraries.
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint.

// GET all categories.
router.get('/', async (req, res) => {
	try {
		// Find all categories and include associated products.
		const categories = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(categories); // Return the categories as a JSON response.
	} catch (err) {
		res.status(500).json(err); // Return an error if an exception occurs.
	}
});

// GET a specific category by ID.
router.get('/:id', async (req, res) => {
	try {
		// Find a category by its ID and include its associated products.
		const category = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!category) {
			res.status(404).json({ message: 'No category found with this id' }); // Return a 404 status if the category is not found.
			return;
		}
		res.status(200).json(category); // Return the category as a JSON response.
	} catch (err) {
		res.status(500).json(err); // Return an error if an exception occurs.
	}
});

// Create a new category.
router.post('/', async (req, res) => {
	try {
		const categoryData = await Category.create(req.body); // Create a new category with the provided data.
		res.status(201).json(categoryData); // Return the newly created category as a JSON response with a status of 201 (Created).
	} catch (err) {
		res.status(400).json(err); // Return an error if the request is invalid or missing required data.
	}
});

// Update a category by ID.
router.put('/:id', async (req, res) => {
	try {
		const categoryData = await Category.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!categoryData[0]) {
			res.status(404).json({ message: 'No category found with this id' }); // Return a 404 status if the category is not found.
			return;
		}
		res.status(200).json({ message: 'Category updated successfully' }); // Return a success message as a JSON response.
	} catch (err) {
		res.status(400).json(err); // Return an error if the request is invalid or missing required data.
	}
});

// Delete a category by ID.
router.delete('/:id', async (req, res) => {
	try {
		const categoryData = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!categoryData) {
			res.status(404).json({ message: 'No category found with this id' }); // Return a 404 status if the category is not found.
			return;
		}
		res.status(200).json({ message: 'Category deleted successfully' }); // Return a success message as a JSON response.
	} catch (err) {
		res.status(500).json(err); // Return an error if an exception occurs.
	}
});

module.exports = router;