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

// GET a specific product by ID.
router.get('/products/:id', async (req, res) => {
	try {
		// Find a product by its ID and include its associated category and tags.
		const product = await Product.findByPk(req.params.id, {
			include: [{ model: Category }, { model: Tag, through: ProductTag }],
		});
		if (!product) {
			res.status(404).json({ message: 'No product found with this id' }); // Return a 404 status if the product is not found.
			return;
		}
		res.status(200).json(product); // Return the product as a JSON response.
	} catch (err) {
		res.status(500).json(err); // Return an error if an exception occurs.
	}
});

// Create a new product.
router.post('/products', async (req, res) => {
	try {
		const productData = await Product.create(req.body); // Create a new product with the provided data.
		res.status(201).json(productData); // Return the newly created product as a JSON response with a status of 201 (Created).
	} catch (err) {
		res.status(400).json(err); // Return an error if the request is invalid or missing required data.
	}
});

// Update a product by ID.
router.put('/:id', async (req, res) => {
	try {
		const productData = await Product.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!productData[0]) {
			res.status(404).json({ message: 'No product found with this id' }); // Return a 404 status if the product is not found.
			return;
		}
		res.status(200).json({ message: 'Product updated successfully' }); // Return a success message as a JSON response.
	} catch (err) {
		res.status(400).json(err); // Return an error if the request is invalid or missing required data.
	}
});

// Delete a product by ID.
router.delete('/:id', async (req, res) => {
	try {
		const productData = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		if (!productData) {
			res.status(404).json({ message: 'No product found with this id' }); // Return a 404 status if the product is not found.
			return;
		}
		res.status(200).json({ message: 'Product deleted successfully' }); // Return a success message as a JSON response.
	} catch (err) {
		res.status(500).json(err); // Return an error if an exception occurs.
	}
});

module.exports = router;
