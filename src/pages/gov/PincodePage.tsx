import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Mail,
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AdSlot } from '../../components/common/AdSlot';
import { searchPincodes, PincodeRecord } from '../../data/pincodesData';

export const PincodePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<PincodeRecord[]>(searchPincodes(''));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(searchPincodes(searchTerm));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setResults(searchPincodes(val));
  };

  return (
    <>
      <SEOHead
        title="All India Pincode Search — Post Office &amp; District Finder"
        description="Search 150,000+ Indian postal pincodes by 6-digit PIN code number, post office branch name, district, or state. Fast delivery status and postal division info."
        canonicalPath="/india/pincode"
        breadcrumbs={[
          { label: 'India Hub', url: '/india' },
          { label: 'Pincode Directory' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: 'Pincode Finder' },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>India Post Postal Index Number (PIN) Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            All India Pincode &amp; Post Office Finder
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Instant postal code lookup across Indian states and union territories. Verify delivery status, postal division, and post office head/sub-office designations.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search 6-digit Pincode, Post Office name, or District (e.g. 110001, Bandra, Powai)..."
              className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results List */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Matching Records ({results.length})
            </span>
            <a
              href="https://www.indiapost.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>India Post Official</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">PIN Code</th>
                  <th className="py-3 px-4">Post Office Name</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Delivery Status</th>
                  <th className="py-3 px-4">Postal Division</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {results.map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">
                      {r.pincode}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      {r.officeName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {r.district}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {r.state}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        r.deliveryStatus === 'Delivery'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      }`}>
                        {r.deliveryStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {r.division}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
