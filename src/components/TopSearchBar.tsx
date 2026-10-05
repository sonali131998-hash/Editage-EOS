import React from 'react';
import { UserState } from '../types';
import { 
  Bell, 
  Sparkles, 
  PlusCircle, 
  ArrowRightLeft,
  ShieldCheck
} from 'lucide-react';

interface TopSearchBarProps {
  currentState: UserState;
  onSelectState: (state: UserState) => void;
  onSelectService: (serviceName: string) => void;
  onOpenQuickQuote: () => void;
  onOpenComparison: () => void;
}

export const TopSearchBar: React.FC<TopSearchBarProps> = ({
  currentState,
  onSelectState,
  onSelectService,
  onOpenQuickQuote,
  onOpenComparison,
}) => {
  const isReturningUser = currentState === 'STATE_C';

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-semibold text-slate-500">Editage Online System</span>
        <span className="text-slate-300">/</span>
        <span className="font-bold text-slate-900">Researcher Dashboard</span>
      </div>

      {/* Right side: Persona Switcher (Leadership Demo) & Quick Quote */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Leadership Comparison Button */}
        <button
          onClick={onOpenComparison}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#0052CC]" />
          <span>Compare Experience</span>
        </button>

        {/* Compact Persona Pill Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
          <button
            onClick={() => onSelectState('STATE_A')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentState === 'STATE_A' ? 'bg-[#0052CC] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State A: Clean
          </button>
          <button
            onClick={() => onSelectState('STATE_B')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentState === 'STATE_B' ? 'bg-[#0052CC] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State B: Uploaded
          </button>
          <button
            onClick={() => onSelectState('STATE_C')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
              currentState === 'STATE_C' ? 'bg-[#0052CC] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State C: Dr. Verma
          </button>
        </div>

        {/* Instant Quote CTA */}
        <button
          onClick={onOpenQuickQuote}
          className="px-3.5 py-1.5 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap"
        >
          + Instant Quote
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          {isReturningUser && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E53E3E] rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>

    </header>
  );
};
