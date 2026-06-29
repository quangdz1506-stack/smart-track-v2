const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all transaction routes
router.use(authMiddleware);

// @route   POST /api/transactions
// @desc    Create a new transaction
router.post('/', async (req, res) => {
  const { amount, type, category, date, description } = req.body;
  const userId = req.user.id;

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
    const query = 'INSERT INTO transactions (user_id, amount, type, category, date, description) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [userId, amount, type, category, date, description || null]);
    
    res.status(201).json({ 
      message: 'Transaction created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   GET /api/transactions
// @desc    Fetch all transactions for logged in user with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    const userId = req.user.id;
    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    const queryParams = [userId];

    if (category) {
      query += ' AND category = ?';
      queryParams.push(category);
    }
    
    if (type) {
      query += ' AND type = ?';
      queryParams.push(type);
    }

    query += ' ORDER BY date DESC, created_at DESC';

    const [rows] = await db.query(query, queryParams);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user.id;
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    const { amount, type, category, date, description } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Valid positive amount is required' });
    }
    if (!type || (type !== 'income' && type !== 'expense')) {
      return res.status(400).json({ error: 'Type must be either income or expense' });
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
      return res.status(400).json({ error: 'Valid category is required' });
    }
    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ error: 'Valid date is required' });
    }

    const query = 'UPDATE transactions SET amount = ?, type = ?, category = ?, date = ?, description = ? WHERE id = ? AND user_id = ?';
    const [result] = await db.query(query, [amount, type, category, date, description || null, id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    res.status(200).json({ message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const userId = req.user.id;
    
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    const query = 'DELETE FROM transactions WHERE id = ? AND user_id = ?';
    const [result] = await db.query(query, [id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
