import React, { useState } from 'react';
import { UserState } from '../types';
import { Bell, ChevronDown, PlusCircle, HelpCircle } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  currentState: UserState;
  onOpenEnquiry: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentState,
  onOpenEnquiry,
  onNavigateSection,
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isReturningUser = currentState === 'STATE_C';
  const userName = isReturningUser ? 'Dr. Priya Verma' : 'Dr. Researcher';
  const userInstitution = isReturningUser ? 'Dept. of Molecular Biology' : 'Academic Researcher';

  const navLinks = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Orders', id: 'orders' },
    { name: 'Re-Editing', id: 're-editing' },
    { name: 'Payments', id: 'payments' },
    { name: 'Services', id: 'services' },
    { name: 'Editage Plus', id: 'plus' },
  ];

  const handleNavClick = (name: string, id: string) => {
    setActiveNav(name);
    if (id === 'orders') {
      const el = document.getElementById('orders-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'services') {
      const el = document.getElementById('explore-services-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onNavigateSection) {
      onNavigateSection(id);
    }
  };

  return (
    <header className="bg-[#071322] border-b border-slate-800/80 sticky top-0 z-40 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Editage Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
          >
            {/* Authentic Editage logo icon mark */}
            <div className="w-8 h-8 rounded bg-[#0052CC] flex items-center justify-center font-bold text-lg text-white shadow-xs group-hover:bg-[#0047B3] transition-colors">
              e
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-sans flex items-center">
                editage
                <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] ml-0.5 inline-block"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                Online System
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.name, item.id)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap text-xs xl:text-sm font-medium ${
                activeNav === item.name
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Actions & User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Submit Enquiry CTA */}
          <button
            onClick={onOpenEnquiry}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-all shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Submit Enquiry</span>
          </button>

          {/* Notifications */}
          <button
            aria-label="Notifications"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-colors"
          >
            <Bell className="w-4 h-4" />
            {isReturningUser && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E53E3E] rounded-full ring-2 ring-[#071322]" />
            )}
          </button>

          {/* User Profile avatar */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
            >
              {isReturningUser ? (
                <img
                  src={ASSETS.drVermaAvatar}
                  alt={userName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0052CC]/50"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-white ${isReturningUser ? 'hidden' : ''}`}>
                {isReturningUser ? 'PV' : 'DR'}
              </div>

              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-white leading-tight">
                  {userName}
                </span>
                <span className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">
                  {userInstitution}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {/* Quick dropdown menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 text-xs z-50">
                <div className="px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <p className="font-semibold text-slate-900">{userName}</p>
                  <p className="text-slate-500 text-[11px] truncate">{userInstitution}</p>
                  <p className="text-[10px] text-[#0052CC] mt-0.5 font-medium">EOS Account #8491-09</p>
                </div>
                <a
                  href="#profile"
                  onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  Researcher Profile & Preferences
                </a>
                <a
                  href="#orders"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUserMenu(false);
                    document.getElementById('orders-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  Order History & Invoices
                </a>
                <a
                  href="#reediting"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUserMenu(false);
                    document.getElementById('reediting-banner')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
                >
                  365-Day Free Re-Editing Center
                </a>
                <div className="border-t border-slate-100 my-1" />
                <a
                  href="#signout"
                  onClick={(e) => { e.preventDefault(); setShowUserMenu(false); }}
                  className="block px-4 py-2 text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
