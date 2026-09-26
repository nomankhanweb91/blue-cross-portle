import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  Compass,
  Hospital,
  Building,
  Shield,
  Train,
  Car,
  Laptop,
  Mail,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { mapsProvider } from '../providers/MapsProvider';

export const MapsPage: React.FC = () => {
  const [locationInput, setLocationInput] = useState('');
  const [targetQuery, setTargetQuery] = useState('New Delhi, India');

  const categories = mapsProvider.getCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      setTargetQuery(locationInput.trim());
    }
  };

  const openGoogleMaps = (query: string, action: 'search' | 'directions' = 'search') => {
    const url = mapsProvider.getDirectGoogleMapsUrl(query, action);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEOHead
        title="Essential Maps &amp; Nearby Citizen Centers — Blue Cross"
        description="Search essential citizen locations across India: Aadhaar Seva Kendras, Passport Offices, Post Offices, Hospitals, and RTO centers with Google Maps direction links."
        canonicalPath="/maps"
        breadcrumbs={[
          { label: 'Utilities', url: '/calculators' },
          { label: 'Maps' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Maps & Centers', url: '/maps' }]} />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Civic Amenities &amp; Center Finder</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Indian Citizen Centers &amp; Essential Maps
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Locate verified public service facilities, government enrolment centers, post offices, and emergency hospitals near your location.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city, locality, or pincode (e.g. Bandra Mumbai, Sector 62 Noida)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition"
            >
              Update Map
            </button>
          </form>
        </div>

        {/* Nearby Essential Categories Grid */}
        <div className="mb-10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Find Nearby Essential Centers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => openGoogleMaps(`${cat.queryTerm} near ${targetQuery}`)}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-md transition text-left flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-110 transition">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                    {cat.name}
                  </h4>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Google Map Embed Frame */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Map View: {targetQuery}
              </span>
              <p className="text-xs text-slate-500">
                Official Google Maps interface.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openGoogleMaps(targetQuery, 'search')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Open in App</span>
              </button>
              <button
                onClick={() => openGoogleMaps(targetQuery, 'directions')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </button>
            </div>
          </div>

          <div className="w-full h-96 bg-slate-100 dark:bg-slate-800 relative">
            <iframe
              title="Google Maps Location View"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(targetQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
