import React from 'react';
import { X, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, BookOpen, Award, ArrowRight } from 'lucide-react';

interface WhyRecommendedModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  onProceedToQuote: () => void;
}

export const WhyRecommendedModal: React.FC<WhyRecommendedModalProps> = ({
  isOpen,
  onClose,
  serviceId = 'premium_editing',
  onProceedToQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Recommendation Intelligence Diagnostic
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Diagnostic Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#0052CC] mb-2 uppercase tracking-wide">
              <span>98% Editorial Match Score</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Why We Specifically Recommend Premium Scientific Editing
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              We evaluated your responses: complete manuscript, targeting peer-reviewed publication, and requiring both language and scientific structure validation. Here is why this tier is the optimal match:
            </p>
          </div>

          {/* Rationale Pillars */}
          <div className="space-y-4">
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    1. Overcoming the "Desk Rejection" Barrier
                  </h5>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Over 68% of initial journal rejections stem from ambiguous phrasing, weak scientific argumentation, or missing structural flow—not pure technical errors. Standard proofreading only corrects grammar; Premium Editing reconstructs your arguments to meet rigorous journal expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#0052CC] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    2. Two-Round PhD Subject-Specialist Review
                  </h5>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Your paper will be assigned to a native-English editor with a doctoral degree in your exact field, followed by a Senior Managing Editor review. This dual-layer peer critique mirrors the intensity of top journal reviewer panels.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    3. 365 Days of Unlimited Free Re-Editing
                  </h5>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Peer review rarely ends at submission. When peer reviewers request revisions or text modifications, our editors will re-edit your updated text at zero additional charge for an entire calendar year.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quantified Benefit Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#0052CC] uppercase tracking-wider">
                Historical Acceptance Impact
              </div>
              <p className="text-xs text-slate-700 mt-0.5">
                Manuscripts edited under our Premium tier experience <strong>3.4× higher acceptance probability</strong> across high-impact journals.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-[#0052CC] font-tabular">
                +340%
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                Peer Review Success
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close diagnostic
          </button>

          <button
            onClick={() => {
              onClose();
              onProceedToQuote();
            }}
            className="px-5 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
          >
            <span>Proceed to quote calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
