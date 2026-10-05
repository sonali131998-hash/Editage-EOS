import React from 'react';
import { UserState } from '../types';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  ShieldCheck, 
  Receipt, 
  Grid, 
  MessageSquare, 
  Settings, 
  LogOut,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface SidebarProps {
  currentState: UserState;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenReEditingModal: () => void;
  onOpenQuote: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentState,
  activeTab,
  onSelectTab,
  onOpenReEditingModal,
  onOpenQuote,
}) => {
  const isReturningUser = currentState === 'STATE_C';
  const userName = isReturningUser ? 'Dr. Priya Verma' : 'Dr. Researcher';
  const userRole = isReturningUser ? 'Associate Professor' : 'Academic Author';
  const userDept = isReturningUser ? 'Molecular Biology' : 'Life Sciences';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'manuscripts', label: 'My Manuscripts', icon: FileText, badge: isReturningUser ? '2' : '1' },
    { id: 'orders', label: 'Orders & Files', icon: ShoppingBag, badge: isReturningUser ? '2' : undefined },
    { id: 'reediting', label: 'Free Re-Editing (365d)', icon: ShieldCheck, highlight: isReturningUser },
    { id: 'invoices', label: 'Invoices & Quotes', icon: Receipt },
    { id: 'services', label: 'Services Directory', icon: Grid },
    { id: 'advisor', label: 'Academic Advisor', icon: MessageSquare, status: 'Online' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      
      {/* Top Logo & Brand */}
      <div>
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0052CC] flex items-center justify-center font-bold text-white text-base shadow-xs">
              e
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans flex items-center">
                editage
                <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] ml-0.5 inline-block"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block -mt-0.5">
                Online System (EOS)
              </span>
            </div>
          </div>
        </div>

        {/* Primary Navigation Links */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Main Workspace
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'reediting' && isReturningUser) {
                    onOpenReEditingModal();
                  } else {
                    onSelectTab(item.id);
                  }
                }}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#0052CC] text-white shadow-xs'
                    : item.highlight
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 font-tabular'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {item.status && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{item.status}</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Re-editing Quick Banner for Dr. Verma */}
        {isReturningUser && (
          <div className="mx-3 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0052CC]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>365-Day Free Re-Editing</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1 leading-snug">
              Order #EDT-89421 valid for 356 more days. Submit revised drafts anytime.
            </p>
            <button
              type="button"
              onClick={onOpenReEditingModal}
              className="mt-2 text-[11px] font-bold text-[#0052CC] hover:underline flex items-center gap-1"
            >
              <span>Submit revision file</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-slate-100">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {isReturningUser ? (
              <img
                src={ASSETS.drVermaAvatar}
                alt={userName}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#0052CC] text-white flex items-center justify-center font-bold text-xs shrink-0">
                DR
              </div>
            )}
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {userName}
              </div>
              <div className="text-[10px] text-slate-500 truncate">
                {userDept}
              </div>
            </div>
          </div>

          <button
            type="button"
            title="Account Settings"
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
};
