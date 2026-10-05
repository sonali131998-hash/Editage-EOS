import React from 'react';
import { UserState } from '../types';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Plus
} from 'lucide-react';

interface RecommendationResultProps {
  currentState: UserState;
  selectedStage: string;
  selectedHelp: string;
  wordCount: number;
  speed: 'standard' | 'express' | 'urgent';
  addons: {
    formatting: boolean;
    journalSelection: boolean;
    graphicalAbstract: boolean;
    similarityCheck: boolean;
  };
  onToggleAddon: (key: 'formatting' | 'journalSelection' | 'graphicalAbstract' | 'similarityCheck') => void;
  onOpenQuote: (serviceId: string) => void;
  onOpenWhyRecommended: (serviceId: string) => void;
}

export const RecommendationResult: React.FC<RecommendationResultProps> = ({
  currentState,
  selectedStage,
  selectedHelp,
  wordCount,
  speed,
  addons,
  onToggleAddon,
  onOpenQuote,
  onOpenWhyRecommended,
}) => {
  const isReturningUser = currentState === 'STATE_C';

  // Dynamic service matching logic
  const isPreSubmissionOrJournal = selectedStage === 'presubmission' || selectedHelp === 'Journal Selection' || isReturningUser;
  
  const primaryTitle = isPreSubmissionOrJournal
    ? 'Journal Selection & Submission Readiness'
    : 'Premium Scientific Editing';

  const primarySubtitle = isPreSubmissionOrJournal
    ? 'Comprehensive target journal shortlist with acceptance probabilities, compliance check & submission audit'
    : 'Thorough two-round scientific review by two PhD native-speaker editors in your exact research discipline';

  const baseRate = isPreSubmissionOrJournal ? 0.022 : 0.026;
  const speedMultipliers = { standard: 1.0, express: 1.25, urgent: 1.5 };
  const basePrice = Math.round(wordCount * baseRate * speedMultipliers[speed]);

  const formattingPrice = addons.formatting ? 85 : 0;
  const journalPrice = addons.journalSelection ? 160 : 0;
  const abstractPrice = addons.graphicalAbstract ? 220 : 0;
  const similarityPrice = addons.similarityCheck ? 45 : 0;

  const totalPrice = basePrice + formattingPrice + (isPreSubmissionOrJournal ? 0 : journalPrice) + abstractPrice + similarityPrice;

  const deliveryDays = speed === 'urgent' ? '24–48 hours' : speed === 'express' ? '3 business days' : '5 business days';

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden mb-3">
      
      {/* Header */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#0052CC]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Personalized Service Recommendation & Suggested Add-ons
          </h3>
        </div>

        <button
          onClick={() => onOpenWhyRecommended(isPreSubmissionOrJournal ? 'journal_selection' : 'premium_editing')}
          className="text-[11px] text-[#0052CC] hover:underline font-semibold flex items-center gap-1"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Why this was recommended for your paper</span>
        </button>
      </div>

      <div className="p-3.5 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        
        {/* Primary Matched Card (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border-2 border-[#0052CC]/60 bg-gradient-to-br from-blue-50/40 via-white to-slate-50/40 p-3.5 sm:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0052CC] text-white">
                BEST MATCH FOR YOUR GOAL
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Est. Turnaround: {deliveryDays}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {primaryTitle}
            </h4>

            <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
              {primarySubtitle}
            </p>

            {/* Why it matches */}
            <div className="mt-2.5 p-2 rounded-lg bg-white border border-slate-200 text-xs space-y-0.5">
              <div className="font-bold text-slate-800 text-[10px] uppercase tracking-wide flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Matched to your answers:</span>
              </div>
              <p className="text-[11px] text-slate-600">
                {isReturningUser
                  ? 'Your previous English Editing order is complete. This next step prevents desk rejection by aligning with active journal scopes.'
                  : `Matched for ${selectedHelp} at ${selectedStage.replace('_', ' ')} stage with ${wordCount.toLocaleString()} words.`}
              </p>
            </div>

            {/* Key Deliverables */}
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>2 PhD subject specialists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>365-day free re-editing included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Scientific clarity & critique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cover letter addressed to editor</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
            <span className="text-slate-500">Core Package Base:</span>
            <span className="text-sm font-bold text-slate-900 font-tabular">${basePrice} USD</span>
          </div>
        </div>

        {/* Suggested Add-ons (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Suggested Add-ons:
              </span>
              <span className="text-[10px] text-slate-500">Recommended at this stage</span>
            </div>

            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => onToggleAddon('formatting')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  addons.formatting ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                    addons.formatting ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                  }`}>
                    {addons.formatting && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 block text-xs">Target Journal Formatting</span>
                    <span className="text-[10px] text-slate-500">Conform references to author guidelines</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 font-tabular text-xs">+$85</span>
              </button>

              {!isPreSubmissionOrJournal && (
                <button
                  type="button"
                  onClick={() => onToggleAddon('journalSelection')}
                  className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                    addons.journalSelection ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      addons.journalSelection ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                    }`}>
                      {addons.journalSelection && <Check className="w-2.5 h-2.5" />}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-800 block text-xs">Journal Selection Report</span>
                      <span className="text-[10px] text-slate-500">Shortlist 3–5 matched Q1/Q2 journals</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 font-tabular text-xs">+$160</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onToggleAddon('graphicalAbstract')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  addons.graphicalAbstract ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                    addons.graphicalAbstract ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                  }`}>
                    {addons.graphicalAbstract && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 block text-xs">Scientific Graphical Abstract</span>
                    <span className="text-[10px] text-slate-500">Custom TOC figure by PhD medical artist</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 font-tabular text-xs">+$220</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleAddon('similarityCheck')}
                className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                  addons.similarityCheck ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                    addons.similarityCheck ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                  }`}>
                    {addons.similarityCheck && <Check className="w-2.5 h-2.5" />}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 block text-xs">iThenticate Similarity Check</span>
                    <span className="text-[10px] text-slate-500">Official plagiarism diagnostic score</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 font-tabular text-xs">+$45</span>
              </button>
            </div>
          </div>

          {/* Total & Action */}
          <div className="mt-3 pt-2.5 border-t border-slate-200">
            <div className="flex items-baseline justify-between mb-2 font-tabular">
              <span className="text-xs font-semibold text-slate-600">Total Configured Price:</span>
              <span className="text-lg font-extrabold text-[#0052CC]">${totalPrice} USD</span>
            </div>

            <button
              type="button"
              onClick={() => onOpenQuote(isPreSubmissionOrJournal ? 'journal_selection' : 'premium_editing')}
              className="w-full py-2 px-3 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Get Instant Quote & Proceed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
