const express = require('express');
const router = express.Router();
const db = require('../config/db');

// @route   POST /api/transactions
// @desc    Create a new transaction
router.post('/', async (req, res) => {
  const { amount, type, category, date, description } = req.body;

  // Validation
  if (!amount || amount <= 0 || isNaN(amount)) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  if (!type || (type !== 'income' && type !== 'expense')) {
    return res.status(400).json({ error: 'Type must be strictly "income" or "expense"' });
  }
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }
  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'Date must be a valid format (YYYY-MM-DD)' });
  }

  try {
    const query = 'INSERT INTO transactions (amount, type, category, date, description) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [amount, type, category, date, description || null]);
    
    res.status(201).json({ 
      message: 'Transaction created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
