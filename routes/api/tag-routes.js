const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/tags', async (req, res) => {
	try {
	  	const tags = await Tag.findAll({
			include: [{ model: Product, through: ProductTag }],
	  	});
	  	res.status(200).json(tags);
	} catch (err) {
	  	res.status(500).json(err);
	}
});

router.get('/tags/:id', async (req, res) => {
	try {
		const tag = await Tag.findByPk(req.params.id, {
			include: [{ model: Product, through: ProductTag }],
		});
		if (!tag) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		res.status(200).json(tag);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/tags', async (req, res) => {
	try {
		const tag = await Tag.create(req.body);
		res.status(200).json(tag);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/:id', (req, res) => {
	// update a tag's name by its `id` value

});

router.delete('/:id', (req, res) => {
	// delete on tag by its `id` value
	
});

module.exports = router;
