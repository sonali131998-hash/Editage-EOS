import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, BookOpen, FileCheck, Layers, Image as ImageIcon } from 'lucide-react';

interface ReturningUserSectionProps {
  onOpenQuote: (serviceId: string) => void;
  onRequestReEditing: () => void;
}

export const ReturningUserSection: React.FC<ReturningUserSectionProps> = ({
  onOpenQuote,
  onRequestReEditing,
}) => {
  const completedMilestone = {
    title: 'Advanced English Editing',
    paper: 'CRISPR_microbiome_dynamics_v3.docx',
    completedDate: '21 Sep 2026',
    wordCount: '12,482 words',
  };

  const nextSteps = [
    {
      id: 'journal_selection',
      icon: BookOpen,
      title: 'Journal Selection',
      tag: 'LOGICAL NEXT STEP',
      description: 'Find top-tier journals whose immediate scope and acceptance trends match your CRISPR findings.',
      outcome: 'Mitigates scope mismatch and speeds peer review',
    },
    {
      id: 'submission_readiness',
      icon: FileCheck,
      title: 'Submission Readiness Check',
      tag: 'PRE-SUBMISSION AUDIT',
      description: 'Audit adherence to data availability, ethical approvals, and technical reporting checklists.',
      outcome: 'Prevents immediate return without review',
    },
    {
      id: 'manuscript_formatting',
      icon: Layers,
      title: 'Journal-Specific Formatting',
      tag: 'GUIDELINES COMPLIANCE',
      description: 'Tailor text typography, tables, and citation style to Cell Host & Microbe instructions.',
      outcome: 'Zero formatting friction upon submission',
    },
    {
      id: 'graphical_abstract',
      icon: ImageIcon,
      title: 'Table of Contents Graphical Abstract',
      tag: 'POST-ACCEPTANCE IMPACT',
      description: 'Complement your Figure 4 schematic with an eye-catching visual overview for journal promotion.',
      outcome: 'Increases reader citations and engagement',
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Re-editing benefit banner */}
        <div id="reediting-banner" className="mb-8 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/50 border border-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Active Benefit
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-600">Order #EDT-89421</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                365-Day Free Re-Editing Benefit is Active
              </h3>
              <p className="text-xs text-slate-600">
                You have unlimited free re-editing for <em>CRISPR_microbiome_dynamics_v3.docx</em> until <strong>21 Sep 2027</strong> (356 days remaining). Submit revised drafts or response letters anytime at no extra cost.
              </p>
            </div>
          </div>

          <button
            onClick={onRequestReEditing}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shrink-0 shadow-xs transition-colors"
          >
            Request Free Re-Editing
          </button>
        </div>

        {/* Milestone acknowledgement */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-[#0052CC] uppercase tracking-wider">
            Contextual Publication Advisory
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Continue Your Publication Journey
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span>You have completed:</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              English Editing ({completedMilestone.paper})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 max-w-2xl">
            Researchers preparing for journal submission often complete these steps next to eliminate administrative rejections and maximize reviewer receptivity.
          </p>
        </div>

        {/* Next Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nextSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold text-[#0052CC] bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {step.tag}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0052CC] transition-colors" />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70">
                  <div className="text-[11px] text-slate-500 font-medium mb-2.5">
                    {step.outcome}
                  </div>

                  <button
                    onClick={() => onOpenQuote(step.id)}
                    className="w-full py-1.5 px-2.5 bg-white hover:bg-[#0052CC] text-slate-700 hover:text-white border border-slate-300 hover:border-transparent rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>Configure support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
