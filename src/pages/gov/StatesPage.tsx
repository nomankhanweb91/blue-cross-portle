import React, { useState } from 'react';
import {
  Landmark,
  Search,
  ExternalLink,
  MapPin,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AdSlot } from '../../components/common/AdSlot';
import { INDIAN_STATES_DATA } from '../../data/indianStatesData';

export const StatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'State' | 'Union Territory'>('All');

  const filteredStates = INDIAN_STATES_DATA.filter((st) => {
    const matchesFilter = filterType === 'All' || st.type === filterType;
    const matchesSearch = !searchQuery ||
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.highlightServices.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <SEOHead
        title="28 States &amp; 8 UTs Directory — Official State Government Portals India"
        description="Comprehensive directory of all 28 Indian States and 8 Union Territories. Direct links to state e-District citizen portals, land revenue records, state scholarships, and welfare schemes."
        canonicalPath="/india/states"
        breadcrumbs={[
          { label: 'India Hub', url: '/india' },
          { label: '28 States & 8 UTs' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: 'State Government Hub' },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4" />
            <span>State &amp; Union Territory Administration</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            28 States &amp; 8 Union Territories Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Verified official government portals, single-window e-District citizen platforms, land revenue records, and flagship state welfare schemes.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state, capital, or scheme..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold">
            {['All', 'State', 'Union Territory'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  filterType === type
                    ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {type === 'All' ? 'All (36)' : type === 'State' ? '28 States' : '8 Union Territories'}
              </button>
            ))}
          </div>
        </div>

        {/* States Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((st) => (
            <div
              key={st.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-violet-500 hover:shadow-md transition shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {st.name}
                  </h2>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                    {st.type}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Capital: <strong>{st.capital}</strong></span>
                  <span>•</span>
                  <span>{st.citizenServicesCount}+ Services</span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Flagship Services &amp; Portals:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {st.highlightServices.map((srv, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                        <span className="truncate">{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 text-xs">
                <a
                  href={st.servicePortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Citizen Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={st.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition flex items-center justify-center"
                  title="Official State Portal"
                >
                  <Building2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
