import React from 'react';
import {
  Landmark,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AdSlot } from '../../components/common/AdSlot';

export interface GovGuideConfig {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  department: string;
  officialUrl: string;
  statusUrl?: string;
  fee: string;
  lastVerified: string;
  services: {
    title: string;
    desc: string;
    url: string;
    fee?: string;
  }[];
  eligibility: string[];
  documents: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
}

interface GovUniversalGuidePageProps {
  config: GovGuideConfig;
}

export const GovUniversalGuidePage: React.FC<GovUniversalGuidePageProps> = ({ config }) => {
  return (
    <>
      <SEOHead
        title={`${config.title} — Official Information & Procedural Guide`}
        description={config.description}
        canonicalPath={`/india/${config.id}`}
        breadcrumbs={[
          { label: 'India Hub', url: '/india' },
          { label: config.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: config.title },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Landmark className="w-4 h-4" />
            <span>{config.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {config.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        {/* Security & Official Separation Disclaimer (Rules 18 & 61) */}
        <div className="p-4 mb-8 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">
              Official Government Separation &amp; Privacy Notice:
            </p>
            <p>
              Blue Cross is an independent citizen guide and is not affiliated with {config.department} or the Government of India.
              We never request, store, or process Aadhaar numbers, PAN, OTPs, or passwords.
            </p>
          </div>
        </div>

        {/* Quick Official Actions Strip */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            <div><strong>Department:</strong> {config.department}</div>
            <div><strong>Statutory Fee:</strong> {config.fee}</div>
            <div><strong>Last Verified:</strong> <span className="text-emerald-600 font-semibold">{config.lastVerified}</span></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={config.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {config.statusUrl && (
              <a
                href={config.statusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <span>Check Status</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Key Services Offered */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Key Digital Services &amp; Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.services.map((srv, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-blue-400 transition shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {srv.title}
                    </h3>
                    {srv.fee && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full flex-shrink-0">
                        {srv.fee}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={srv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Open Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procedure Grid: Eligibility, Documents & Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Eligibility & Documents */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                Eligibility Criteria
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {config.eligibility.map((el, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                Required Documents
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {config.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">
              Step-by-Step Application Procedure
            </h3>
            <ol className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {config.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 rounded-lg px-2 py-0.5 text-xs flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{st}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* FAQs */}
        {config.faqs && config.faqs.length > 0 && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {config.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
