import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Landmark,
  Search,
  ShieldCheck,
  CreditCard,
  FileText,
  FileCheck2,
  Building2,
  HeartHandshake,
  GraduationCap,
  Briefcase,
  Compass,
  Train,
  Plane,
  MapPin,
  Car,
  ExternalLink,
  Lock,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { GOVERNMENT_SERVICES } from '../data/governmentServices';

export const IndiaHubPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/india/find-service?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const coreServices = [
    { title: 'Aadhaar (UIDAI)', path: '/india/aadhaar', icon: ShieldCheck, desc: 'e-Aadhaar download, PVC card order, address & document update', color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' },
    { title: 'PAN Card Portal', path: '/india/pan', icon: CreditCard, desc: 'Instant paperless e-PAN, PAN correction, Aadhaar-PAN linking', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' },
    { title: 'Income Tax (ITR)', path: '/india/income-tax', icon: FileText, desc: 'ITR e-Filing guidelines, FY 25-26 tax slabs, AIS/TIS review', color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60' },
    { title: 'GST Registration', path: '/india/gst', icon: FileCheck2, desc: 'GSTIN search & verification, return filing dates, e-Way bills', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60' },
    { title: 'Udyam MSME', path: '/india/udyam', icon: Building2, desc: 'Zero fee MSME registration certificate, subsidies & loans', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
    { title: 'Govt Schemes', path: '/india/schemes', icon: HeartHandshake, desc: 'PM Kisan, Ayushman Bharat, PMAY Housing, PM SVANidhi', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60' },
    { title: 'Scholarships Portal', path: '/india/scholarships', icon: GraduationCap, desc: 'National Scholarship Portal (NSP), Central & State grants', color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
    { title: 'Sarkari Jobs', path: '/india/jobs', icon: Briefcase, desc: 'Official notifications for UPSC, SSC, Railways & Banking', color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60' },
    { title: 'Passport Seva', path: '/india/passport', icon: Compass, desc: 'Fresh passport, PSK appointment, Tatkaal & police check', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60' },
    { title: 'Driving Licence / RTO', path: '/india/rto', icon: Car, desc: 'Parivahan Sarathi learner licence, driving test, RC & challans', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/60' },
    { title: 'EPFO & UAN', path: '/india/epfo', icon: ShieldCheck, desc: 'EPF passbook check, online claim forms (19, 10C, 31) & pension', color: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60' },
    { title: 'Banking & IFSC', path: '/india/banking', icon: Building2, desc: 'All India IFSC / MICR finder, bank holiday list, UPI safety', color: 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60' },
    { title: 'Railways & PNR', path: '/india/railways', icon: Train, desc: 'PNR status enquiry architecture, train schedules & IRCTC link', color: 'text-red-600 bg-red-50 dark:bg-red-950/60' },
    { title: 'Flights & Airports', path: '/india/flights', icon: Plane, desc: 'Indian airport directories, flight arrival & departure tracker', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60' },
    { title: 'All India Pincode', path: '/india/pincode', icon: MapPin, desc: '150,000+ postal pincodes and post office branch lookup', color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60' },
    { title: '28 States & 8 UTs', path: '/india/states', icon: Landmark, desc: 'Complete directory of State government e-District portals', color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60' },
  ];

  return (
    <>
      <SEOHead
        title="India Super Hub — Central & State Government Services Directory"
        description="Official procedural guidelines and direct portal access for Aadhaar, PAN, Income Tax, GST, Udyam MSME, Welfare Schemes, Driving Licence, and Passport Seva."
        canonicalPath="/india"
        breadcrumbs={[
          { label: 'India Super Hub' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'India Super Hub', url: '/india' }]} />

        {/* Hero Banner */}
        <div className="my-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <Landmark className="w-4 h-4 text-blue-600" />
            <span>Independent Citizen Information Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            India Government Services &amp; Citizen Directory
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Comprehensive guides on eligibility, required documents, step-by-step applications, and authorized links to official Government of India portals.
          </p>

          {/* Quick Find Service Input */}
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-6">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What government service are you looking for?..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm shadow-md"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
            >
              Find Service
            </button>
          </form>
        </div>

        {/* Mandatory Independence & Security Disclaimer according to Rule 18 */}
        <div className="p-5 mb-10 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start gap-3.5 shadow-sm">
          <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-100">
              Crucial Citizen Information &amp; Data Security Safeguards
            </h4>
            <p>
              "Blue Cross is an independent information portal. It is not the Government of India and is not affiliated with any government department unless explicitly stated."
            </p>
            <p className="text-amber-800 dark:text-amber-300 font-medium pt-1">
              Blue Cross NEVER requests or stores Aadhaar numbers, PAN numbers, OTP codes, UPI PINs, bank passwords, or biometric information. We only redirect you to verified official gov.in and nic.in websites.
            </p>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <Link
                key={srv.title}
                to={srv.path}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition ${srv.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>View Procedures</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
