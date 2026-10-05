import React from 'react';
import { UserState, Manuscript } from '../types';
import { FileText, ShieldCheck, Clock, Award, CheckCircle2 } from 'lucide-react';

interface DashboardStatsBarProps {
  currentState: UserState;
  activeManuscript: Manuscript | null;
  onOpenReEditingModal: () => void;
  onJumpToOrders: () => void;
}

export const DashboardStatsBar: React.FC<DashboardStatsBarProps> = ({
  currentState,
  activeManuscript,
  onOpenReEditingModal,
  onJumpToOrders,
}) => {
  const isReturningUser = currentState === 'STATE_C';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
      
      {/* 1. Active Manuscript */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Active Workspace
          </span>
          <div className="text-xs font-bold text-slate-900 truncate">
            {activeManuscript ? activeManuscript.fileName : 'No Paper Loaded'}
          </div>
          <div className="text-[10px] text-slate-500 font-tabular truncate">
            {activeManuscript ? `${activeManuscript.wordCount.toLocaleString()} words · Ready` : 'Upload or pick stage below'}
          </div>
        </div>
      </div>

      {/* 2. Publication Stage */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Current Stage
          </span>
          <div className="text-xs font-bold text-slate-900 truncate">
            {isReturningUser ? 'Pre-Submission' : activeManuscript ? 'Manuscript Prep' : 'Intake Diagnostic'}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            {isReturningUser ? 'Ready for journal submission' : 'Stage 2 of 6 in workflow'}
          </div>
        </div>
      </div>

      {/* 3. 365-Day Free Re-Editing Benefit */}
      <div 
        onClick={isReturningUser ? onOpenReEditingModal : undefined}
        className={`bg-white p-2.5 sm:p-3 rounded-xl border shadow-2xs flex items-center gap-2.5 transition-colors ${
          isReturningUser ? 'border-emerald-300 hover:bg-emerald-50/40 cursor-pointer' : 'border-slate-200'
        }`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isReturningUser ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
        }`}>
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Re-Editing Status
          </span>
          <div className={`text-xs font-bold truncate ${isReturningUser ? 'text-emerald-700' : 'text-slate-800'}`}>
            {isReturningUser ? 'Active (356 Days)' : '365d Guarantee'}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            {isReturningUser ? 'Order #EDT-89421 · Click to use' : 'Included with all premium orders'}
          </div>
        </div>
      </div>

      {/* 4. Orders & Invoices */}
      <div 
        onClick={onJumpToOrders}
        className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-2.5 hover:bg-slate-50/60 cursor-pointer transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Orders Archive
          </span>
          <div className="text-xs font-bold text-slate-900 truncate font-tabular">
            {isReturningUser ? '2 Active / Delivered' : '0 Active Orders'}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            {isReturningUser ? '1 In Progress · 1 Delivered' : 'Invoices & deliverables portal'}
          </div>
        </div>
      </div>

    </div>
  );
};
