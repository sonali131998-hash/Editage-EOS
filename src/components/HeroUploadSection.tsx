import React, { useState, useRef } from 'react';
import { UserState } from '../types';
import { UploadCloud, FileText, ArrowRight, ShieldCheck, Clock, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface HeroUploadSectionProps {
  currentState: UserState;
  onUploadFile: (file: File | { name: string; size: string; words: number }) => void;
  onContinueWithoutUploading: () => void;
  onOpenAssessment: () => void;
}

export const HeroUploadSection: React.FC<HeroUploadSectionProps> = ({
  currentState,
  onUploadFile,
  onContinueWithoutUploading,
  onOpenAssessment,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isReturningUser = currentState === 'STATE_C';
  const hasManuscript = currentState === 'STATE_B' || currentState === 'STATE_C';

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
      onUploadFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onUploadFile(file);
    }
  };

  const loadSampleManuscript = () => {
    onUploadFile({
      name: 'nanomedicine_targeted_delivery_v2.docx',
      size: '4.8 MB',
      words: 11840,
    });
  };

  return (
    <section className="relative pt-8 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/60 to-[#F8FAFC] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Greeting & Headline */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wide text-[#0052CC] uppercase">
            <span>Editage Online System</span>
            <span aria-hidden="true">·</span>
            <span>Personalized Researcher Workspace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 font-sans leading-tight">
            {isReturningUser ? (
              <>
                Welcome back, <span className="text-[#0052CC]">Dr. Verma</span>
              </>
            ) : (
              "Let's move your manuscript closer to publication."
            )}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {isReturningUser
              ? 'Your manuscript was previously edited with Editage. Review your progress, access your 365-day free re-editing benefit, or explore recommended next-stage submission services.'
              : 'Upload your manuscript and tell us where you are in your publication journey. We will recommend the support that makes sense for you—not a generic service catalog.'}
          </p>
        </div>

        {/* PRIMARY UX CONCEPT: MANUSCRIPT UPLOAD & ENTRY POINT */}
        {currentState === 'STATE_A' && (
          <div className="bg-white rounded-xl border-2 border-slate-300/80 shadow-md p-6 sm:p-8 lg:p-10 transition-all hover:border-[#0052CC]/50">
            <div className="max-w-3xl mx-auto text-center">
              
              {/* Prominent Header inside upload card */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary Entry Point</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Where are you in your publication journey?
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                Upload your manuscript and we'll help you identify the support you may need next.
              </p>

              {/* Drag and Drop Box */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-6 border-2 border-dashed rounded-xl p-8 sm:p-10 transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isDragging
                    ? 'border-[#0052CC] bg-blue-50/60 scale-[1.01]'
                    : 'border-slate-300 hover:border-[#0052CC] bg-slate-50/50 hover:bg-white'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".docx,.doc,.pdf"
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mb-3 shadow-xs">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  Drag & drop your manuscript here
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports DOCX, DOC, or PDF (up to 50 MB)
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Upload manuscript
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 w-full max-w-sm flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span>No file on hand?</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      loadSampleManuscript();
                    }}
                    className="text-[#0052CC] hover:underline font-semibold"
                  >
                    Load sample paper (11.8k words)
                  </button>
                </div>
              </div>

              {/* Secondary Option: Continue without uploading */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={onContinueWithoutUploading}
                  className="text-slate-600 hover:text-[#0052CC] font-medium flex items-center gap-1.5 transition-colors underline-offset-4 hover:underline"
                >
                  <span>Continue without uploading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="text-slate-600 hover:text-[#0052CC] font-medium transition-colors"
                >
                  Answer 4 quick questions instead
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-500 text-xs text-left">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-tight">ISO/IEC 27001 Certified Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-[11px] leading-tight">Subject-Matched PhD Editors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-tight">100% Confidential NDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-[11px] leading-tight">Instant Transparent Quotes</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* IF STATE B OR C: Clean workspace hero with active file and shortcut actions */}
        {hasManuscript && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left: Active Manuscript Card */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-[#0052CC]" />
                    <span>Active Manuscript Workspace</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {isReturningUser ? 'Manuscript ID: MS-7410' : 'Manuscript ID: MS-9042'}
                  </span>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-sans">
                      {isReturningUser ? 'CRISPR_microbiome_dynamics_v3.docx' : 'nanomedicine_targeted_delivery_v2.docx'}
                    </h2>
                    
                    {/* Unboxed metadata with typographic separators */}
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700 font-tabular">
                        {isReturningUser ? '12,482 words' : '11,840 words'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{isReturningUser ? 'Last edited 28 Sep 2026' : 'Uploaded Today, 10:15 AM'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{isReturningUser ? 'Cell Host & Microbe' : 'Target: High-Impact Q1'}</span>
                    </div>

                    <p className="mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong className="text-slate-800 font-semibold">Current Diagnostic: </strong>
                      {isReturningUser
                        ? 'Language polish completed. Paper is now primed for Journal Selection and Author Guidelines formatting.'
                        : 'Manuscript complete. Needs language refinement, structural flow check, and journal alignment prior to submission.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      document.getElementById('recommendations-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>View recommendations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenAssessment}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    Retake 4-question assessment
                  </button>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium underline-offset-4 hover:underline"
                >
                  Upload different version
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".docx,.doc,.pdf"
                  className="hidden"
                />
              </div>
            </div>

            {/* Right: Quick Publication Status Preview */}
            <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-[#0A192F] text-white rounded-xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold uppercase tracking-wider text-[11px] text-blue-300">
                    Next Recommended Milestone
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>

                <h3 className="mt-3 text-base sm:text-lg font-bold text-white leading-snug">
                  {isReturningUser ? 'Journal Selection & Readiness Check' : 'Comprehensive Premium Scientific Editing'}
                </h3>

                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {isReturningUser
                    ? 'Target journals with high acceptance probability and eliminate submission red-flags.'
                    : 'Ensure language clarity, scientific reasoning, and formatting before your target journal sees it.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {isReturningUser ? 'Re-editing active: 356d' : 'Turnaround: 3–5 days'}
                </span>
                <button
                  onClick={() => {
                    document.getElementById('recommendations-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-blue-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Explore next steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
