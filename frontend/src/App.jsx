import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import Goals from './pages/Goals';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { NavLink } from 'react-router-dom';

const MainLayout = ({ children, toggleTheme, theme }) => (
  <div className="bg-background text-on-surface overflow-hidden">
    <div className="flex h-screen w-full relative">
      <Sidebar />
      
      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TopNavBar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-container-padding w-full h-16 bg-surface-container-lowest/70 dark:bg-background/50 backdrop-blur-md border-b border-outline-variant/10 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-lg w-1/3">
            <div className="relative w-full max-w-xs group hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-surface-container-low border border-transparent dark:border-white/5 rounded-full py-2 pl-10 pr-4 text-label-md focus:ring-2 focus:ring-primary/20 transition-all outline-none text-on-surface shadow-inner" placeholder="Search..." type="text"/>
            </div>
          </div>
          
          <div className="flex items-center justify-center w-1/3 md:hidden">
            <h2 className="font-headline-md text-headline-md font-extrabold text-primary">ExpensePro</h2>
          </div>
          
          <div className="flex items-center justify-end gap-md w-1/3">
            <button onClick={toggleTheme} className="p-2 text-on-surface-variant hover:text-primary transition-all active:opacity-80 md:hidden">
              <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:text-primary relative transition-all active:opacity-80 hidden sm:block">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full dark:shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            </button>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-lg custom-scrollbar">
          {children}
        </div>
      </main>
      
      {/* Mobile Navigation Shell (BottomNavBar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface-container-lowest/90 dark:bg-background/80 backdrop-blur-2xl border-t border-outline-variant/10 dark:border-white/5 flex items-center justify-around z-40 px-4 pb-4">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
          <span className="text-[10px] font-bold">Dash</span>
        </NavLink>
        <NavLink to="/budgets" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="text-[10px]">Budgets</span>
        </NavLink>
        <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center -translate-y-6 shadow-md border border-white/5 opacity-50">
           <span className="material-symbols-outlined text-3xl">add</span>
        </div>
        <NavLink to="/goals" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">stars</span>
          <span className="text-[10px]">Goals</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex flex-col items-center justify-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px]">Set</span>
        </NavLink>
      </nav>
      
    </div>
  </div>
);

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/login" element={<div className="bg-background text-on-surface min-h-screen"><Login /></div>} />
      <Route path="/register" element={<div className="bg-background text-on-surface min-h-screen"><Register /></div>} />
      <Route path="/*" element={
        <ProtectedRoute>
          <MainLayout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
