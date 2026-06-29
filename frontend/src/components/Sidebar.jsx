import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col h-full p-md gap-lg bg-surface-container-lowest border-r border-outline-variant/30 dark:border-white/5 w-64 backdrop-blur-xl bg-opacity-70 dark:bg-surface-container-lowest/30 shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="px-md py-lg">
        <h1 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
            <defs>
              <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path d="M6 22V18C6 16.8954 6.89543 16 8 16H10C11.1046 16 12 16.8954 12 18V22" stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 22V12C14 10.8954 14.8954 10 16 10H18C19.1046 10 20 10.8954 20 12V22" stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 22V6C22 4.89543 22.8954 4 24 4H26C27.1046 4 28 4.89543 28 6V22" stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 28H28" stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 10L26 6L30 10" stroke="url(#brandGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          ExpensePro
        </h1>
        <p className="text-on-surface-variant text-label-sm mt-1">Effortless Precision</p>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-md px-md py-sm rounded-xl font-bold transition-all duration-200 border ${isActive ? 'text-primary bg-secondary-fixed/20 dark:bg-primary/10 border-transparent dark:border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high/50 dark:hover:text-on-surface dark:hover:bg-white/5 border-transparent active:scale-95'}`}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-body-md">Dashboard</span>
        </NavLink>
        <NavLink to="/budgets" className={({ isActive }) => `flex items-center gap-md px-md py-sm rounded-xl font-bold transition-all duration-200 border ${isActive ? 'text-primary bg-secondary-fixed/20 dark:bg-primary/10 border-transparent dark:border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high/50 dark:hover:text-on-surface dark:hover:bg-white/5 border-transparent active:scale-95'}`}>
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-body-md">Budgets</span>
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => `flex items-center gap-md px-md py-sm rounded-xl font-bold transition-all duration-200 border ${isActive ? 'text-primary bg-secondary-fixed/20 dark:bg-primary/10 border-transparent dark:border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high/50 dark:hover:text-on-surface dark:hover:bg-white/5 border-transparent active:scale-95'}`}>
          <span className="material-symbols-outlined">stars</span>
          <span className="font-body-md">Goals</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-md px-md py-sm rounded-xl font-bold transition-all duration-200 border ${isActive ? 'text-primary bg-secondary-fixed/20 dark:bg-primary/10 border-transparent dark:border-primary/20' : 'text-on-surface-variant hover:bg-surface-container-high/50 dark:hover:text-on-surface dark:hover:bg-white/5 border-transparent active:scale-95'}`}>
          <span className="material-symbols-outlined">settings</span>
          <span className="font-body-md">Settings</span>
        </NavLink>
      </nav>
      <div className="mt-auto p-md flex items-center gap-md border-t border-outline-variant/20 dark:border-white/5 pt-lg">
        <img alt="Alex Mercer" className="w-10 h-10 rounded-full border-2 border-white dark:border-primary/20 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3k3qk6Jth4KAkjJgKxl3Hmby7N6YK9JWUF2CsqoJ-uyU6qFk97AkVyKQJG2dfZYxfDqHciwLk8wLXfu4K1-1bP3Wz1fUiP6RNPNt3mqJqa5sx3xVGMEn6_8czvW9TC81aPSAK6uBBN_gQWV4kXclUQnNZoh_Z-4ceIPUPVNmW4ZIL5un5v2luv9F5lylPp2mrKFby8j5zU_Hce6Q8FNRNWPnDHW5GKvniMDUmvQyQs3TjBHpX1Ayey_-kV-MDulRCxTVy4mitlVc"/>
        <div className="flex flex-col">
          <span className="font-label-md text-on-surface">Alex Mercer</span>
          <span className="text-xs text-on-surface-variant dark:text-primary dark:font-bold dark:uppercase tracking-tighter">Premium Plan</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
