import React, { useState } from 'react';

const BudgetForm = ({ isOpen, onClose, onSubmitBudget }) => {
  const [category, setCategory] = useState('');
  const [limitAmount, setLimitAmount] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !limitAmount || !month) {
      setError('Please fill in all fields');
      return;
    }
    if (isNaN(limitAmount) || Number(limitAmount) <= 0) {
      setError('Limit amount must be a positive number');
      return;
    }

    if (month) {
      const [yearStr, monthStr] = month.split('-');
      if (yearStr && monthStr) {
        const selectedMonth = new Date(Number(yearStr), Number(monthStr) - 1);
        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth());
        if (selectedMonth < currentMonth) {
          setError('Budget month cannot be in the past');
          return;
        }
      } else {
        setError('Invalid month format. Use YYYY-MM');
        return;
      }
    }

    setError('');
    onSubmitBudget({
      category,
      limit_amount: Number(limitAmount),
      month
    });
    // Reset
    setCategory('');
    setLimitAmount('');
    setMonth('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-slide-up border border-outline-variant/20 dark:border-white/10">
        <div className="px-6 py-4 border-b border-outline-variant/20 dark:border-white/10 flex justify-between items-center">
          <h3 className="font-headline-sm text-on-surface">Add New Budget</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="mb-4 text-error text-label-sm font-bold">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-label-md text-on-surface-variant mb-1">Category</label>
              <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Food, Transport"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-label-md text-on-surface-variant mb-1">Limit Amount</label>
              <input 
                type="number" 
                value={limitAmount}
                onChange={(e) => setLimitAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-surface-container-lowest border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-label-md text-on-surface-variant mb-1">Month (YYYY-MM)</label>
              <input 
                type="text" 
                placeholder="YYYY-MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-label-md text-on-surface border border-outline-variant/30 hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 px-4 rounded-xl font-label-md text-white brand-gradient shadow-sm dark:shadow-lg dark:glow-primary hover:opacity-90 transition-opacity"
            >
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
