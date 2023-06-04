const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/products', async (req, res) => {
	try {
	  const products = await Product.findAll({
			include: [{ model: Category }, { model: Tag, through: ProductTag }],
	  });
	  res.status(200).json(products);
	} catch (err) {
	  	res.status(500).json(err);
	}
});

// get one product
router.get('/products/:id', async (req, res) => {
	try {
	  	const product = await Product.findByPk(req.params.id, {
			include: [{ model: Category }, { model: Tag, through: ProductTag }],
	  	});
	  	if (!product) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
	  	}
	  	res.status(200).json(product);
	} catch (err) {
	  	res.status(500).json(err);
	}
  });

// create new product
router.post('/products', async (req, res) => {
	try {
		const product = await Product.create(req.body);
		if (req.body.tagIds && req.body.tagIds.length) {
			const productTagIdArr = req.body.tagIds.map((tag_id) => {
			return {
				product_id: product.id,
				tag_id,
			};
			});
			await ProductTag.bulkCreate(productTagIdArr);
	  	}
	  	res.status(200).json(product);
	} catch (err) {
		res.status(400).json(err);
	}
});

// update product
router.put('/products/:id', async (req, res) => {
	try {
		const [affectedRows] = await Product.update(req.body, {
			where: { id: req.params.id },
		});
		if (affectedRows <= 0) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
		}
		if (req.body.tagIds && req.body.tagIds.length) {
			const productTags = await ProductTag.findAll({
			where: { product_id: req.params.id },
			});
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			const newProductTags = req.body.tagIds
			.filter((tag_id) => !productTagIds.includes(tag_id))
			.map((tag_id) => {
				return {
				product_id: req.params.id,
				tag_id,
				};
			});
			const productTagsToRemove = productTags
			.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
			.map(({ id }) => id);
			await ProductTag.destroy({ where: { id: productTagsToRemove } });
			await ProductTag.bulkCreate(newProductTags);
		}
		res.status(200).json({ message: 'Product updated successfully' });
	} catch (err) {
	  	res.status(400).json(err);
	}
});

router.delete('/products/:id', async (req, res) => {
	try {
		const deletedProduct = await Product.destroy({
			where: { id: req.params.id },
		});
		if (deletedProduct <= 0) {
			res.status(404).json({ message: 'No product found with this id' });
			return;
		}
		res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
