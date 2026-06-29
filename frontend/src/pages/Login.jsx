import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-outline-variant/30 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-center font-headline-lg font-bold text-primary mb-2">Welcome Back</h2>
          <p className="text-center text-on-surface-variant font-body-md mb-8">Login to manage your expenses</p>

          {error && <div className="bg-error-container text-on-error-container p-3 rounded-xl mb-6 text-sm font-bold text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-label-md text-on-surface ml-1">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-md text-on-surface ml-1">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 brand-gradient text-white font-label-lg py-3 rounded-xl shadow-md hover:shadow-lg active:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-body-sm text-on-surface-variant mt-6">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
