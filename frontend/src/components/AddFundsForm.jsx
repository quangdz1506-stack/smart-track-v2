import React, { useState } from 'react';

const AddFundsForm = ({ isOpen, onClose, onAddFunds, goalName }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid positive amount');
      return;
    }
    setError('');
    onAddFunds(Number(amount));
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface-container w-full max-w-sm rounded-3xl shadow-xl overflow-hidden animate-slide-up border border-outline-variant/20 dark:border-white/10">
        <div className="px-6 py-4 border-b border-outline-variant/20 dark:border-white/10 flex justify-between items-center">
          <h3 className="font-headline-sm text-on-surface">Add Funds</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-on-surface-variant text-label-md mb-4">
            Adding funds to <span className="font-bold text-on-surface">{goalName}</span>
          </p>
          
          {error && <div className="mb-4 text-error text-label-sm font-bold">{error}</div>}
          
          <div>
            <label className="block text-label-md text-on-surface-variant mb-1">Amount</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
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
              Add Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFundsForm;
