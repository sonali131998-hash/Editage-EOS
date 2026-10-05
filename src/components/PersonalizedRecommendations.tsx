import React from 'react';
import { UserState } from '../types';
import { 
  PRIMARY_RECOMMENDATION_NEW_USER, 
  SECONDARY_RECOMMENDATIONS_NEW_USER,
  RETURNING_USER_RECOMMENDATIONS,
  ASSETS 
} from '../data/mockData';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  FileCheck,
  BookOpen,
  Image as ImageIcon,
  Check
} from 'lucide-react';

interface PersonalizedRecommendationsProps {
  currentState: UserState;
  onOpenQuote: (serviceId: string) => void;
  onOpenWhyRecommended: (serviceId: string) => void;
}

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  currentState,
  onOpenQuote,
  onOpenWhyRecommended,
}) => {
  const isReturningUser = currentState === 'STATE_C';
  
  // Select data set according to user state
  const primaryService = isReturningUser 
    ? RETURNING_USER_RECOMMENDATIONS[0] 
    : PRIMARY_RECOMMENDATION_NEW_USER;

  const secondaryServices = isReturningUser 
    ? RETURNING_USER_RECOMMENDATIONS.slice(1) 
    : SECONDARY_RECOMMENDATIONS_NEW_USER;

  return (
    <section id="recommendations-section" className="py-10 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0052CC] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Service Matching</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            {isReturningUser
              ? 'Recommended Next Steps for Your Edited Manuscript'
              : 'Recommended for Your Manuscript'}
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-3xl">
            {isReturningUser
              ? 'Based on your completed English Editing order for CRISPR_microbiome_dynamics_v3.docx, here is the curated sequence to maximize journal acceptance.'
              : 'Based on your manuscript assessment and current preparation stage, here is what we recommend to maximize acceptance probability.'}
          </p>
        </div>

        {/* PRIMARY RECOMMENDATION CARD (Large, Prominent, High-Conversion) */}
        <div className="bg-white rounded-xl border-2 border-[#0052CC]/40 hover:border-[#0052CC] transition-all shadow-sm overflow-hidden mb-10">
          
          {/* Top Banner with Badge and Rationale Lead */}
          <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white px-6 py-3.5 border-b border-blue-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide bg-[#0052CC] text-white">
                {primaryService.badge || 'BEST MATCH'}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {primaryService.stageRelevance}
              </span>
            </div>

            <button
              onClick={() => onOpenWhyRecommended(primaryService.id)}
              className="text-xs text-[#0052CC] hover:text-[#0041A3] font-semibold flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Why this is recommended</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (8 cols): Title, Rationale explanation, Features */}
              <div className="lg:col-span-8">
                
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
                  {primaryService.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {primaryService.subtitle}
                </p>

                {/* Explicit "Recommended because" list — extremely important per prompt */}
                <div className="mt-5 p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended because:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {primaryService.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC] mt-1.5 shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables / What the researcher gets */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                    What you receive in this package:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {primaryService.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Pricing Box, Turnaround & CTAs */}
              <div className="lg:col-span-4 bg-slate-50/80 rounded-xl p-5 border border-slate-200 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <span className="text-xs font-medium text-slate-500">Indicative Pricing</span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Transparent Quote
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-500">Starting from</span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-tabular">
                        ${primaryService.startingPrice}
                      </span>
                    </div>
                    {primaryService.pricePerWord && (
                      <p className="text-[11px] text-slate-500 mt-0.5 font-tabular">
                        ≈ ${primaryService.pricePerWord}/word based on your manuscript length
                      </p>
                    )}
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Estimated turnaround:</span>
                      </span>
                      <span className="font-semibold text-slate-800">{primaryService.turnaround}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>Re-editing guarantee:</span>
                      </span>
                      <span className="font-semibold text-slate-800">365 Days Unlimited</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2">
                  <button
                    onClick={() => onOpenQuote(primaryService.id)}
                    className="w-full py-2.5 px-4 bg-[#0052CC] hover:bg-[#0047B3] active:bg-[#003B94] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Get an instant quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenWhyRecommended(primaryService.id)}
                    className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Why this is recommended</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* NEXT BEST ACTIONS: COMPLETE YOUR SUBMISSION JOURNEY */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Complete Your Submission Journey
              </h3>
              <p className="text-xs text-slate-500">
                Recommended complementary steps to ensure acceptance without reviewer friction.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Step-by-step downstream support
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {secondaryServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs flex flex-col justify-between transition-all hover:shadow-sm"
              >
                <div>
                  {/* Status / Category tag */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      service.badge?.includes('RECOMMENDED')
                        ? 'bg-blue-50 text-[#0052CC]'
                        : service.badge?.includes('HIGHLY')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {service.badge || 'RECOMMENDED AT YOUR STAGE'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 font-tabular">
                      From ${service.startingPrice}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h4>

                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {service.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Turnaround and CTA */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Est. {service.turnaround}
                  </span>

                  <button
                    onClick={() => onOpenQuote(service.id)}
                    className="text-xs font-semibold text-[#0052CC] hover:text-[#0041A3] flex items-center gap-1 transition-colors"
                  >
                    <span>Add to enquiry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
