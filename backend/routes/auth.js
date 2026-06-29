const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }

        // Check for existing user
        const [existingUsers] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please enter all fields' });
        }

        // Check for user
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const user = users[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Sign token
        const jwtSecret = process.env.JWT_SECRET || 'secret123';
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

const authMiddleware = require('../middleware/authMiddleware');

// @route   DELETE /api/auth/reset
// @desc    Reset all user data (transactions, budgets, goals)
// @access  Private
router.delete('/reset', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Delete all user data
        await pool.query('DELETE FROM transactions WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM budgets WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM goals WHERE user_id = ?', [userId]);
        
        res.json({ message: 'All user data has been reset successfully' });
    } catch (err) {
        console.error('Error resetting user data:', err);
        res.status(500).json({ error: 'Server error during data reset' });
    }
});

module.exports = router;
