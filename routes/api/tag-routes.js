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

router.put('/tags/:id', async (req, res) => {
	try {
		const updatedTag = await Tag.update(req.body, {
			where: {
			id: req.params.id,
			},
		});
		if (!updatedTag[0]) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		res.status(200).json({ message: 'Tag updated successfully' });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.delete('/tags/:id', async (req, res) => {
	try {
		const deletedTag = await Tag.destroy({
			where: {
			id: req.params.id,
			},
		});
		if (!deletedTag) {
			res.status(404).json({ message: 'No tag found with this id' });
			return;
		}
		res.status(200).json({ message: 'Tag deleted successfully' });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
