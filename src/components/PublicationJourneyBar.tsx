import React, { useState } from 'react';
import { UserState, PublicationStage } from '../types';
import { Check, ArrowRight, Info, Sparkles, HelpCircle } from 'lucide-react';

interface PublicationJourneyBarProps {
  currentState: UserState;
  onViewRecommendations: () => void;
}

interface StageStep {
  id: PublicationStage;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  recommendedService: string;
}

export const PublicationJourneyBar: React.FC<PublicationJourneyBarProps> = ({
  currentState,
  onViewRecommendations,
}) => {
  const isReturningUser = currentState === 'STATE_C';
  const hasManuscript = currentState === 'STATE_B' || currentState === 'STATE_C';

  // Stages configuration based on user state
  const stages: StageStep[] = [
    {
      id: 'writing',
      label: 'Writing',
      status: 'completed',
      description: 'Drafting hypothesis, methods, data results, and discussion sections.',
      recommendedService: 'Authoring & Literature Discovery',
    },
    {
      id: 'preparation',
      label: 'Manuscript Prep',
      status: isReturningUser ? 'completed' : currentState === 'STATE_B' ? 'current' : 'upcoming',
      description: 'Language editing, scientific logic check, reference styling, and figure preparation.',
      recommendedService: 'Premium Scientific Editing',
    },
    {
      id: 'journal_selection',
      label: 'Journal Selection',
      status: isReturningUser ? 'current' : 'upcoming',
      description: 'Aligning manuscript scope with optimal impact factor, speed, and acceptance probability.',
      recommendedService: 'Journal Selection & Match Report',
    },
    {
      id: 'submission',
      label: 'Submission',
      status: 'upcoming',
      description: 'Formatting compliance, cover letter drafting, submission portal execution.',
      recommendedService: 'Journal Submission Support & Audit',
    },
    {
      id: 'revision',
      label: 'Revision',
      status: 'upcoming',
      description: 'Point-by-point response to reviewer comments and manuscript revisions.',
      recommendedService: 'Response to Reviewers & Free Re-editing',
    },
    {
      id: 'publication',
      label: 'Publication & Impact',
      status: 'upcoming',
      description: 'Final proofing, DOI release, graphical abstracts, and citation promotion.',
      recommendedService: 'Graphical Abstracts & Research Bites',
    },
  ];

  const currentStageObj = stages.find((s) => s.status === 'current') || stages[1];
  const [selectedStage, setSelectedStage] = useState<StageStep | null>(null);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-xs font-semibold text-[#0052CC] uppercase tracking-wider">
              End-to-End Publication Workflow
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Your Research Journey
            </h2>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span>Completed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC] inline-block" />
              <span>You Are Here</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
              <span>Upcoming</span>
            </span>
          </div>
        </div>

        {/* Horizontal Pipeline Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-4 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'current';

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStage(stage)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-blue-50/70 border-[#0052CC] ring-1 ring-[#0052CC] shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Step status header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Step 0{idx + 1}
                    </span>

                    {isCompleted ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : isCurrent ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide bg-[#0052CC] text-white">
                        YOU ARE HERE
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-semibold">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                    {stage.label}
                  </div>

                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Subtle service indication */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-600 font-medium truncate">
                    {stage.recommendedService}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic "NEXT BEST STEP" Callout Box */}
        <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#0052CC] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#0052CC] uppercase tracking-wider">
                Next Best Step For Your Manuscript
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {isReturningUser
                  ? 'Select target journals and audit submission compliance'
                  : 'Prepare your manuscript for peer review and journal submission'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {isReturningUser
                  ? 'Because your English editing is complete, avoiding desk rejection through journal scope alignment is your highest-yield priority.'
                  : 'Researchers at your stage see a 3.4× higher acceptance probability when scientific clarity and formatting are validated upfront.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onViewRecommendations}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>View recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
