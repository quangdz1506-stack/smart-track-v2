import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const DashboardSummary = ({ totalIncome, totalExpenses }) => {
  const balance = totalIncome - totalExpenses;
  const incomePercent = totalIncome > 0 ? (totalIncome / (totalIncome + totalExpenses)) * 100 : 0;
  const expensePercent = totalExpenses > 0 ? (totalExpenses / (totalIncome + totalExpenses)) * 100 : 0;
  const balancePercent = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const pieData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses },
  ];
  const COLORS = ['#34d399', '#ef4444']; // emerald-400 and red-500

  return (
    <div className="mb-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
        {/* Total Income */}
        <div className="glass-card p-lg rounded-2xl flex flex-col gap-md hover:bg-white/5 transition-all cursor-pointer group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>trending_up</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Total Income</p>
            <h3 className="text-headline-lg font-bold text-on-surface mt-1">{formatCurrency(totalIncome)}</h3>
          </div>
          <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-500" style={{width: `${Math.min(100, Math.max(0, incomePercent))}%`}}></div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="glass-card p-lg rounded-2xl flex flex-col gap-md hover:bg-white/5 transition-all cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-error/10 rounded-xl flex items-center justify-center text-error border border-error/20">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>trending_down</span>
            </div>
          </div>
          <div>
            <p className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Total Expenses</p>
            <h3 className="text-headline-lg font-bold text-on-surface mt-1">{formatCurrency(totalExpenses)}</h3>
          </div>
          <div className="h-1.5 w-full bg-error/10 rounded-full overflow-hidden">
            <div className="h-full bg-error shadow-[0_0_10px_rgba(239,68,68,0.5)] transition-all duration-500" style={{width: `${Math.min(100, Math.max(0, expensePercent))}%`}}></div>
          </div>
        </div>

        {/* Current Balance */}
        <div className="glass-card p-lg rounded-2xl flex flex-col gap-md hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
            </div>
            {balance > 0 && <span className="text-primary font-label-md bg-primary/10 px-2 py-1 rounded-lg">Healthy</span>}
          </div>
          <div>
            <p className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Current Balance</p>
            <h3 className="text-headline-lg font-bold text-on-surface mt-1">{formatCurrency(balance)}</h3>
          </div>
          <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full brand-gradient shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-500" style={{width: `${Math.min(100, Math.max(0, balancePercent))}%`}}></div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg mb-xl">
        <div className="glass-card p-lg rounded-2xl flex flex-col h-[400px]">
          <h4 className="font-headline-md text-on-surface mb-lg">Summary Bar</h4>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={pieData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="var(--color-on-surface-variant)" />
              <YAxis tickFormatter={(value) => `$${value}`} width={60} stroke="var(--color-on-surface-variant)" />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-lg rounded-2xl flex flex-col h-[400px]">
          <h4 className="font-headline-md text-on-surface mb-lg">Income vs Expenses</h4>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} stroke="none">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
