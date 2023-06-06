// Import the required packages and libraries.
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the categoryRoutes for requests to '/categories' endpoint.
router.use('/categories', categoryRoutes);

// Use the productRoutes for requests to '/products' endpoint.
router.use('/products', productRoutes);

// Use the tagRoutes for requests to '/tags' endpoint.
router.use('/tags', tagRoutes);

module.exports = router;
