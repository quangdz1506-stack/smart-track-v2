import { useEffect, useState } from 'react';
import './App.css';
import { useTheme } from './context/ThemeContext';
import DashboardSummary from './components/DashboardSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { fetchTransactionsApi, createTransactionApi, deleteTransactionApi, updateTransactionApi } from './services/api';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      }
      await loadTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction.');
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>Smart Expense Tracker</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your finances smartly.</p>
        </div>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--surface-color)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>
      
      {error && (
        <div style={{ padding: '1rem', background: 'var(--danger-color)', color: 'white', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {loading && transactions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading transactions...</div>
      ) : (
        <>
          <DashboardSummary 
            totalIncome={totalIncome} 
            totalExpenses={totalExpenses} 
          />

          <TransactionForm 
            onSubmitTransaction={handleSaveTransaction} 
            editingTransaction={editingTransaction}
            onCancelEdit={handleCancelEdit}
          />

          <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction} 
            onEdit={handleEditTransaction}
          />
        </>
      )}
    </div>
  );
}

export default App;
