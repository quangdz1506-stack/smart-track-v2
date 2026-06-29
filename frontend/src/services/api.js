const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = (headers = {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  return headers;
};

export const fetchTransactionsApi = async (filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const url = query ? `${API_BASE_URL}/transactions?${query}` : `${API_BASE_URL}/transactions`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in fetchTransactionsApi:', error);
    throw error;
  }
};

export const createTransactionApi = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: getAuthHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in createTransactionApi:', error);
    throw error;
  }
};

export const updateTransactionApi = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in updateTransactionApi:', error);
    throw error;
  }
};

export const deleteTransactionApi = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in deleteTransactionApi:', error);
    throw error;
  }
};

export const fetchBudgetsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in fetchBudgetsApi:', error);
    throw error;
  }
};

export const createBudgetApi = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in createBudgetApi:', error);
    throw error;
  }
};

export const deleteBudgetApi = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/budgets/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in deleteBudgetApi:', error);
    throw error;
  }
};

export const fetchGoalsApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/goals`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in fetchGoalsApi:', error);
    throw error;
  }
};

export const createGoalApi = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/goals`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in createGoalApi:', error);
    throw error;
  }
};

export const deleteGoalApi = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in deleteGoalApi:', error);
    throw error;
  }
};

export const addFundsGoalApi = async (id, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/goals/${id}/add-funds`, {
      method: 'PUT',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in addFundsGoalApi:', error);
    throw error;
  }
};

export const resetUserApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error in resetUserApi:', error);
    throw error;
  }
};
