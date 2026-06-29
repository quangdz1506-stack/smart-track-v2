const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Get all budgets for user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query('SELECT * FROM budgets WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching budgets:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new budget
router.post('/', async (req, res) => {
  const { category, limit_amount, month } = req.body;
  const userId = req.user.id;

  if (!category || !limit_amount || !month) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [result] = await db.query(
      'INSERT INTO budgets (user_id, category, limit_amount, month) VALUES (?, ?, ?, ?)',
      [userId, category, limit_amount, month]
    );
    res.status(201).json({ id: result.insertId, category, limit_amount, spent_amount: 0.00, month });
  } catch (err) {
    console.error('Error creating budget:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update budget spent amount
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { limit_amount, spent_amount } = req.body;
  const userId = req.user.id;
  
  try {
    const [result] = await db.query(
      'UPDATE budgets SET limit_amount = ?, spent_amount = ? WHERE id = ? AND user_id = ?',
      [limit_amount, spent_amount, id, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Budget not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating budget:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const [result] = await db.query('DELETE FROM budgets WHERE id = ? AND user_id = ?', [id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Budget not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting budget:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
