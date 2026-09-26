import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Landmark,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { GOVERNMENT_SERVICES, GovernmentContentProvider } from '../data/governmentServices';
import { GovernmentService } from '../types';

export const FindServicePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(GOVERNMENT_SERVICES.map((s) => s.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredServices = useMemo(() => {
    return GovernmentContentProvider.searchServices(query, {
      category: selectedCategory,
      level: selectedLevel,
    });
  }, [query, selectedCategory, selectedLevel]);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <SEOHead
        title="Find Government Service — All-India Official Citizen Directory"
        description="Filter and search official central and state government services in India. Eligibility criteria, required documents, application steps, fees, and tracking links."
        canonicalPath="/india/find-service"
        breadcrumbs={[
          { label: 'India Super Hub', url: '/india' },
          { label: 'Find Service' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: 'Find Service' },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4" />
            <span>Searchable Public Service Registry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Find Government Service
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Search what government service you need. Each verified record displays exact eligibility requirements, documents list, application steps, statutory fees, and verified tracking links.
          </p>
        </div>

        {/* Search & Filters Bar */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-1 relative">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Service or Department:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchParams(e.target.value ? { q: e.target.value } : {});
                  }}
                  placeholder="e.g. Aadhaar PVC, e-PAN, ITR, Driving Licence..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Jurisdiction Level Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Government Level:
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
              >
                <option value="All">All Levels (Central &amp; State)</option>
                <option value="Central">Central Government</option>
                <option value="State">State Government</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-4 text-xs text-slate-500 font-medium">
          Showing {filteredServices.length} verified government service records
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {filteredServices.map((service) => {
            const isExpanded = expandedCardId === service.id;
            return (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:border-blue-400 transition shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 flex-wrap">
                      <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[11px]">
                        {service.category}
                      </span>
                      <span>•</span>
                      <span>{service.department}</span>
                      <span className="bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.2 rounded text-[10px] font-semibold">
                        {service.level}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h2>
                    {service.titleHi && (
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {service.titleHi}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                    <a
                      href={service.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Key Quick Strip */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Statutory Fee:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{service.fee}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Status Tracking:</span>
                    {service.statusUrl ? (
                      <a href={service.statusUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                        <span>Check Status</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-500">Available on portal</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Last Verified:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{service.lastVerified}</span>
                  </div>
                </div>

                {/* Collapsible Details: Eligibility, Documents & Steps */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
                >
                  <span>{isExpanded ? 'Hide Steps & Documents' : 'View Application Steps & Required Documents'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    
                    {/* Eligibility & Documents */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                          Eligibility Criteria:
                        </h4>
                        <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                          {service.eligibility.map((el, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                          Required Documents:
                        </h4>
                        <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                          {service.documents.map((doc, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-Step Procedure */}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2">
                        How to Apply (Official Steps):
                      </h4>
                      <ol className="space-y-2 text-slate-600 dark:text-slate-300">
                        {service.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 rounded px-1.5 py-0.2 text-[10px]">
                              {i + 1}
                            </span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
