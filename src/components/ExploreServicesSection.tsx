import React, { useState } from 'react';
import { ALL_SERVICES_CATALOG } from '../data/mockData';
import { ChevronRight, ArrowUpRight, Search, Sparkles } from 'lucide-react';

interface ExploreServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ExploreServicesSection: React.FC<ExploreServicesSectionProps> = ({
  onSelectService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...ALL_SERVICES_CATALOG.map((c) => c.category)];

  const filteredCategories = ALL_SERVICES_CATALOG.filter((cat) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return false;
    }
    return true;
  }).map((cat) => ({
    ...cat,
    services: cat.services.filter((svc) =>
      searchQuery === ''
        ? true
        : svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          svc.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.services.length > 0);

  return (
    <section id="explore-services-section" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Comprehensive Portfolio
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Looking for something else?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Browse our full catalog of publishing, translation, and academic design solutions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all services..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0052CC] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((group) => (
            <div key={group.category} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-slate-400 font-medium lowercase font-tabular text-[11px]">
                  {group.services.length} options
                </span>
              </h3>

              <div className="divide-y divide-slate-100 mt-2">
                {group.services.map((svc) => (
                  <div
                    key={svc.name}
                    onClick={() => onSelectService(svc.name)}
                    className="py-3 group cursor-pointer flex items-center justify-between gap-3 hover:translate-x-0.5 transition-transform"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0052CC] transition-colors">
                        {svc.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {svc.desc}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#0052CC] shrink-0 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
