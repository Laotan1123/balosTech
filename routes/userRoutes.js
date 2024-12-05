const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Import express-validator
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGZkZmE0MzA2OGUyZTZlMzQ1MGJiNiIsImlhdCI6MTczMzI5NTA3MiwiZXhwIjoxNzMzMjk4NjcyfQ.5LQXfAI4IdaU773fSW3t7uNVLMDcFdA7lC7SLOL1SQ0'; // Change this to a secure secret in production

// User registration
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'), // Validation for username
    body('email').isEmail().withMessage('Email is not valid'), // Validation for email
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Validation for password
], async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return errors if any
    }
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', [
    body('email').isEmail().withMessage('Email is not valid'), // Validation for email
    body('password').notEmpty().withMessage('Password is required'), // Validation for password
], async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return errors if any
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update user profile
router.patch('/profile', authenticate, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'firstName', 'lastName', 'address', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(req.user.id);
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;