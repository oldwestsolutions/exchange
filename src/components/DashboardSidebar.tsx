/**
 * Dashboard sidebar navigation component
 */

import React from 'react';
import { LayoutDashboard, TrendingUp, Eye, User } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sidebarItems: SidebarItem[] = [
  { id: 'portfolio', label: 'Portfolio', icon: <LayoutDashboard size={20} /> },
  { id: 'markets', label: 'Markets', icon: <TrendingUp size={20} /> },
  { id: 'watchlist', label: 'Watchlist', icon: <Eye size={20} /> },
  { id: 'account', label: 'Account', icon: <User size={20} /> }
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:block">
      <div className="p-6">
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

