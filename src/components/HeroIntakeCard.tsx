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
  HelpCircle
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

  // Mode for the card: 'initial' | 'questions' | 'uploaded'
  const [showQuestions, setShowQuestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isReturningUser = currentState === 'STATE_C';

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

  const stages = [
    { id: 'writing', label: 'Still writing', desc: 'Drafting initial sections' },
    { id: 'complete', label: 'Manuscript is complete', desc: 'Full draft ready for review' },
    { id: 'presubmission', label: 'Preparing for submission', desc: 'Targeting journal & formatting' },
    { id: 'revisions', label: 'Revisions requested', desc: 'Responding to peer review' },
    { id: 'rejected', label: 'Rejected / Re-submitting', desc: 'Restructuring for new journal' },
  ];

  const helpGoals = [
    'Improve English and readability',
    'Improve scientific clarity',
    'Choose the right journal',
    'Check formatting and references',
    'Create figures / graphical abstract',
    'Respond to reviewer comments',
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

  return (
    <div className="space-y-3">
      
      {/* 1. TOP SEARCH SECTION (Matching user screenshot: "What do you need help with?") */}
      <div className="space-y-1">
        <label className="text-xs sm:text-sm font-bold text-slate-900 block font-sans">
          What do you need help with?
        </label>

        <div className="relative" ref={searchDropdownRef}>
          <div className="relative flex items-center">
            {/* Blue search icon exactly as in screenshot */}
            <Search className="w-4 h-4 text-[#0052CC] absolute left-3.5 pointer-events-none stroke-[2.2]" />
            
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder="Search editing, journals, formatting, figures..."
              className="w-full h-10 sm:h-11 pl-10 pr-9 bg-white border border-slate-200 hover:border-slate-300 focus:border-[#0052CC] rounded-xl text-xs sm:text-sm placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0052CC]/15 shadow-2xs transition-all"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown / Recommender */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-[#0052CC]">
                  <Sparkles className="w-3 h-3" />
                  <span>Search Suggestions</span>
                </span>
                <span>{filteredSuggestions.length} available</span>
              </div>

              <div className="mt-1.5 space-y-1">
                {filteredSuggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectServiceFromSearch(item.title);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2 rounded-lg hover:bg-blue-50/70 border border-transparent hover:border-blue-100 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium px-1.5 py-0.2 bg-slate-100 rounded">
                          {item.cat}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0052CC] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. PERSONALIZED START CARD (Exact layout matching the user's uploaded screenshot) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        
        {/* Card Header matching screenshot */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F8FAFD] border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0052CC] block">
              PERSONALIZED START
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 font-sans mt-0.5">
              Where are you in your publication journey?
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-normal">
            Choose how you'd like to begin
          </div>
        </div>

        {/* Card Body - 2 Columns (Upload manuscript vs Not ready to upload) */}
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
              {/* Blue icon container exactly as in screenshot */}
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
              {/* Green speech bubble icon exactly as in screenshot */}
              <div className="w-8 h-8 rounded-lg bg-[#E8F6ED] text-[#16A34A] flex items-center justify-center mb-2.5">
                <MessageSquare className="w-4 h-4 stroke-[2.2]" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Not ready to upload?
              </h3>

              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Answer a few questions about your goals and get recommendations without a document.
              </p>
            </div>

            <div className="mt-3.5 pt-1">
              <button
                type="button"
                onClick={() => setShowQuestions(!showQuestions)}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Continue without uploading</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 stroke-[2]" />
              </button>
            </div>
          </div>

        </div>

        {/* EXPANDABLE QUESTIONS ACCORDION (If user clicks "Continue without uploading") */}
        {showQuestions && (
          <div className="border-t border-slate-200 bg-slate-50/60 p-6 sm:p-8 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-4xl space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0052CC]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Quick Publication Assessment (3 Questions)
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

              {/* Question 1: Stage */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  1. Where is your paper right now?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {stages.map((stg) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => onSelectStage(stg.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                        selectedStage === stg.id
                          ? 'border-[#0052CC] bg-[#0052CC] text-white shadow-2xs font-bold'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-xs">{stg.label}</div>
                      <div className={`text-[10px] mt-1 ${selectedStage === stg.id ? 'text-blue-100' : 'text-slate-400'}`}>
                        {stg.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Help Needed */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                  2. What would you most like help with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {helpGoals.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => onSelectHelp(goal)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors ${
                        selectedHelp === goal
                          ? 'border-[#0052CC] bg-blue-50 text-[#0052CC] font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Word count & Turnaround */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Approximate Word Count:</span>
                    <span className="text-[#0052CC] font-bold font-tabular">{wordCount.toLocaleString()} words</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="25000"
                    step="500"
                    value={wordCount}
                    onChange={(e) => onChangeWordCount(Number(e.target.value))}
                    className="w-full accent-[#0052CC] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-tabular mt-1">
                    <span>1,000w</span>
                    <span>12,000w</span>
                    <span>25,000w</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Required Turnaround Speed:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => onChangeSpeed('standard')}
                      className={`py-2 rounded-lg border text-center font-medium transition-all ${
                        speed === 'standard' ? 'bg-[#0052CC] text-white border-[#0052CC] font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>5 Days</div>
                      <div className={`text-[10px] ${speed === 'standard' ? 'text-blue-100' : 'text-slate-400'}`}>Standard</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeSpeed('express')}
                      className={`py-2 rounded-lg border text-center font-medium transition-all ${
                        speed === 'express' ? 'bg-[#0052CC] text-white border-[#0052CC] font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>3 Days</div>
                      <div className={`text-[10px] ${speed === 'express' ? 'text-blue-100' : 'text-slate-400'}`}>Express</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onChangeSpeed('urgent')}
                      className={`py-2 rounded-lg border text-center font-medium transition-all ${
                        speed === 'urgent' ? 'bg-[#0052CC] text-white border-[#0052CC] font-bold' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>24h</div>
                      <div className={`text-[10px] ${speed === 'urgent' ? 'text-blue-100' : 'text-slate-400'}`}>Urgent</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recommendations below updated based on your selections</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowQuestions(false)}
                  className="px-4 py-2 bg-[#0052CC] text-white font-semibold rounded-lg text-xs"
                >
                  View Recommendations ↓
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
