import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Search, ArrowUpRight } from 'lucide-react';
import { ALL_SERVICES_CATALOG } from '../data/mockData';

interface ExploreEditageBannerProps {
  onSelectService: (serviceName: string) => void;
}

export const ExploreEditageBanner: React.FC<ExploreEditageBannerProps> = ({
  onSelectService,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', ...ALL_SERVICES_CATALOG.map((c) => c.category)];

  const filtered = ALL_SERVICES_CATALOG.filter((cat) =>
    activeCategory === 'All' ? true : cat.category === activeCategory
  ).map((cat) => ({
    ...cat,
    services: cat.services.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.services.length > 0);

  return (
    <div className="pt-3.5 border-t border-slate-200">
      
      {/* Banner Exactly Matching the bottom of user screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            EXPLORE EDITAGE
          </span>
          
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Looking for something else?
          </h3>

          <p className="text-xs text-slate-500 mt-0.5">
            Editing · Publication Support · Research Tools · Graphics & Illustrations · Translation
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <span>View all solutions</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-600" />
          ) : (
            <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Expandable Services Directory */}
      {isExpanded && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs animate-in fade-in duration-200">
          
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0052CC] text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search solutions..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0052CC]"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((group) =>
              group.services.map((svc) => (
                <div
                  key={svc.name}
                  onClick={() => onSelectService(svc.name)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0052CC] bg-slate-50/50 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors leading-snug">
                        {svc.name}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0052CC] shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="mt-2 text-[10px] text-[#0052CC] font-bold">
                    Configure solution →
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
