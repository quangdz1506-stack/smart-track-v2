import React, { useEffect, useState } from 'react';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGoals = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/goals');
        if (!response.ok) throw new Error('Failed to fetch goals');
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        console.error(err);
        setError('Failed to connect to backend.');
      } finally {
        setLoading(false);
      }
    };
    
    loadGoals();
  }, []);

  return (
    <>
      <div className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Financial Goals</h2>
        <p className="text-on-surface-variant font-body-md mt-1">Track your progress towards big purchases and savings.</p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-lg text-center font-bold">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-xl text-on-surface-variant">Loading goals...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {goals.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-surface-container-low rounded-3xl border border-outline-variant/30">
              <p className="text-on-surface-variant">No goals configured yet. (Add Goal Feature Coming Soon)</p>
            </div>
          ) : (
            goals.map(goal => (
              <div key={goal.id} className="glass-card p-lg rounded-3xl border border-white/20 dark:border-white/5 relative overflow-hidden flex flex-col items-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 rounded-full border-4 border-surface-container flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                  <span className="font-headline-sm text-primary font-bold">
                    {Math.round((goal.current_amount / goal.target_amount) * 100)}%
                  </span>
                </div>
                
                <h3 className="font-headline-md text-on-surface text-center mb-1">{goal.name}</h3>
                
                <div className="w-full mt-4 bg-surface-container-low rounded-xl p-3 flex justify-between items-center">
                  <span className="text-label-md text-on-surface-variant">Saved:</span>
                  <span className="font-bold text-on-surface">${Number(goal.current_amount).toFixed(2)} / ${Number(goal.target_amount).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Goals;
