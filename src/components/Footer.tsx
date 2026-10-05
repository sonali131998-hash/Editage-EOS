import React from 'react';
import { ShieldCheck, Award, Globe, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071322] text-slate-400 text-xs border-t border-slate-800/80 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top credentials row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0052CC] shrink-0" />
            <div>
              <div className="font-semibold text-white">ISO/IEC 27001 Certified</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Enterprise security & data confidentiality</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#0052CC] shrink-0" />
            <div>
              <div className="font-semibold text-white">500,000+ Researchers</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Serving academics in 192 countries</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#0052CC] shrink-0" />
            <div>
              <div className="font-semibold text-white">Global PhD Editors</div>
              <p className="text-[11px] text-slate-500 mt-0.5">1,200+ native English field specialists</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#0052CC] shrink-0" />
            <div>
              <div className="font-semibold text-white">100% NDA Protection</div>
              <p className="text-[11px] text-slate-500 mt-0.5">Strict researcher privacy guarantee</p>
            </div>
          </div>
        </div>

        {/* Links & Brand */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#0052CC] flex items-center justify-center font-bold text-white text-xs">
                e
              </div>
              <span className="text-white font-bold text-base tracking-tight">editage</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-medium">Editage Online System (EOS)</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-md">
              A flagship brand of Cactus Communications. Trusted by leading universities, academic societies, and major scholarly publishers worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <a href="#confidentiality" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Confidentiality Policy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Information Security</a>
            <span>·</span>
            <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">24/7 Editorial Helpdesk</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-slate-600 text-[10px]">
          © {new Date().getFullYear()} Cactus Communications. All Rights Reserved. Editage is a registered trademark of Cactus Communications.
        </div>

      </div>
    </footer>
  );
};
