

const DashboardSummary = ({ totalIncome, totalExpenses }) => {
  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--success-color)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Income</h3>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{formatCurrency(totalIncome)}</p>
      </div>

      <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--danger-color)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Total Expenses</h3>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{formatCurrency(totalExpenses)}</p>
      </div>

      <div style={{ flex: 1, minWidth: '200px', padding: '1.5rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--primary-color)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Current Balance</h3>
        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{formatCurrency(balance)}</p>
      </div>
    </div>
  );
};

export default DashboardSummary;
