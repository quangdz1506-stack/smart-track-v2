const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Get all goals for user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query('SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching goals:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create a new goal
router.post('/', async (req, res) => {
  const { name, target_amount, deadline } = req.body;
  const userId = req.user.id;
  
  if (!name || !target_amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const [result] = await db.query(
      'INSERT INTO goals (user_id, name, target_amount, current_amount, deadline) VALUES (?, ?, ?, ?, ?)',
      [userId, name, target_amount, 0.00, deadline || null]
    );
    res.status(201).json({ id: result.insertId, name, target_amount, current_amount: 0.00, deadline: deadline || null });
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update goal current amount (full update)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, target_amount, current_amount, deadline } = req.body;
  const userId = req.user.id;
  
  try {
    const [result] = await db.query(
      'UPDATE goals SET name = ?, target_amount = ?, current_amount = ?, deadline = ? WHERE id = ? AND user_id = ?',
      [name, target_amount, current_amount, deadline || null, id, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Goal not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating goal:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add funds to a goal
router.put('/:id/add-funds', async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  const userId = req.user.id;
  
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Valid positive amount is required' });
  }
  
  try {
    const [result] = await db.query(
      'UPDATE goals SET current_amount = current_amount + ? WHERE id = ? AND user_id = ?',
      [amount, id, userId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Goal not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error adding funds to goal:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete a goal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  try {
    const [result] = await db.query('DELETE FROM goals WHERE id = ? AND user_id = ?', [id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Goal not found or unauthorized' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting goal:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
