import React from 'react';
import { X, ArrowRight, CheckCircle2, XCircle, AlertTriangle, Sparkles, TrendingUp, Layers, UploadCloud } from 'lucide-react';

interface CurrentVsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchState: (state: 'STATE_A' | 'STATE_B' | 'STATE_C') => void;
}

export const CurrentVsNewModal: React.FC<CurrentVsNewModalProps> = ({
  isOpen,
  onClose,
  onSwitchState,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#071322] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
              Leadership UX Evaluation: Current vs. Redesigned EOS Dashboard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CURRENT EXPERIENCE (BEFORE) */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-rose-100 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    <span>Current Service-Led EOS</span>
                  </span>
                  <span className="text-[11px] text-rose-600 font-semibold bg-rose-100 px-2 py-0.5 rounded">
                    High Drop-Off
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-lg border border-rose-100">
                    <div className="font-bold text-slate-900 mb-1">1. User Logs In</div>
                    <p className="text-slate-600">Welcomes user with a generic greeting and immediate catalog grid of 16+ services.</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-rose-100">
                    <div className="font-bold text-slate-900 mb-1">2. Severe Cognitive Overload</div>
                    <p className="text-slate-600">Researcher must diagnose their own needs: "Do I need Advanced or Premium Editing? What about formatting?"</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-rose-100">
                    <div className="font-bold text-slate-900 mb-1">3. Passive Browsing Behavior</div>
                    <p className="text-slate-600">Feels like an e-commerce commodity shop. No encouragement to upload a manuscript first.</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-rose-100">
                    <div className="font-bold text-slate-900 mb-1">4. Blind Cross-Selling</div>
                    <p className="text-slate-600">Repeats the same editing services to returning users even if their paper is already edited.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-rose-200/80 text-[11px] text-rose-800 font-medium">
                Average Funnel Friction: 4.8 min to initiate quote · High cart abandonment.
              </div>
            </div>

            {/* NEW EXPERIENCE (AFTER) */}
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/30 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Redesigned Research Journey EOS</span>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                    High Conversion
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                    <div className="font-bold text-slate-900 mb-1 text-[#0052CC]">1. First Meaningful Action</div>
                    <p className="text-slate-600">Upload manuscript is the dominant above-the-fold visual anchor. Immediate researcher engagement.</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                    <div className="font-bold text-slate-900 mb-1 text-[#0052CC]">2. 4-Question Progressive Diagnostic</div>
                    <p className="text-slate-600">Short conversational assessment captures publication stage, budget tier, and priority goals.</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                    <div className="font-bold text-slate-900 mb-1 text-[#0052CC]">3. Explicit "Why" Recommendation</div>
                    <p className="text-slate-600">1 best match + 3 sequenced downstream steps. Explains exact logic, mitigating choice paralysis.</p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                    <div className="font-bold text-slate-900 mb-1 text-[#0052CC]">4. Context-Aware Returning Persona</div>
                    <p className="text-slate-600">Acknowledges previous English editing; guides Dr. Verma into Journal Selection & Readiness checks.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-emerald-200/80 text-[11px] text-emerald-800 font-medium">
                Anticipated Outcome: +48% manuscript uploads · +35% add-on service adoption.
              </div>
            </div>

          </div>

          {/* Quick interactive test links */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-700 font-medium">
              Test each persona live in this prototype:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onSwitchState('STATE_A');
                  onClose();
                }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-semibold text-slate-800"
              >
                State A (Clean)
              </button>
              <button
                onClick={() => {
                  onSwitchState('STATE_B');
                  onClose();
                }}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded font-semibold text-slate-800"
              >
                State B (Assessed)
              </button>
              <button
                onClick={() => {
                  onSwitchState('STATE_C');
                  onClose();
                }}
                className="px-3 py-1.5 bg-[#0052CC] hover:bg-[#0047B3] text-white rounded font-semibold"
              >
                State C (Dr. Verma)
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
