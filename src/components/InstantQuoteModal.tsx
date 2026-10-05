import React, { useState } from 'react';
import { X, Check, ShieldCheck, Clock, FileText, ArrowRight, Download, Send, CheckCircle2 } from 'lucide-react';

interface InstantQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  initialWordCount?: number;
}

export const InstantQuoteModal: React.FC<InstantQuoteModalProps> = ({
  isOpen,
  onClose,
  serviceId = 'premium_editing',
  initialWordCount = 11840,
}) => {
  const [wordCount, setWordCount] = useState<number>(initialWordCount);
  const [speed, setSpeed] = useState<'standard' | 'express' | 'super_express'>('standard');
  const [subject, setSubject] = useState<string>('Medicine & Life Sciences');

  const [addons, setAddons] = useState({
    journalSelection: false,
    formatting: true,
    graphicalAbstract: false,
    similarityCheck: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Base rate calculation
  const baseRatePerWord = serviceId === 'premium_editing' ? 0.026 : 0.021;
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

  const handleConfirmEnquiry = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep state open to let them review confirmation
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0052CC]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Instant Quote & Enquiry Configurator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900">
              Enquiry Submitted Successfully!
            </h4>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Your inquiry reference is <strong className="text-slate-900 font-tabular">#ENQ-90823</strong>. An assigned academic client specialist and PhD editor will review your manuscript scope within 60 minutes.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1.5 font-tabular">
              <div className="flex justify-between text-slate-500">
                <span>Locked Quote Amount:</span>
                <span className="font-bold text-slate-900">${totalEstimate} USD</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Target Word Count:</span>
                <span className="font-bold text-slate-900">{wordCount.toLocaleString()} words</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Re-editing Guarantee:</span>
                <span className="font-bold text-emerald-700">365 Days Unlimited</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0047B3] text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column (7 cols): Parameters Configuration */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Word Count Slider */}
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

                {/* Turnaround Speed */}
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

                {/* Academic Discipline */}
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                    Subject Area / Discipline
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0052CC] focus:outline-none"
                  >
                    <option value="Medicine & Life Sciences">Medicine & Life Sciences (Oncology, Genetics, Immunology)</option>
                    <option value="Physical Sciences & Chemistry">Physical Sciences & Engineering</option>
                    <option value="Social Sciences & Humanities">Social Sciences, Economics & Business</option>
                    <option value="Computer Science & Mathematics">Computer Science & Artificial Intelligence</option>
                  </select>
                </div>

                {/* Complementary Add-ons */}
                <div>
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                    Complete Your Submission Package
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleAddon('formatting')}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        addons.formatting ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-800">Target Journal Formatting</span>
                        <p className="text-[11px] text-slate-500">Align author instructions, references & citations</p>
                      </div>
                      <span className="font-bold text-slate-900 font-tabular">+$85</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleAddon('journalSelection')}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        addons.journalSelection ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-800">Journal Selection Match Report</span>
                        <p className="text-[11px] text-slate-500">Shortlist 3–5 journals with acceptance probability</p>
                      </div>
                      <span className="font-bold text-slate-900 font-tabular">+$160</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleAddon('graphicalAbstract')}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        addons.graphicalAbstract ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-800">Scientific Graphical Abstract</span>
                        <p className="text-[11px] text-slate-500">Custom TOC artwork by PhD medical illustrators</p>
                      </div>
                      <span className="font-bold text-slate-900 font-tabular">+$220</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleAddon('similarityCheck')}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        addons.similarityCheck ? 'bg-blue-50/40 border-[#0052CC]' : 'border-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-800">iThenticate Plagiarism Similarity Check</span>
                        <p className="text-[11px] text-slate-500">Official similarity percentage and overlap diagnostic</p>
                      </div>
                      <span className="font-bold text-slate-900 font-tabular">+$45</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column (5 cols): Live Estimate & Submit Actions */}
              <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200">
                    Transparent Price Breakdown
                  </h4>

                  <div className="space-y-2.5 mt-4 text-xs font-tabular">
                    <div className="flex justify-between text-slate-600">
                      <span>Premium 2-Editor Review:</span>
                      <span className="font-semibold text-slate-900">${editingBase}</span>
                    </div>

                    {addons.formatting && (
                      <div className="flex justify-between text-slate-600">
                        <span>Journal Formatting:</span>
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
                        <span>Graphical Abstract:</span>
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
                      <span className="text-xs font-bold text-slate-800">Total Indicative Quote:</span>
                      <span className="text-2xl font-extrabold text-[#0052CC]">
                        ${totalEstimate}
                        <span className="text-xs font-normal text-slate-500 ml-1">USD</span>
                      </span>
                    </div>
                  </div>

                  {/* Included Guarantees */}
                  <div className="mt-5 p-3 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
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
                      <span>ISO 27001 Manuscript Security Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                  <button
                    onClick={handleConfirmEnquiry}
                    className="w-full py-2.5 px-4 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Start Enquiry & Lock Price</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(`Official University Pro-Forma Invoice for $${totalEstimate} generated for download.`)}
                    className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download Pro-Forma Estimate (PDF)</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
