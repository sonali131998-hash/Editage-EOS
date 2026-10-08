import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Check, 
  Clock, 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  Lock, 
  Trash2, 
  Sparkles,
  Info,
  Calendar
} from 'lucide-react';
import { Manuscript } from '../types';

interface InstantQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  initialWordCount?: number;
  activeManuscript?: Manuscript | null;
  onUploadManuscript?: (fileInfo: { name: string; size: string; words: number }) => void;
}

export const InstantQuoteModal: React.FC<InstantQuoteModalProps> = ({
  isOpen,
  onClose,
  serviceId = 'premium_editing',
  initialWordCount = 11840,
  activeManuscript,
  onUploadManuscript,
}) => {
  const [wordCount, setWordCount] = useState<number>(initialWordCount);
  const [speed, setSpeed] = useState<'standard' | 'express' | 'super_express'>('standard');

  // Manuscript upload is strictly OPTIONAL
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    size: string;
    words: number;
  } | null>(
    activeManuscript
      ? {
          name: activeManuscript.fileName,
          size: activeManuscript.fileSize,
          words: activeManuscript.wordCount,
        }
      : null
  );

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add-ons state
  const [addons, setAddons] = useState({
    journalSelection: false,
    formatting: true,
    graphicalAbstract: false,
    similarityCheck: true,
  });

  // Submission state: 'none' | 'price_locked' | 'enquiry_submitted'
  const [submissionType, setSubmissionType] = useState<'none' | 'price_locked' | 'enquiry_submitted'>('none');
  const [confirmationCode, setConfirmationCode] = useState('');

  // Sync when activeManuscript or initialWordCount changes
  useEffect(() => {
    if (activeManuscript) {
      setAttachedFile({
        name: activeManuscript.fileName,
        size: activeManuscript.fileSize,
        words: activeManuscript.wordCount,
      });
      setWordCount(activeManuscript.wordCount);
    } else {
      setWordCount(initialWordCount);
    }
  }, [activeManuscript, initialWordCount, isOpen]);

  // Reset submission type on open
  useEffect(() => {
    if (isOpen) {
      setSubmissionType('none');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Base rate calculation
  const isJournalSelection = serviceId === 'journal_selection';
  const baseRatePerWord = isJournalSelection ? 0.022 : serviceId === 'premium_editing' ? 0.026 : 0.021;
  const speedMultipliers = {
    standard: 1.0,
    express: 1.25,
    super_express: 1.5,
  };

  const editingBase = Math.round(wordCount * baseRatePerWord * speedMultipliers[speed]);
  const formattingCost = addons.formatting ? 85 : 0;
  const journalCost = addons.journalSelection ? 160 : 0;
  const abstractCost = addons.graphicalAbstract ? 220 : 0;
  const similarityCost = addons.similarityCheck ? 45 : 0;

  const totalEstimate = editingBase + formattingCost + journalCost + abstractCost + similarityCost;

  const toggleAddon = (key: keyof typeof addons) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // File upload handlers (optional)
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
      const newFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        words: 11840,
      };
      setAttachedFile(newFile);
      setWordCount(11840);
      onUploadManuscript?.(newFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        words: 11840,
      };
      setAttachedFile(newFile);
      setWordCount(11840);
      onUploadManuscript?.(newFile);
    }
  };

  const handleAttachSample = () => {
    const sample = {
      name: 'nanomedicine_targeted_delivery_v2.docx',
      size: '4.8 MB',
      words: 11840,
    };
    setAttachedFile(sample);
    setWordCount(11840);
    onUploadManuscript?.(sample);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
  };

  // CTA 1: Lock Price
  const handleLockPrice = () => {
    const code = 'LCK-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(code);
    setSubmissionType('price_locked');
  };

  // CTA 2: Submit Enquiry
  const handleSubmitEnquiry = () => {
    const code = 'ENQ-' + Math.floor(10000 + Math.random() * 90000);
    setConfirmationCode(code);
    setSubmissionType('enquiry_submitted');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200 my-4 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0052CC]" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
              Instant Quote & Publication Package Configurator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: scrolls if content is tall */}
        <div className="overflow-y-auto flex-1">
          {submissionType === 'price_locked' ? (
            /* ================= STATE 1: PRICE LOCKED ================= */
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                <Lock className="w-8 h-8 stroke-[2.2]" />
              </div>
              
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
                7-Day Price Lock Active · #{confirmationCode}
              </span>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                Price Locked for 7 Days!
              </h4>

              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your price of <strong className="text-slate-900 font-tabular">${totalEstimate} USD</strong> has been locked with all included institutional discounts. You can submit your manuscript draft anytime within the next 7 days without price changes.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 font-tabular">
                <div className="flex justify-between text-slate-600">
                  <span>Price Lock Guarantee:</span>
                  <span className="font-bold text-slate-900">Guaranteed until {new Date(Date.now() + 7 * 86400000).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Target Word Count:</span>
                  <span className="font-bold text-slate-900">{wordCount.toLocaleString()} words</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Manuscript Attached:</span>
                  <span className="font-semibold text-slate-900">
                    {attachedFile ? attachedFile.name : 'Not yet uploaded (Upload when ready)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Re-editing Guarantee:</span>
                  <span className="font-bold text-emerald-700">365-Day Free Unlimited Re-editing</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Return to Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Official Price Lock Certificate #${confirmationCode} downloaded.`)}
                  className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download Price Lock Certificate</span>
                </button>
              </div>
            </div>
          ) : submissionType === 'enquiry_submitted' ? (
            /* ================= STATE 2: ENQUIRY SUBMITTED ================= */
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center mx-auto mb-4 ring-8 ring-blue-50">
                <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#0052CC] mb-2">
                Enquiry Active · #{confirmationCode}
              </span>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
                Enquiry Submitted Successfully!
              </h4>

              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                An assigned PhD Academic Managing Editor and publishing specialist will review your manuscript scope and reply within <strong>60 minutes</strong>.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 font-tabular">
                <div className="flex justify-between text-slate-600">
                  <span>Enquiry Reference:</span>
                  <span className="font-bold text-slate-900">#{confirmationCode}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Indicative Quote Amount:</span>
                  <span className="font-bold text-[#0052CC]">${totalEstimate} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Manuscript Status:</span>
                  <span className="font-semibold text-slate-900">
                    {attachedFile ? `Attached (${attachedFile.name})` : 'Word count provided (Upload draft anytime)'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Response SLA:</span>
                  <span className="font-semibold text-emerald-700">Within 60 Minutes (Academic Desk)</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* ================= CONFIGURE QUOTE FORM ================= */
            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column (7 cols): Parameters Configuration */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* 1. MANUSCRIPT UPLOAD (STRICTLY OPTIONAL ONLY) */}
                  <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#0052CC]" />
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Upload Manuscript
                        </label>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        Optional
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-2.5 leading-relaxed">
                      Upload your draft to let editors inspect your actual paper, or simply estimate quote by word count.
                    </p>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      accept=".docx,.doc,.pdf"
                      className="hidden"
                    />

                    {attachedFile ? (
                      /* File Attached Card */
                      <div className="p-2.5 rounded-lg bg-white border border-emerald-300 shadow-2xs flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 truncate">
                            <div className="text-xs font-semibold text-slate-900 truncate">
                              {attachedFile.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-tabular">
                              {attachedFile.size} · {attachedFile.words.toLocaleString()} words
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2 py-1 text-[11px] font-semibold text-[#0052CC] hover:bg-blue-50 rounded"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Remove attached file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Drag & Drop Optional Zone */
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${
                          isDragging
                            ? 'border-[#0052CC] bg-blue-50/50'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <UploadCloud className="w-4 h-4 text-slate-400" />
                          <span className="text-xs text-slate-600 font-medium">
                            Drag & drop DOCX / PDF here (Optional)
                          </span>
                        </div>
                        
                        <div className="mt-2 flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded shadow-2xs"
                          >
                            Browse file
                          </button>
                          <button
                            type="button"
                            onClick={handleAttachSample}
                            className="text-xs text-[#0052CC] hover:underline font-semibold"
                          >
                            Use sample manuscript
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Word Count Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Manuscript Word Count
                      </label>
                      <span className="text-sm font-bold text-[#0052CC] font-tabular">
                        {wordCount.toLocaleString()} words
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="25000"
                      step="200"
                      value={wordCount}
                      onChange={(e) => setWordCount(Number(e.target.value))}
                      className="w-full accent-[#0052CC] h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-tabular">
                      <span>1,000 words</span>
                      <span>12,000 words (Typical)</span>
                      <span>25,000 words</span>
                    </div>
                  </div>

                  {/* 3. Turnaround Speed */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                      Turnaround Speed
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSpeed('standard')}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          speed === 'standard'
                            ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Standard</div>
                        <div className="text-[10px] text-slate-500">5 business days</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSpeed('express')}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          speed === 'express'
                            ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Express</div>
                        <div className="text-[10px] text-slate-500">3 business days</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSpeed('super_express')}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          speed === 'super_express'
                            ? 'border-[#0052CC] bg-blue-50/50 ring-1 ring-[#0052CC]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">Urgent</div>
                        <div className="text-[10px] text-slate-500">24–48 hours</div>
                      </button>
                    </div>
                  </div>

                  {/* 4. COMPLETE YOUR SUBMISSION PACKAGE (SERVICES BASED ON THE MANUSCRIPT) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Complete Your Submission Package
                      </label>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Based on your manuscript</span>
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-2">
                      {attachedFile
                        ? `Add-on services tailored for "${attachedFile.name}" (${wordCount.toLocaleString()} words)`
                        : `Recommended add-ons to eliminate desk rejection before journal submission`}
                    </p>

                    <div className="space-y-2">
                      {/* Formatting - Based on target journal */}
                      <button
                        type="button"
                        onClick={() => toggleAddon('formatting')}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                          addons.formatting ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">Target Journal Formatting</span>
                            <span className="text-[9px] uppercase font-bold text-[#0052CC] bg-blue-100/60 px-1 rounded">
                              Manuscript Fit
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            {activeManuscript?.targetJournal
                              ? `Aligns to ${activeManuscript.targetJournal.split('/')[0]} author guidelines`
                              : 'Formats layout, citations & reference styles (APA, IEEE, Vancouver)'}
                          </p>
                        </div>
                        <span className="font-bold text-slate-900 font-tabular shrink-0">+$85</span>
                      </button>

                      {/* Journal Selection - Based on manuscript scope */}
                      <button
                        type="button"
                        onClick={() => toggleAddon('journalSelection')}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                          addons.journalSelection ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">Journal Selection Match Report</span>
                            <span className="text-[9px] uppercase font-bold text-purple-700 bg-purple-100/60 px-1 rounded">
                              Indexed Scope
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            Shortlists 3–5 Q1/Q2 journals matched to your manuscript's exact study findings
                          </p>
                        </div>
                        <span className="font-bold text-slate-900 font-tabular shrink-0">+$160</span>
                      </button>

                      {/* Graphical Abstract - Based on manuscript discipline */}
                      <button
                        type="button"
                        onClick={() => toggleAddon('graphicalAbstract')}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                          addons.graphicalAbstract ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">Scientific Graphical Abstract</span>
                            <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-100/60 px-1 rounded">
                              Figures
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            Custom visual TOC artwork by PhD medical artists to boost journal citations
                          </p>
                        </div>
                        <span className="font-bold text-slate-900 font-tabular shrink-0">+$220</span>
                      </button>

                      {/* Similarity Check - Based on manuscript size */}
                      <button
                        type="button"
                        onClick={() => toggleAddon('similarityCheck')}
                        className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                          addons.similarityCheck ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">iThenticate Similarity & Plagiarism Check</span>
                            <span className="text-[9px] uppercase font-bold text-emerald-700 bg-emerald-100/60 px-1 rounded">
                              Crossref Audit
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            Journal-grade citation overlap scan recommended for {wordCount.toLocaleString()}-word draft
                          </p>
                        </div>
                        <span className="font-bold text-slate-900 font-tabular shrink-0">+$45</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Column (5 cols): Live Estimate & TWO DIFFERENT CTAs */}
                <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200 flex items-center justify-between">
                      <span>Transparent Price Breakdown</span>
                      <span className="text-[10px] text-slate-500 font-normal">All taxes included</span>
                    </h4>

                    <div className="space-y-2 mt-3.5 text-xs font-tabular">
                      <div className="flex justify-between text-slate-600">
                        <span>{isJournalSelection ? 'Journal Selection Support:' : 'Premium 2-Editor Review:'}</span>
                        <span className="font-semibold text-slate-900">${editingBase}</span>
                      </div>

                      {addons.formatting && (
                        <div className="flex justify-between text-slate-600">
                          <span>Target Journal Formatting:</span>
                          <span className="font-semibold text-slate-900">$85</span>
                        </div>
                      )}

                      {addons.journalSelection && (
                        <div className="flex justify-between text-slate-600">
                          <span>Journal Selection Report:</span>
                          <span className="font-semibold text-slate-900">$160</span>
                        </div>
                      )}

                      {addons.graphicalAbstract && (
                        <div className="flex justify-between text-slate-600">
                          <span>Graphical Abstract Artwork:</span>
                          <span className="font-semibold text-slate-900">$220</span>
                        </div>
                      )}

                      {addons.similarityCheck && (
                        <div className="flex justify-between text-slate-600">
                          <span>iThenticate Similarity:</span>
                          <span className="font-semibold text-slate-900">$45</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">Total Indicative Quote:</span>
                          <span className="text-[10px] text-slate-500">Includes institutional guarantee</span>
                        </div>
                        <span className="text-2xl font-extrabold text-[#0052CC]">
                          ${totalEstimate}
                          <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
                        </span>
                      </div>
                    </div>

                    {/* Guarantees Included */}
                    <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>365-Day Unlimited Free Re-Editing</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>Editage Publication Readiness Certificate</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                        <span>ISO 27001 Manuscript Confidentiality</span>
                      </div>
                    </div>
                  </div>

                  {/* TWO DIFFERENT CTAs AS REQUESTED:
                      1. Lock Price
                      2. Submit Enquiry
                  */}
                  <div className="pt-3 border-t border-slate-200 space-y-2.5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* CTA 1: LOCK PRICE */}
                      <button
                        type="button"
                        onClick={handleLockPrice}
                        className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        title="Guarantee this price for 7 days"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Price</span>
                      </button>

                      {/* CTA 2: SUBMIT ENQUIRY */}
                      <button
                        type="button"
                        onClick={handleSubmitEnquiry}
                        className="w-full py-2.5 px-3 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        title="Submit formal inquiry to academic editors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Enquiry</span>
                      </button>
                    </div>

                    {/* Subtext explaining difference */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                      <span>• Lock Price: 7-day rate freeze</span>
                      <span>• Submit Enquiry: 60-min review</span>
                    </div>

                    {/* Download Pro-Forma Invoice */}
                    <button
                      type="button"
                      onClick={() => alert(`Official University Pro-Forma Invoice for $${totalEstimate} generated for download.`)}
                      className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3 h-3 text-slate-500" />
                      <span>Download Pro-Forma Estimate (PDF)</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
