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
