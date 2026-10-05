import React, { useState } from 'react';
import { AssessmentAnswers } from '../types';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, HelpCircle } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (answers: AssessmentAnswers) => void;
  initialAnswers?: AssessmentAnswers;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialAnswers,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [stage, setStage] = useState<string>(initialAnswers?.stage || 'Manuscript is complete');
  const [goals, setGoals] = useState<string[]>(
    initialAnswers?.goals || ['Improve English and readability', 'Improve scientific clarity']
  );
  const [budget, setBudget] = useState<string>(initialAnswers?.budget || '$250–500');
  const [deadline, setDeadline] = useState<string>(initialAnswers?.deadline || 'Within a week');

  if (!isOpen) return null;

  const stageOptions = [
    { label: 'Still writing my manuscript', desc: 'Drafting core sections and gathering preliminary findings' },
    { label: 'Manuscript is complete', desc: 'First full draft completed, ready for thorough revision' },
    { label: 'Preparing for journal submission', desc: 'Finalizing formatting, cover letters, and journal fit' },
    { label: 'Journal has requested revisions', desc: 'Addressing peer reviewer critiques and revising draft' },
    { label: 'Manuscript was rejected', desc: 'Seeking structural re-evaluation and new journal targeting' },
    { label: 'I want to improve my chances before submission', desc: 'Rigorous peer review audit prior to first submission' },
  ];

  const goalOptions = [
    'Improve English and readability',
    'Improve scientific clarity',
    'Check manuscript structure',
    'Choose the right journal',
    'Prepare for journal submission',
    'Respond to reviewer comments',
    'Create figures / graphical abstract',
    'Check formatting and references',
    "I'm not sure — recommend for me",
  ];

  const budgetOptions = [
    { label: 'Under $100', desc: 'Essential proofreading or reference styling' },
    { label: '$100–250', desc: 'Standard editing or journal selection report' },
    { label: '$250–500', desc: 'Premium 2-editor scientific review & formatting' },
    { label: '$500+', desc: 'End-to-end publication package with artwork' },
    { label: 'Not sure yet', desc: 'Evaluate options based on value & recommendations' },
  ];

  const deadlineOptions = [
    { label: 'Within 24 hours', desc: 'Urgent conference or journal deadline' },
    { label: '2–3 days', desc: 'Fast turnaround priority review' },
    { label: 'Within a week', desc: 'Standard publication preparation' },
    { label: 'No strict deadline', desc: 'Flexible timeline prioritizing depth' },
  ];

  const toggleGoal = (goal: string) => {
    if (goal === "I'm not sure — recommend for me") {
      setGoals(["I'm not sure — recommend for me"]);
      return;
    }
    const filtered = goals.filter((g) => g !== "I'm not sure — recommend for me");
    if (filtered.includes(goal)) {
      setGoals(filtered.filter((g) => g !== goal));
    } else {
      setGoals([...filtered, goal]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onComplete({
      stage,
      goals,
      budget,
      deadline,
    });
    onClose();
  };

  const handleSkip = () => {
    handleSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header & Progress */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-tabular">
              {step} of 4 • {step === 1 ? 'About your manuscript' : step === 2 ? 'Goals & focus' : step === 3 ? 'Budget range' : 'Timeline'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSkip}
              className="text-xs text-slate-500 hover:text-[#0052CC] font-medium transition-colors"
            >
              Skip — show me recommendations
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-[#0052CC] h-1 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Publication Stage */}
          {step === 1 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Where are you in your publication journey?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Select the statement that best reflects your manuscript right now.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {stageOptions.map((opt) => {
                  const isSelected = stage === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setStage(opt.label)}
                      className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC] shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                          {opt.label}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'border-[#0052CC] bg-[#0052CC] text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Goals */}
          {step === 2 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                What would you most like help with?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Select as many as apply to help our editorial board tailor your recommendation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                {goalOptions.map((goal) => {
                  const isSelected = goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-3 rounded-lg text-left border transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-[#0052CC] bg-blue-50/60 ring-1 ring-[#0052CC]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xs font-medium text-slate-800">
                        {goal}
                      </span>
                      <span
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#0052CC] bg-[#0052CC] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Budget Range */}
          {step === 3 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                What is your approximate budget?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                We will prioritize packages and grant-compliant options that fit your tier.
              </p>

              <div className="space-y-2.5 mt-6">
                {budgetOptions.map((opt) => {
                  const isSelected = budget === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setBudget(opt.label)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 font-tabular">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#0052CC] bg-[#0052CC] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Timeline */}
          {step === 4 && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                When do you need support?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Let us know your journal submission deadline so we schedule editors appropriately.
              </p>

              <div className="space-y-2.5 mt-6">
                {deadlineOptions.map((opt) => {
                  const isSelected = deadline === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setDeadline(opt.label)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {opt.label}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {opt.desc}
                        </div>
                      </div>

                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-[#0052CC] bg-[#0052CC] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-2 transition-all"
          >
            <span>{step === 4 ? 'Generate recommendations' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
