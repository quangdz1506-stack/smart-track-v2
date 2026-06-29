import React, { useEffect, useState } from 'react';
import { fetchGoalsApi, createGoalApi, deleteGoalApi, addFundsGoalApi } from '../services/api';
import GoalForm from '../components/GoalForm';
import AddFundsForm from '../components/AddFundsForm';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [fundingGoal, setFundingGoal] = useState(null);

  const loadGoals = async () => {
    setLoading(true);
    try {
      const data = await fetchGoalsApi();
      setGoals(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch goals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleSaveGoal = async (formData) => {
    try {
      setError(null);
      await createGoalApi(formData);
      setIsGoalModalOpen(false);
      await loadGoals();
    } catch (err) {
      console.error(err);
      setError('Failed to add goal.');
    }
  };

  const handleDeleteGoal = async (id) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    try {
      setError(null);
      await deleteGoalApi(id);
      await loadGoals();
    } catch (err) {
      console.error(err);
      setError('Failed to delete goal.');
    }
  };

  const handleAddFunds = async (amount) => {
    if (!fundingGoal) return;
    try {
      setError(null);
      await addFundsGoalApi(fundingGoal.id, amount);
      setFundingGoal(null);
      await loadGoals();
    } catch (err) {
      console.error(err);
      setError('Failed to add funds.');
    }
  };

  return (
    <>
      <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Financial Goals</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Track your progress towards your dreams.</p>
        </div>
        <button onClick={() => setIsGoalModalOpen(true)} className="flex items-center justify-center gap-1 px-5 py-2.5 brand-gradient text-white rounded-xl font-label-md shadow-sm dark:shadow-lg dark:glow-primary hover:shadow-md active:opacity-90 transition-all">
          <span className="material-symbols-outlined text-[20px]">add</span> Add Goal
        </button>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-lg text-center font-bold">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-xl text-on-surface-variant">Loading goals...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {goals.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-surface-container-low rounded-3xl border border-outline-variant/30">
              <p className="text-on-surface-variant">No goals configured yet.</p>
            </div>
          ) : (
            goals.map(goal => {
              const current = Number(goal.current_amount) || 0;
              const target = Number(goal.target_amount) || 1;
              const percentage = Math.min((current / target) * 100, 100);
              
              return (
                <div key={goal.id} className="glass-card p-xl rounded-3xl border border-white/20 dark:border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm text-on-surface">{goal.name}</h3>
                      <p className="text-on-surface-variant text-label-sm">{goal.deadline ? `Target: ${new Date(goal.deadline).toLocaleDateString()}` : 'No deadline'}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error-container rounded-full"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  
                  <div className="mt-xl flex justify-between items-end mb-2">
                    <span className="font-headline-lg text-on-surface font-bold">${current.toFixed(2)}</span>
                    <span className="text-label-md text-on-surface-variant">of ${target.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full bg-surface-container-high rounded-full h-3 mb-6 overflow-hidden">
                    <div className="bg-secondary h-3 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  
                  <button 
                    onClick={() => setFundingGoal(goal)}
                    className="w-full py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">savings</span>
                    Add Funds
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}

      <GoalForm 
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSubmitGoal={handleSaveGoal}
      />
      
      <AddFundsForm 
        isOpen={!!fundingGoal}
        onClose={() => setFundingGoal(null)}
        onAddFunds={handleAddFunds}
        goalName={fundingGoal?.name}
      />
    </>
  );
};

export default Goals;
