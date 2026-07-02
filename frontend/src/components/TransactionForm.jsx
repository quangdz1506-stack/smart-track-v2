import { useState, useEffect } from 'react';

const TransactionForm = ({ isOpen, onClose, onSubmitTransaction, editingTransaction, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date ? new Date(editingTransaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        description: editingTransaction.description || ''
      });
    } else {
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  }, [editingTransaction, isOpen]);

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
    
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return setError('Date cannot be in the past.');
      }
    }

    onSubmitTransaction(formData);
    
    if (!editingTransaction) {
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  const handleClose = () => {
    if (editingTransaction) {
      onCancelEdit();
    }
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-md transition-all duration-300 transform ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
      <div className="modal-overlay absolute inset-0" onClick={handleClose}></div>
      <div className="glass-card w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-outline-variant/30 dark:border-white/10">
        <div className="brand-gradient p-lg flex items-center justify-between glow-primary">
          <h3 className="font-headline-md text-white">{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <button type="button" className="text-white/80 hover:text-white transition-colors" onClick={handleClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-lg space-y-md bg-surface-container-lowest dark:bg-surface">
          {error && <p className="text-error text-label-sm">{error}</p>}
          <div className="grid grid-cols-2 gap-md">
            
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-label-sm text-on-surface-variant mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                <input 
                  type="number" 
                  name="amount" 
                  value={formData.amount} 
                  onChange={handleChange} 
                  className="w-full bg-surface-container-low border border-outline-variant/30 dark:border-white/5 rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-primary/20 outline-none text-on-surface" 
                  placeholder="0.00" 
                  step="0.01" 
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-label-sm text-on-surface-variant mb-2">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                className="w-full bg-surface-container-low border border-outline-variant/30 dark:border-white/5 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none text-on-surface appearance-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-label-sm text-on-surface-variant mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                className="w-full bg-surface-container-low border border-outline-variant/30 dark:border-white/5 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none text-on-surface" 
                placeholder="e.g. Groceries" 
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-label-sm text-on-surface-variant mb-2">Date (YYYY-MM-DD)</label>
              <input 
                type="text" 
                placeholder="YYYY-MM-DD"
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="w-full bg-surface-container-low border border-outline-variant/30 dark:border-white/5 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none text-on-surface" 
              />
            </div>
            
            <div className="col-span-2">
              <label className="block text-label-sm text-on-surface-variant mb-2">Description (Optional)</label>
              <input 
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                className="w-full bg-surface-container-low border border-outline-variant/30 dark:border-white/5 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none text-on-surface" 
                placeholder="What did you spend on?" 
              />
            </div>
            
          </div>
          <div className="pt-md">
            <button type="submit" className="w-full py-4 brand-gradient text-white rounded-xl font-bold shadow-lg shadow-primary/20 dark:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-[1.01] active:scale-95 transition-all">
              {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
