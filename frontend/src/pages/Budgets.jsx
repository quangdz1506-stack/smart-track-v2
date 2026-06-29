import React, { useEffect, useState } from 'react';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBudgets = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/budgets');
        if (!response.ok) throw new Error('Failed to fetch budgets');
        const data = await response.json();
        setBudgets(data);
      } catch (err) {
        console.error(err);
        setError('Failed to connect to backend.');
      } finally {
        setLoading(false);
      }
    };
    
    loadBudgets();
  }, []);

  return (
    <>
      <div className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Budgets</h2>
        <p className="text-on-surface-variant font-body-md mt-1">Manage your monthly spending limits.</p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-lg text-center font-bold">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-xl text-on-surface-variant">Loading budgets...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {budgets.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-surface-container-low rounded-3xl border border-outline-variant/30">
              <p className="text-on-surface-variant">No budgets configured yet. (Add Budget Feature Coming Soon)</p>
            </div>
          ) : (
            budgets.map(budget => (
              <div key={budget.id} className="glass-card p-lg rounded-3xl border border-white/20 dark:border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                
                <h3 className="font-headline-sm text-on-surface capitalize">{budget.category}</h3>
                <p className="text-on-surface-variant text-label-sm">{budget.month}</p>
                
                <div className="mt-md flex justify-between items-end mb-2">
                  <span className="font-headline-md text-primary font-bold">${Number(budget.spent_amount).toFixed(2)}</span>
                  <span className="text-label-md text-on-surface-variant">/ ${Number(budget.limit_amount).toFixed(2)}</span>
                </div>
                
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min((budget.spent_amount / budget.limit_amount) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Budgets;
