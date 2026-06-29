import React, { useEffect, useState } from 'react';
import { fetchBudgetsApi, createBudgetApi, deleteBudgetApi } from '../services/api';
import BudgetForm from '../components/BudgetForm';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadBudgets = async () => {
    setLoading(true);
    try {
      const data = await fetchBudgetsApi();
      setBudgets(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch budgets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleSaveBudget = async (formData) => {
    try {
      setError(null);
      await createBudgetApi(formData);
      setIsModalOpen(false);
      await loadBudgets();
    } catch (err) {
      console.error(err);
      setError('Failed to add budget.');
    }
  };

  const handleDeleteBudget = async (id) => {
    if (!window.confirm('Are you sure you want to delete this budget?')) return;
    try {
      setError(null);
      await deleteBudgetApi(id);
      await loadBudgets();
    } catch (err) {
      console.error(err);
      setError('Failed to delete budget.');
    }
  };

  return (
    <>
      <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Budgets</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Manage your monthly spending limits.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-1 px-5 py-2.5 brand-gradient text-white rounded-xl font-label-md shadow-sm dark:shadow-lg dark:glow-primary hover:shadow-md active:opacity-90 transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span> Add Budget
        </button>
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
              <p className="text-on-surface-variant">No budgets configured yet.</p>
            </div>
          ) : (
            budgets.map(budget => {
              const spent = Number(budget.spent_amount) || 0;
              const limit = Number(budget.limit_amount) || 1;
              const percentage = Math.min((spent / limit) * 100, 100);
              const isOver = spent >= limit;
              
              return (
                <div key={budget.id} className="glass-card p-lg rounded-3xl border border-white/20 dark:border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm text-on-surface capitalize">{budget.category}</h3>
                      <p className="text-on-surface-variant text-label-sm">{budget.month}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteBudget(budget.id)}
                      className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-container rounded-full"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  
                  <div className="mt-md flex justify-between items-end mb-2">
                    <span className={`font-headline-md font-bold ${isOver ? 'text-error' : 'text-primary'}`}>
                      ${spent.toFixed(2)}
                    </span>
                    <span className="text-label-md text-on-surface-variant">/ ${limit.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                    <div className={`h-2.5 rounded-full ${isOver ? 'bg-error' : 'bg-primary'}`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <BudgetForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitBudget={handleSaveBudget}
      />
    </>
  );
};

export default Budgets;
