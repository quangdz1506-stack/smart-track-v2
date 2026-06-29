import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Settings</h2>
        <p className="text-on-surface-variant font-body-md mt-1">Manage your app preferences and account details.</p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-lg">
        {/* Appearance Settings */}
        <div className="glass-card p-xl rounded-3xl border border-white/20 dark:border-white/5">
          <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">palette</span>
            Appearance
          </h3>
          
          <div className="flex items-center justify-between py-4 border-b border-outline-variant/20 dark:border-white/5">
            <div>
              <p className="font-bold text-on-surface">Dark Mode</p>
              <p className="text-label-sm text-on-surface-variant">Switch between light and dark themes</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-primary' : 'bg-surface-container-high'}`}
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="glass-card p-xl rounded-3xl border border-white/20 dark:border-white/5">
          <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">person</span>
            Account Preferences
          </h3>
          
          <div className="flex items-center justify-between py-4 border-b border-outline-variant/20 dark:border-white/5">
            <div>
              <p className="font-bold text-on-surface">Currency</p>
              <p className="text-label-sm text-on-surface-variant">Default currency for transactions</p>
            </div>
            <select className="bg-surface-container-low border border-outline-variant/30 dark:border-white/10 rounded-xl px-4 py-2 text-on-surface outline-none focus:border-primary">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="VND">VND (₫)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-bold text-error">Danger Zone</p>
              <p className="text-label-sm text-on-surface-variant">Permanently delete all your data</p>
            </div>
            <button className="px-4 py-2 bg-error/10 text-error rounded-xl font-bold hover:bg-error hover:text-white transition-colors">
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
