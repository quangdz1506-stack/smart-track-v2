import React, { useEffect, useState } from 'react';
import DashboardSummary from '../components/DashboardSummary';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { fetchTransactionsApi, createTransactionApi, deleteTransactionApi, updateTransactionApi } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactionsApi();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError('Failed to connect to the server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);

  const handleSaveTransaction = async (formData) => {
    try {
      setError(null);
      if (editingTransaction) {
        await updateTransactionApi(editingTransaction.id, formData);
        setEditingTransaction(null);
      } else {
        await createTransactionApi(formData);
      }
      setIsModalOpen(false);
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError(editingTransaction ? 'Failed to update transaction.' : 'Failed to add transaction.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      setError(null);
      await deleteTransactionApi(id);
      if (editingTransaction && editingTransaction.id === id) {
        setEditingTransaction(null);
        setIsModalOpen(false);
      }
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction.');
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Dashboard Overview</h2>
          <p className="text-on-surface-variant font-body-md mt-1">Welcome back, Alex. Your finances are looking healthy this month.</p>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center gap-1 px-4 py-2 bg-surface-container-lowest dark:bg-surface-container/50 rounded-xl font-label-md text-on-surface shadow-sm border border-outline-variant/30 dark:border-white/10 hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            This Month
          </button>
          <button onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }} className="flex items-center gap-1 px-4 py-2 brand-gradient text-white rounded-xl font-label-md shadow-sm dark:shadow-lg dark:glow-primary hover:shadow-md active:opacity-90 transition-all md:hidden">
            <span className="material-symbols-outlined text-[18px]">add</span> Add
          </button>
          <button onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }} className="hidden md:flex items-center gap-1 px-4 py-2 brand-gradient text-white rounded-xl font-label-md shadow-sm dark:shadow-lg dark:glow-primary hover:shadow-md active:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[18px]">add</span> Add Entry
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-lg text-center font-bold">
          {error}
        </div>
      )}

      {loading && transactions.length === 0 ? (
        <div className="text-center py-xl text-on-surface-variant">Loading transactions...</div>
      ) : (
        <>
          <DashboardSummary 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
          />

          <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction} 
            onEdit={handleEditTransaction}
          />
        </>
      )}

      <TransactionForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitTransaction={handleSaveTransaction}
        editingTransaction={editingTransaction}
        onCancelEdit={handleCancelEdit}
      />
    </>
  );
};

export default Dashboard;
