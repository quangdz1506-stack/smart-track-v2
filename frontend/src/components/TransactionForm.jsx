import { useState } from 'react';

const TransactionForm = ({ onSubmitTransaction }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.amount || formData.amount <= 0) {
      return setError('Amount must be a positive number.');
    }
    if (!formData.category.trim()) {
      return setError('Category is required.');
    }
    if (!formData.date) {
      return setError('Date is required.');
    }

    onSubmitTransaction(formData);
    
    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-color)',
    color: 'var(--text-primary)',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Add Transaction</h3>
      
      {error && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Amount</label>
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={inputStyle} placeholder="0.00" step="0.01" />
          </div>
          
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} style={inputStyle} placeholder="e.g. Groceries, Salary" />
          </div>

          <div style={{ flex: 1, minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description (Optional)</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} style={inputStyle} placeholder="Add a note..." />
        </div>

        <button type="submit" style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
