import React, { useState } from 'react';
import { ALL_SERVICES_CATALOG } from '../data/mockData';
import { ArrowUpRight, Search } from 'lucide-react';

interface QuickServicesGridProps {
  onSelectService: (serviceName: string) => void;
}

export const QuickServicesGrid: React.FC<QuickServicesGridProps> = ({
  onSelectService,
}) => {
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
    <div id="services-directory" className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden mt-6">
      
      {/* Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Editage Service Catalog & Quick Order
          </h3>
          <p className="text-[11px] text-slate-500">
            Browse specialized editorial, translation, and artwork services
          </p>
        </div>

        <div className="relative w-48 sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0052CC]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-[#0052CC] text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((group) =>
          group.services.map((svc) => (
            <div
              key={svc.name}
              onClick={() => onSelectService(svc.name)}
              className="p-3 rounded-lg border border-slate-200 hover:border-[#0052CC] bg-slate-50/40 hover:bg-white transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC] transition-colors leading-snug">
                    {svc.name}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0052CC] shrink-0 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>{group.category}</span>
                <span className="font-semibold text-[#0052CC] group-hover:underline">Configure →</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
