import React, { useState, useRef, useEffect } from 'react';
import { UserState, Manuscript } from '../types';
import { 
  Search, 
  UploadCloud, 
  MessageSquare, 
  Plus, 
  ArrowRight, 
  Check, 
  Sparkles, 
  FileText, 
  Sliders, 
  X,
  FileCheck,
  CheckCircle2,
  Clock,
  HelpCircle,
  BookOpen,
  Award,
  ShieldCheck
} from 'lucide-react';

interface HeroIntakeCardProps {
  currentState: UserState;
  activeManuscript: Manuscript | null;
  onUploadFile: (fileInfo: { name: string; size: string; words: number }) => void;
  selectedStage: string;
  onSelectStage: (stage: string) => void;
  selectedHelp: string;
  onSelectHelp: (help: string) => void;
  wordCount: number;
  onChangeWordCount: (wc: number) => void;
  speed: 'standard' | 'express' | 'urgent';
  onChangeSpeed: (spd: 'standard' | 'express' | 'urgent') => void;
  onSelectServiceFromSearch: (serviceName: string) => void;
}

export const HeroIntakeCard: React.FC<HeroIntakeCardProps> = ({
  currentState,
  activeManuscript,
  onUploadFile,
  selectedStage,
  onSelectStage,
  selectedHelp,
  onSelectHelp,
  wordCount,
  onChangeWordCount,
  speed,
  onChangeSpeed,
  onSelectServiceFromSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);

  // Accordion for "Not ready to upload"
  const [showQuestions, setShowQuestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = [
    { title: 'Premium Scientific Editing', cat: 'Editing & Language', desc: '2 PhD subject specialist review + 365-day free re-editing' },
    { title: 'Journal Selection Match Report', cat: 'Publication Support', desc: 'Find 3–5 journals matched to manuscript scope & impact factor' },
    { title: 'Target Journal Formatting', cat: 'Formatting & Layout', desc: 'Format author guidelines, references (APA, IEEE, Vancouver)' },
    { title: 'Scientific Graphical Abstract', cat: 'Figures & Artwork', desc: 'High-impact TOC illustration designed by PhD medical illustrators' },
    { title: 'iThenticate Plagiarism & Similarity', cat: 'Integrity Check', desc: 'Official journal-grade similarity report with citation overlap audit' },
    { title: 'Pre-Submission Peer Review', cat: 'Peer Review', desc: 'Comprehensive simulated critique to prevent desk rejection' },
  ];

  const filteredSuggestions = searchQuery.trim() === ''
    ? searchSuggestions.slice(0, 4)
    : searchSuggestions.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.cat.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // REDUCED TO 2 SHARP QUESTIONS WITH APT SUGGESTIONS:
  // Question 1: Publishing Priorities
  const publishingGoals = [
    {
      id: 'scientific_rigor',
      title: 'Scientific Rigor & Deep Review',
      tag: 'Most Popular',
      desc: '2 PhD subject specialists critique methodology, structure & logic',
      helpValue: 'Improve scientific clarity',
      stageValue: 'complete',
      aptService: 'Premium Scientific Editing',
      aptRationale: 'Two subject-area PhD editors check scientific validity, flow, and terminology + 365 days of free re-editing.',
    },
    {
      id: 'journal_selection',
      title: 'Target Journal Fit & Formatting',
      tag: 'Pre-Submission',
      desc: 'Select matched Q1/Q2 indexed journals & align author guidelines',
      helpValue: 'Choose the right journal',
      stageValue: 'presubmission',
      aptService: 'Journal Selection & Submission Readiness',
      aptRationale: 'Shortlists high-probability journals matching your study scope and eliminates technical formatting desk rejections.',
    },
    {
      id: 'language_flow',
      title: 'English Language & Academic Tone',
      tag: 'Fast Turnaround',
      desc: 'Polish grammar, sentence flow, vocabulary & native phrasing',
      helpValue: 'Improve English and readability',
      stageValue: 'complete',
      aptService: 'Advanced English Editing',
      aptRationale: 'Ensures clear, publication-grade academic English reviewed by native English editors in your field.',
    },
    {
      id: 'peer_review_revisions',
      title: 'Revisions & Reviewer Comments',
      tag: 'Post-Review',
      desc: 'Respond to reviewer critique & revise draft for resubmission',
      helpValue: 'Respond to reviewer comments',
      stageValue: 'revisions',
      aptService: 'Post-Review Revision Support',
      aptRationale: 'Reviews your point-by-point rebuttal letter and edits the revised manuscript to satisfy journal referees.',
    },
  ];

  // Derive current goal from selectedHelp / selectedStage
  const currentGoal = publishingGoals.find(
    (g) => g.helpValue === selectedHelp || (g.id === 'journal_selection' && selectedStage === 'presubmission')
  ) || publishingGoals[0];

  // Question 2: Scope pills
  const scopePills = [
    { label: 'Brief Report (< 4k words)', words: 3500 },
    { label: 'Standard Article (4k–10k words)', words: 6800 },
    { label: 'Full Study (10k–15k words)', words: 11840 },
    { label: 'Monograph (> 15k words)', words: 18500 },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onUploadFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        words: 11840,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onUploadFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        words: 11840,
      });
    }
  };

  const handleSampleUpload = () => {
    onUploadFile({
      name: 'nanomedicine_targeted_delivery_v2.docx',
      size: '4.8 MB',
      words: 11840,
    });
    onChangeWordCount(11840);
  };

  const handleSelectGoal = (goal: typeof publishingGoals[0]) => {
    onSelectHelp(goal.helpValue);
    onSelectStage(goal.stageValue);
  };

  const handleApplyQuestions = () => {
    setShowQuestions(false);
    const recSection = document.getElementById('recommendation-section');
    if (recSection) {
      recSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3">
      
      {/* 1. TOP SEARCH SECTION ("What do you need help with?") */}
      <div className="space-y-1">
        <label className="text-xs sm:text-sm font-bold text-slate-900 block font-sans">
          What do you need help with?
        </label>

        <div className="relative" ref={searchDropdownRef}>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#0052CC] absolute left-3.5 pointer-events-none stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search services, e.g. English editing, journal selection, formatting, graphical abstract..."
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-[#0052CC] transition-all shadow-2xs"
            />
          </div>

          {/* Search Dropdown / Autocomplete */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-2 text-xs divide-y divide-slate-100 max-h-72 overflow-y-auto">
              <div className="p-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {searchQuery.trim() === '' ? 'Popular Services' : `Matching Services (${filteredSuggestions.length})`}
              </div>
              <div className="py-1">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onSelectServiceFromSearch(item.title);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-blue-50/70 flex items-start justify-between gap-3 group transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#0052CC] flex items-center gap-1.5">
                        <span>{item.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-[#0052CC] rounded font-normal">
                          {item.cat}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0052CC] mt-1 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. DUAL BANNER: [ UPLOAD YOUR MANUSCRIPT ] | [ NOT READY TO UPLOAD? ] */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-150">
          
          {/* Left Column: Upload your manuscript */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-4 sm:p-5 flex flex-col justify-between transition-colors ${
              isDragging ? 'bg-blue-50/50' : 'bg-white'
            }`}
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#EBF3FC] text-[#0052CC] flex items-center justify-center mb-2.5">
                <UploadCloud className="w-4 h-4 stroke-[2.2]" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Upload your manuscript
              </h3>

              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Add a DOCX or PDF to get support that fits your work.
              </p>

              {/* If active manuscript exists, show file badge */}
              {activeManuscript && (
                <div className="mt-2.5 p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 truncate">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold truncate">{activeManuscript.fileName}</span>
                    <span className="text-slate-500 font-tabular font-normal text-[11px]">({activeManuscript.wordCount.toLocaleString()}w)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                    Loaded
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3.5 pt-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".docx,.doc,.pdf"
                className="hidden"
              />

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Upload manuscript</span>
                </button>

                {!activeManuscript && (
                  <button
                    type="button"
                    onClick={handleSampleUpload}
                    className="text-xs text-[#0052CC] hover:underline font-semibold"
                  >
                    Try sample (11.8k words)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Not ready to upload? */}
          <div className="p-4 sm:p-5 flex flex-col justify-between bg-white">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#E8F6ED] text-[#16A34A] flex items-center justify-center mb-2.5">
                <MessageSquare className="w-4 h-4 stroke-[2.2]" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Not ready to upload?
              </h3>

              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Answer 2 quick questions to get apt service recommendations without a document.
              </p>
            </div>

            <div className="mt-3.5 pt-1">
              <button
                type="button"
                onClick={() => setShowQuestions(!showQuestions)}
                className={`px-4 py-2 border text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  showQuestions
                    ? 'bg-blue-50 border-[#0052CC] text-[#0052CC]'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <span>{showQuestions ? 'Close questions' : 'Continue without uploading'}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          </div>

        </div>

        {/* STREAMLINED "NOT READY TO UPLOAD" (REDUCED TO 2 QUESTIONS & APT SUGGESTIONS) */}
        {showQuestions && (
          <div className="border-t border-slate-200 bg-slate-50/70 p-4 sm:p-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-4xl space-y-4">
              
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0052CC]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Quick Publication Assessment (2 Questions)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuestions(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium"
                >
                  Hide questions ✕
                </button>
              </div>

              {/* QUESTION 1: Primary Publishing Priority (4 Apt Goal Cards) */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                  1. What is your primary publishing priority?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {publishingGoals.map((goal) => {
                    const isSelected = currentGoal.id === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => handleSelectGoal(goal)}
                        className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#0052CC] bg-blue-50/60 ring-2 ring-[#0052CC]/80 shadow-2xs'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-slate-900">
                              {goal.title}
                            </span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                              isSelected
                                ? 'bg-[#0052CC] text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {goal.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {goal.desc}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-1.5 border-t border-slate-150 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Apt service:</span>
                          <span className={`font-semibold ${isSelected ? 'text-[#0052CC]' : 'text-slate-700'}`}>
                            {goal.aptService}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QUESTION 2: Estimated Scope & Length */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                  2. What is your paper's estimated scope & word count?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {scopePills.map((scope) => {
                    const isSelected = Math.abs(wordCount - scope.words) < 2000;
                    return (
                      <button
                        key={scope.label}
                        type="button"
                        onClick={() => onChangeWordCount(scope.words)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0052CC] bg-white ring-1 ring-[#0052CC] font-bold text-[#0052CC]'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate">{scope.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0052CC] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* APT SUGGESTION HIGHLIGHT BOX (Live, intelligent matching) */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-[#0052CC]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#0052CC] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Apt Recommendation: {currentGoal.aptService}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        High Fit
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {currentGoal.aptRationale}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyQuestions}
                  className="w-full sm:w-auto px-4 py-2 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 shrink-0 transition-all cursor-pointer"
                >
                  <span>Apply & View Recommendation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
