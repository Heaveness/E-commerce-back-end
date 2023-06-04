const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/categories', async (req, res) => {
	try {
		const categories = await Category.findAll({
		  	include: [{ model: Product }],
		});
		res.status(200).json(categories);
	  	} 
	catch (err) {
		res.status(500).json(err);
	}
});

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

router.post('/products', async (req, res) => {
	try {
	  	const productData = await Product.create(req.body);
	  	res.status(201).json(productData);
	} catch (err) {
	  	res.status(400).json(err);
	}
});

router.put('/products/:id', async (req, res) => {
	try {
		const productData = await Product.update(req.body, {
			where: {
				id: req.params.id,
			},
	  	});
	if (!productData[0]) {
		res.status(404).json({ message: 'No product found with this id' });
		return;
	}
	  	res.status(200).json({ message: 'Product updated successfully' });
	} catch (err) {
	  	res.status(400).json(err);
	}
});

router.delete('/products/:id', async (req, res) => {
	try {
	  	const productData = await Product.destroy({
			where: {
		  		id: req.params.id,
			},
	  	});
	if (!productData) {
		res.status(404).json({ message: 'No product found with this id' });
		return;
	}
	  	res.status(200).json({ message: 'Product deleted successfully' });
	} catch (err) {
	  	res.status(500).json(err);
	}
});

module.exports = router;
