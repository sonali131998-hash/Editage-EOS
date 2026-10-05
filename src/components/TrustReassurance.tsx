import React from 'react';
import { Eye, DollarSign, ShieldCheck, Headphones, CheckCircle2 } from 'lucide-react';

export const TrustReassurance: React.FC = () => {
  const assurances = [
    {
      icon: Eye,
      title: "Review Before Ordering",
      description: "Review detailed recommendations, turnaround times, and sample edits before making any commitment.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Exact word-based pricing with zero hidden fees. Instant downloadable invoice estimates for university grants.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Manuscript Handling",
      description: "ISO/IEC 27001 certified data protection, encrypted file transfer, and strict researcher NDAs.",
    },
    {
      icon: Headphones,
      title: "PhD Expert Support",
      description: "Direct messaging with your assigned subject-matter editor and dedicated academic client managers.",
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="text-xs font-semibold text-[#0052CC] uppercase tracking-wider">
            Researcher Trust & Protection
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
            You're in Complete Control
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Editage has supported over 500,000+ researchers across 192 countries with rigorous academic integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {assurances.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
