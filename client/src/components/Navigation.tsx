import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/integrations', label: 'Intégrations', icon: Settings },
  ];

  return (
    <nav className="bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">ImageDesign</h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
