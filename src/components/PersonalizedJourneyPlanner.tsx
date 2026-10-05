import React, { useState } from 'react';
import { UserState, Manuscript } from '../types';
import { 
  UploadCloud, 
  FileText, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Sliders, 
  Plus, 
  BookOpen, 
  FileCheck, 
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface PersonalizedJourneyPlannerProps {
  currentState: UserState;
  activeManuscript: Manuscript | null;
  onUploadManuscript: (fileInfo: { name: string; size: string; words: number }) => void;
  onSelectStage: (stage: string) => void;
  onStartOrder: (config: any) => void;
  onOpenWhyRecommended: (serviceId: string) => void;
}

export const PersonalizedJourneyPlanner: React.FC<PersonalizedJourneyPlannerProps> = ({
  currentState,
  activeManuscript,
  onUploadManuscript,
  onSelectStage,
  onStartOrder,
  onOpenWhyRecommended,
}) => {
  // Step 1: Mode - 'upload' vs 'stage'
  const [intakeMode, setIntakeMode] = useState<'upload' | 'stage'>(
    activeManuscript ? 'upload' : 'upload'
  );

  const [selectedStage, setSelectedStage] = useState<string>(
    currentState === 'STATE_C'
      ? 'journal_selection'
      : activeManuscript
      ? 'completed_draft'
      : 'completed_draft'
  );

  // Step 2: Price & Details
  const [wordCount, setWordCount] = useState<number>(
    activeManuscript?.wordCount || 11840
  );
  const [speed, setSpeed] = useState<'standard' | 'express' | 'urgent'>('standard');
  const [budgetTier, setBudgetTier] = useState<string>('$250–500');
  const [subjectArea, setSubjectArea] = useState<string>('Medicine & Life Sciences');

  // Step 3: Add-on Suggestions
  const [addons, setAddons] = useState({
    formatting: true,
    journalSelection: currentState === 'STATE_C',
    graphicalAbstract: false,
    similarityCheck: true,
  });

  const stagesList = [
    { id: 'drafting', label: '1. Still Writing', desc: 'Drafting hypothesis & methods' },
    { id: 'completed_draft', label: '2. Complete Draft', desc: 'Finished full manuscript' },
    { id: 'journal_selection', label: '3. Pre-Submission', desc: 'Selecting journal & formatting' },
    { id: 'revisions', label: '4. Peer Review Revisions', desc: 'Addressing reviewer remarks' },
    { id: 'rejected', label: '5. Rejected / Re-target', desc: 'Reshaping for new target journal' },
  ];

  // Pricing calculation
  const isReturningUser = currentState === 'STATE_C';
  const baseRate = isReturningUser ? 0.021 : 0.026;
  const speedMultipliers = { standard: 1.0, express: 1.25, urgent: 1.5 };
  
  // Primary service determination
  const primaryServiceTitle = isReturningUser
    ? 'Journal Selection & Submission Readiness'
    : 'Premium Scientific Editing';

  const primaryServiceDesc = isReturningUser
    ? 'Since your English Editing is completed, align with high-acceptance journals and run pre-flight compliance audit.'
    : 'Comprehensive 2-round scientific review by two PhD subject specialists with 365-day free re-editing.';

  const basePrice = Math.round(wordCount * baseRate * speedMultipliers[speed]);
  const formattingPrice = addons.formatting ? 85 : 0;
  const journalPrice = addons.journalSelection ? 160 : 0;
  const abstractPrice = addons.graphicalAbstract ? 220 : 0;
  const similarityPrice = addons.similarityCheck ? 45 : 0;

  const totalPrice = basePrice + formattingPrice + journalPrice + abstractPrice + similarityPrice;

  const toggleAddon = (key: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    onSelectStage(stageId);
  };

  const handleSampleUpload = () => {
    onUploadManuscript({
      name: 'nanomedicine_targeted_delivery_v2.docx',
      size: '4.8 MB',
      words: 11840,
    });
    setWordCount(11840);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Widget Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0052CC]" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Personalized Research Journey & Service Configurator
          </h2>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Instant Word-Based Quote · Free Re-Editing Included
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">

        {/* STEP 1: UPLOAD DOCUMENT OR SELECT STAGE */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 1: Choose Your Starting Point
            </span>

            {/* Toggle tabs between Upload vs Select Stage */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setIntakeMode('upload')}
                className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                  intakeMode === 'upload'
                    ? 'bg-white text-[#0052CC] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>

              <button
                type="button"
                onClick={() => setIntakeMode('stage')}
                className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                  intakeMode === 'stage'
                    ? 'bg-white text-[#0052CC] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Select Paper Stage</span>
              </button>
            </div>
          </div>

          {/* Option A: Upload Box */}
          {intakeMode === 'upload' ? (
            <div className="border-2 border-dashed border-slate-200 hover:border-[#0052CC] bg-slate-50/60 rounded-xl p-4 sm:p-5 transition-colors">
              {activeManuscript ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-sm">
                        {activeManuscript.fileName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-tabular flex items-center gap-2">
                        <span>{activeManuscript.wordCount.toLocaleString()} words</span>
                        <span>·</span>
                        <span>{activeManuscript.fileSize}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">Ready for review</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSampleUpload}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold"
                    >
                      Re-upload
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        Drop manuscript file here (DOCX or PDF)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Automatic word count detection & confidential NDA encrypted transfer
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleSampleUpload}
                      className="px-4 py-2 bg-[#0052CC] hover:bg-[#0047B3] text-white rounded-lg text-xs font-semibold shadow-xs"
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={handleSampleUpload}
                      className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      Try Sample (11.8k words)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Option B: Stage Selector Cards */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {stagesList.map((stg) => {
                const isSelected = selectedStage === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => handleStageSelect(stg.id)}
                    className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0052CC] bg-blue-50/70 ring-1 ring-[#0052CC]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                      <span>{stg.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#0052CC]" />}
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {stg.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* STEP 2: PRICE & DETAILS CONFIGURATOR */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Step 2: Word Count, Timeline & Preferences
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50/70 p-4 rounded-xl border border-slate-200">
            {/* Word count */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Word Count:</span>
                <span className="font-bold text-[#0052CC] font-tabular">{wordCount.toLocaleString()} words</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="250"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full accent-[#0052CC] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-tabular">
                <span>1,000w</span>
                <span>Preset: 12,000w</span>
                <span>25,000w</span>
              </div>
            </div>

            {/* Turnaround Speed */}
            <div className="md:col-span-4 space-y-1">
              <span className="text-xs font-semibold text-slate-700 block">Speed & Turnaround:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSpeed('standard')}
                  className={`py-1.5 px-2 rounded border text-center text-xs font-medium transition-all ${
                    speed === 'standard'
                      ? 'border-[#0052CC] bg-white text-[#0052CC] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div>Standard</div>
                  <div className="text-[10px] text-slate-400">5 days</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSpeed('express')}
                  className={`py-1.5 px-2 rounded border text-center text-xs font-medium transition-all ${
                    speed === 'express'
                      ? 'border-[#0052CC] bg-white text-[#0052CC] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div>Express</div>
                  <div className="text-[10px] text-slate-400">3 days</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSpeed('urgent')}
                  className={`py-1.5 px-2 rounded border text-center text-xs font-medium transition-all ${
                    speed === 'urgent'
                      ? 'border-[#0052CC] bg-white text-[#0052CC] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                  }`}
                >
                  <div>Urgent</div>
                  <div className="text-[10px] text-slate-400">24–48h</div>
                </button>
              </div>
            </div>

            {/* Subject Area */}
            <div className="md:col-span-3 space-y-1">
              <span className="text-xs font-semibold text-slate-700 block">Subject Discipline:</span>
              <select
                value={subjectArea}
                onChange={(e) => setSubjectArea(e.target.value)}
                className="w-full py-1.5 px-2.5 bg-white border border-slate-200 rounded text-xs text-slate-800 font-medium focus:ring-1 focus:ring-[#0052CC] focus:outline-none"
              >
                <option value="Medicine & Life Sciences">Medicine & Life Sciences</option>
                <option value="Physical Sciences">Physical Sciences & Engineering</option>
                <option value="Social Sciences">Social Sciences & Humanities</option>
                <option value="Computer Science">Computer Science & AI</option>
              </select>
            </div>
          </div>
        </div>

        {/* STEP 3 & 4: RECOMMENDED SERVICE + ADD-ON SUGGESTIONS */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Step 3: Matched Service & Recommended Add-ons
            </span>
            <button
              onClick={() => onOpenWhyRecommended(isReturningUser ? 'journal_selection' : 'premium_editing')}
              className="text-xs text-[#0052CC] hover:underline font-semibold flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why this service was matched</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Primary Matched Card (7 cols) */}
            <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl border-2 border-[#0052CC]/50 bg-gradient-to-br from-blue-50/40 via-white to-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#0052CC] text-white">
                    BEST MATCH FOR YOUR STAGE
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {speed === 'urgent' ? '24–48h delivery' : speed === 'express' ? '3-day delivery' : '5-day delivery'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {primaryServiceTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {primaryServiceDesc}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>2 PhD field specialist editors</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>365-day free re-editing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Scientific critique & logic flow</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Target cover letter to editor</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Core Package Base:</span>
                <span className="text-base font-bold text-slate-900 font-tabular">${basePrice} USD</span>
              </div>
            </div>

            {/* Smart Add-ons Box (5 cols) */}
            <div className="lg:col-span-5 p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                  Recommended Add-ons:
                </span>

                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => toggleAddon('formatting')}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      addons.formatting ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        addons.formatting ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                      }`}>
                        {addons.formatting && <Check className="w-3 h-3" />}
                      </span>
                      <span className="font-semibold text-slate-800">Target Journal Formatting</span>
                    </div>
                    <span className="font-bold text-slate-900 font-tabular">+$85</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAddon('journalSelection')}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      addons.journalSelection ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        addons.journalSelection ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                      }`}>
                        {addons.journalSelection && <Check className="w-3 h-3" />}
                      </span>
                      <span className="font-semibold text-slate-800">Journal Selection Match</span>
                    </div>
                    <span className="font-bold text-slate-900 font-tabular">+$160</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAddon('graphicalAbstract')}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      addons.graphicalAbstract ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        addons.graphicalAbstract ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                      }`}>
                        {addons.graphicalAbstract && <Check className="w-3 h-3" />}
                      </span>
                      <span className="font-semibold text-slate-800">Scientific Graphical Abstract</span>
                    </div>
                    <span className="font-bold text-slate-900 font-tabular">+$220</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleAddon('similarityCheck')}
                    className={`w-full p-2 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      addons.similarityCheck ? 'bg-white border-[#0052CC] shadow-2xs' : 'border-slate-200 bg-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        addons.similarityCheck ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-slate-300'
                      }`}>
                        {addons.similarityCheck && <Check className="w-3 h-3" />}
                      </span>
                      <span className="font-semibold text-slate-800">iThenticate Similarity Check</span>
                    </div>
                    <span className="font-bold text-slate-900 font-tabular">+$45</span>
                  </button>
                </div>
              </div>

              {/* Total & Action */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="flex items-baseline justify-between mb-3 font-tabular">
                  <span className="text-xs font-semibold text-slate-600">Total Configured Price:</span>
                  <span className="text-xl font-extrabold text-[#0052CC]">${totalPrice} USD</span>
                </div>

                <button
                  type="button"
                  onClick={() => onStartOrder({
                    serviceTitle: primaryServiceTitle,
                    wordCount,
                    totalPrice,
                    speed,
                    addons,
                  })}
                  className="w-full py-2.5 px-4 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Proceed with Matched Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
