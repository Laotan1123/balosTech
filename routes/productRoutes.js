const express = require('express');
const Product = require('../models/product');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Remove this line
// router.use(authenticate);   

// Public routes (no authentication required)
// Get all products with optional category filter and search
router.get('/', async (req, res) => {
    const { category, search } = req.query;
    try {
        const query = {};
        if (category) {
            query.category = category;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        const products = await Product.find(query);
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Protected routes (authentication required)
// Create a new product
router.post('/', authenticate, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});


// Get a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a product by ID
router.patch('/:id', authenticate, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a product by ID
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;