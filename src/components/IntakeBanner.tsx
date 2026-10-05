import React, { useState, useRef } from 'react';
import { UserState, Manuscript } from '../types';
import { 
  UploadCloud, 
  FileText, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface IntakeBannerProps {
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
}

export const IntakeBanner: React.FC<IntakeBannerProps> = ({
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
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'questions'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isReturningUser = currentState === 'STATE_C';

  const stages = [
    { id: 'writing', label: 'Still Writing', desc: 'Drafting core sections' },
    { id: 'complete', label: 'Complete Draft', desc: 'Finished full text' },
    { id: 'presubmission', label: 'Pre-Submission', desc: 'Journal fit & formatting' },
    { id: 'revisions', label: 'Peer Review Revisions', desc: 'Addressing reviewers' },
    { id: 'rejected', label: 'Re-submitting', desc: 'Targeting new journal' },
  ];

  const helpGoals = [
    'Language & Grammar',
    'Scientific Clarity',
    'Journal Selection',
    'Figures & Art',
    'Reference Formatting',
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden mb-6">
      
      {/* Compact Banner Header */}
      <div className="px-5 py-3 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            {isReturningUser ? 'Manuscript Advisory Hub · Next Best Steps' : 'Where Are You in Your Publication Journey?'}
          </h2>
        </div>

        {/* Tab switchers on small/medium screens or visual cues */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-500 hidden sm:inline text-[11px]">Choose starting path:</span>
          <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activeTab === 'upload' ? 'bg-white text-[#0052CC] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Upload Document
            </button>
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activeTab === 'questions' ? 'bg-white text-[#0052CC] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Or Answer 3 Questions
            </button>
          </div>
        </div>
      </div>

      {/* TWO SECTIONS BANNER (Compact Desktop Grid) */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* SECTION 1: UPLOAD YOUR DOCUMENT (6 cols) */}
        <div className={`lg:col-span-6 rounded-xl border p-4 flex flex-col justify-between transition-all ${
          activeTab === 'upload'
            ? 'border-[#0052CC] bg-blue-50/20'
            : 'border-slate-200 bg-slate-50/50'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-[#0052CC]" />
                <span>Option A: Upload Your Document</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">DOCX / PDF up to 50MB</span>
            </div>

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#0052CC] bg-blue-50'
                  : activeManuscript
                  ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/70'
                  : 'border-slate-300 hover:border-[#0052CC] bg-white'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".docx,.doc,.pdf"
                className="hidden"
              />

              {activeManuscript ? (
                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                        {activeManuscript.fileName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-tabular">
                        {activeManuscript.wordCount.toLocaleString()} words · {activeManuscript.fileSize}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#0052CC] hover:underline shrink-0">
                    Replace file
                  </span>
                </div>
              ) : (
                <div className="py-2">
                  <p className="text-xs font-bold text-slate-800">
                    Drag & drop your manuscript here, or <span className="text-[#0052CC]">browse files</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    We will automatically count words & match field editors
                  </p>
                </div>
              )}
            </div>

            {/* Sample paper test shortcut */}
            {!activeManuscript && (
              <div className="mt-2.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Testing the experience?</span>
                <button
                  type="button"
                  onClick={handleSampleUpload}
                  className="font-bold text-[#0052CC] hover:underline"
                >
                  Load sample paper (11.8k words) →
                </button>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>Confidential 100% NDA Protection</span>
            <button
              type="button"
              onClick={() => setActiveTab('questions')}
              className="text-slate-700 hover:text-[#0052CC] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Or answer questions instead</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* SECTION 2: QUESTIONS / PERSONALIZATION FLOW (6 cols) */}
        <div className={`lg:col-span-6 rounded-xl border p-4 flex flex-col justify-between transition-all ${
          activeTab === 'questions'
            ? 'border-[#0052CC] bg-blue-50/20'
            : 'border-slate-200 bg-white'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#0052CC]" />
                <span>Option B: Tell Us Your Current Goal</span>
              </span>
              <span className="text-[10px] text-[#0052CC] font-bold">Live Diagnostics</span>
            </div>

            {/* Question 1: Stage Picker */}
            <div className="space-y-1.5 mb-3">
              <label className="text-[11px] font-semibold text-slate-600 block">
                1. Where is your paper right now?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {stages.map((stg) => (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => {
                      onSelectStage(stg.id);
                      setActiveTab('questions');
                    }}
                    className={`py-1.5 px-2 rounded-lg border text-left text-xs transition-all ${
                      selectedStage === stg.id
                        ? 'border-[#0052CC] bg-[#0052CC] text-white font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="truncate text-[11px]">{stg.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Help Needed */}
            <div className="space-y-1.5 mb-3">
              <label className="text-[11px] font-semibold text-slate-600 block">
                2. What would you like help with most?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {helpGoals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      onSelectHelp(goal);
                      setActiveTab('questions');
                    }}
                    className={`py-1 px-2 rounded-md text-[11px] font-medium border transition-colors ${
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

            {/* Question 3: Word count & Turnaround Speed */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Approx. Words:</span>
                  <span className="text-[#0052CC] font-bold font-tabular">{wordCount.toLocaleString()}w</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="500"
                  value={wordCount}
                  onChange={(e) => onChangeWordCount(Number(e.target.value))}
                  className="w-full accent-[#0052CC] h-1.5 bg-slate-200 rounded cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Timeline Needed:
                </span>
                <div className="grid grid-cols-3 gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => onChangeSpeed('standard')}
                    className={`py-1 rounded border text-center font-medium ${
                      speed === 'standard' ? 'bg-[#0052CC] text-white border-[#0052CC]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    5 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeSpeed('express')}
                    className={`py-1 rounded border text-center font-medium ${
                      speed === 'express' ? 'bg-[#0052CC] text-white border-[#0052CC]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    3 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeSpeed('urgent')}
                    className={`py-1 rounded border text-center font-medium ${
                      speed === 'urgent' ? 'bg-[#0052CC] text-white border-[#0052CC]' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    24h
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
            <span>Instant dynamic match below</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Recommendations updated live</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
