// Import the required packages and libraries.
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint.

// Retrieve all products.
router.get('/', async (req, res) => {
	try {
		// Retrieve all products from the database, including their associated categories and tags.
		const products = await Product.findAll({
			include: [{ model: Category }, { model: Tag, through: ProductTag }],
		});
		// Respond with the retrieved products.
		res.status(200).json(products);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

// Retrieve a single product.
router.get('/:id', async (req, res) => {
	try {
		// Retrieve the product with the given id from the database, including its associated categories and tags.
		const product = await Product.findByPk(req.params.id, {
			include: [{ model: Category }, { model: Tag, through: ProductTag }],
		});
		// If no product was found with the given id, respond with an error message.
		if (!product) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
		}
		// Respond with the retrieved product.
		res.status(200).json(product);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

// Create a new product.
router.post('/', async (req, res) => {
	try {
		// Create a new product in the database with the provided data.
		const product = await Product.create(req.body);
		// If there are tagIds provided in the request body, create the associations between the product and tags.
		if (req.body.tagIds && req.body.tagIds.length) {
			// Create an array of objects containing the product_id and tag_id for each association.
			const productTagIdArr = req.body.tagIds.map((tag_id) => {
				return {
					product_id: product.id,
					tag_id,
				};
			});
			// Bulk create the associations between the product and tags in the database.
			await ProductTag.bulkCreate(productTagIdArr);
		}
		// Respond with the created product.
		res.status(200).json(product);
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(400).json(err);
	}
});

// Update a product.
router.put('/:id', async (req, res) => {
	try {
		// Update the product in the database with the provided data.
		const [affectedRows] = await Product.update(req.body, {
			where: { id: req.params.id },
		});

		// If no rows were affected, the product with the given id was not found.
		if (affectedRows <= 0) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
		}

		// If there are tagIds provided in the request body, update the associated tags for the product.
		if (req.body.tagIds && req.body.tagIds.length) {
			// Retrieve the current tags associated with the product.
			const productTags = await ProductTag.findAll({
				where: { product_id: req.params.id },
			});

			// Extract the tagIds from the current product tags.
			const productTagIds = productTags.map(({ tag_id }) => tag_id);

			// Determine the new tags to be associated with the product.
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						product_id: req.params.id,
						tag_id,
					};
				});

			// Determine the tags to be disassociated from the product.
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			// Remove the disassociated tags from the database.
			await ProductTag.destroy({ where: { id: productTagsToRemove } });

			 // Create the new associations between the product and tags in the database.
			await ProductTag.bulkCreate(newProductTags);
		}

		// Respond with a success message.
		res.status(200).json({ message: 'Product updated successfully' });
	} catch (err) {
	  	// If an error occurred, respond with the error message.
	  	res.status(400).json(err);
	}
});

// Delete a product.
router.delete('/:id', async (req, res) => {
	try {
		// Delete the product from the database with the given id.
		const deletedProduct = await Product.destroy({
			where: { id: req.params.id },
		});

		// If no product was deleted, the product with the given id was not found.
		if (deletedProduct <= 0) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
		}

		// Respond with a success message.
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		// If an error occurred, respond with the error message.
		res.status(500).json(err);
	}
});

module.exports = router;
