// Import the required model for products.
const { Product } = require('../models');

// Define an array of product data with different product details.
const productData = [
  {
    product_name: 'Plain T-Shirt', // Name of the product.
    price: 14.99, // Price of the product.
    stock: 14, // Stock quantity of the product.
    category_id: 1, // Category ID associated with the product.
  },
  {
    product_name: 'Running Sneakers',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Branded Baseball Hat',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Top 40 Music Compilation Vinyl Record',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Cargo Shorts',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

// Function to seed the products by bulk creating the product data using the Product model.
const seedProducts = () => Product.bulkCreate(productData);

// Export the seedProducts function to be used in the seed script.
module.exports = seedProducts;
