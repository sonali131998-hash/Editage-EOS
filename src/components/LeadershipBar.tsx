import React from 'react';
import { UserState } from '../types';
import { Sparkles, ArrowRightLeft, Layers, UserCheck, FileText, CheckCircle2, HelpCircle } from 'lucide-react';

interface LeadershipBarProps {
  currentState: UserState;
  onSelectState: (state: UserState) => void;
  onOpenComparison: () => void;
  onToggleStrategyNotes: () => void;
  showStrategyNotes: boolean;
}

export const LeadershipBar: React.FC<LeadershipBarProps> = ({
  currentState,
  onSelectState,
  onOpenComparison,
  onToggleStrategyNotes,
  showStrategyNotes,
}) => {
  return (
    <aside aria-label="UX Prototype Controls" className="bg-[#0B1528] text-slate-200 border-b border-slate-800 text-xs px-4 py-2.5 transition-all shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Project & Context Info */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-semibold text-white tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-wider text-[11px] text-slate-300">EOS UX Redesign</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 hidden sm:inline">
            Personalized Research Journey Prototype
          </span>
        </div>

        {/* Center: State Switcher */}
        <div className="flex items-center gap-1 bg-[#132238] p-1 rounded-lg border border-slate-700/60">
          <span className="text-[11px] text-slate-400 font-medium px-2 py-1">View Persona:</span>
          
          <button
            onClick={() => onSelectState('STATE_A')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentState === 'STATE_A'
                ? 'bg-[#0052CC] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="State A: Clean slate new user before uploading manuscript"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>State A: New User (Clean)</span>
          </button>

          <button
            onClick={() => onSelectState('STATE_B')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentState === 'STATE_B'
                ? 'bg-[#0052CC] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="State B: New user after manuscript upload & conversational assessment"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>State B: Uploaded & Assessed</span>
          </button>

          <button
            onClick={() => onSelectState('STATE_C')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentState === 'STATE_C'
                ? 'bg-[#0052CC] text-white shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
            title="State C: Dr. Priya Verma (Returning customer with previous English editing order)"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>State C: Dr. Verma (Returning)</span>
          </button>
        </div>

        {/* Right: Leadership Comparison & Strategy Notes */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenComparison}
            className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Current vs. New Experience</span>
          </button>

          <button
            onClick={onToggleStrategyNotes}
            className={`px-3 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all border ${
              showStrategyNotes
                ? 'bg-indigo-600/30 text-indigo-200 border-indigo-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>UX Rationale {showStrategyNotes ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {/* Expandable UX Strategy Notes for Leadership */}
      {showStrategyNotes && (
        <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-3 text-slate-300 text-[11px] leading-relaxed">
          <div className="bg-[#111C2E] p-2.5 rounded border border-slate-800">
            <div className="font-semibold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              1. First Meaningful Action
            </div>
            <p className="text-slate-400">
              Replaces the passive service catalog with a bold, action-oriented manuscript intake above the fold, lifting initial user commitment.
            </p>
          </div>

          <div className="bg-[#111C2E] p-2.5 rounded border border-slate-800">
            <div className="font-semibold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              2. Progressive Profiling
            </div>
            <p className="text-slate-400">
              Replaces daunting intake forms with a 4-step conversational assessment. Users feel diagnosed, not interrogated.
            </p>
          </div>

          <div className="bg-[#111C2E] p-2.5 rounded border border-slate-800">
            <div className="font-semibold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              3. Transparent "Why" Rationale
            </div>
            <p className="text-slate-400">
              Every recommended service explicitly states why it was matched (e.g. stage, goals, journal type), driving higher quote starts.
            </p>
          </div>

          <div className="bg-[#111C2E] p-2.5 rounded border border-slate-800">
            <div className="font-semibold text-white mb-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              4. Returning User Intelligence
            </div>
            <p className="text-slate-400">
              Acknowledges previously completed English Editing and presents logical downstream services (Journal Selection, Formatting, Art).
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
