import { useState } from 'react';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(t => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('food') || cat.includes('grocer')) return 'shopping_cart';
    if (cat.includes('work') || cat.includes('salary')) return 'work';
    if (cat.includes('entertainment') || cat.includes('subscript')) return 'subscriptions';
    if (cat.includes('transport') || cat.includes('car')) return 'directions_car';
    if (cat.includes('house') || cat.includes('rent')) return 'home';
    return 'receipt_long';
  };

  return (
    <div className="glass-card rounded-2xl flex flex-col overflow-hidden">
      <div className="px-lg py-md border-b border-outline-variant/10 dark:border-white/5 flex items-center justify-between bg-surface-container-low dark:bg-white/5">
        <h4 className="font-headline-md text-on-surface">Recent Transactions</h4>
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-surface-container border border-outline-variant/30 dark:border-white/10 rounded-xl px-3 py-1 text-label-sm text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
        >
          <option value="all">All Types</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-on-surface-variant text-label-sm uppercase tracking-wider">
            <tr>
              <th className="px-lg py-4 font-bold">Transaction</th>
              <th className="px-lg py-4 font-bold">Category</th>
              <th className="px-lg py-4 font-bold">Date</th>
              <th className="px-lg py-4 font-bold text-right">Amount</th>
              <th className="px-lg py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 dark:divide-white/5">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-lg py-8 text-center text-on-surface-variant">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id} className="hover:bg-surface-container-high/40 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-lg py-4">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 bg-surface-container dark:bg-white/5 rounded-lg flex items-center justify-center text-on-surface-variant border border-transparent dark:border-white/5">
                        <span className="material-symbols-outlined">{getCategoryIcon(t.category)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-body-md font-bold text-on-surface">{t.description || t.category}</span>
                        {t.description && <span className="text-xs text-on-surface-variant">{t.category}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-lg py-4">
                    <span className={`px-3 py-1 rounded-full text-label-sm border ${
                      t.type === 'income' 
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                        : 'bg-secondary-fixed/30 text-on-secondary-fixed-variant dark:bg-secondary/10 dark:text-secondary dark:border-secondary/20'
                    }`}>
                      {t.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-lg py-4 text-on-surface-variant font-body-md">
                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className={`px-lg py-4 font-bold text-right ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-error'}`}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-lg py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => onEdit(t)}
                        className="p-2 hover:bg-surface-container dark:hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-primary transition-all"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button 
                        onClick={() => onDelete(t.id)}
                        className="p-2 hover:bg-surface-container dark:hover:bg-white/10 rounded-lg text-on-surface-variant hover:text-error transition-all"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
