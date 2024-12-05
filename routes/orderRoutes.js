const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(authenticate);

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { products } = req.body;

        // Calculate total amount
        let totalAmount = 0;
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            totalAmount += product.price * item.quantity;
        }

        const order = new Order({
            user: req.user.id,
            products,
            totalAmount,
        });

        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all orders for the authenticated user
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;