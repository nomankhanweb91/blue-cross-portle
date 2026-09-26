import React from 'react';
import {
  CreditCard,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AdSlot } from '../../components/common/AdSlot';

export const PanPage: React.FC = () => {
  const panServices = [
    { title: 'Instant e-PAN (Zero Fee)', url: 'https://eportal.incometax.gov.in', fee: 'Free (₹0)', desc: 'Instant paperless 10-digit PAN allotment within 10 minutes via Aadhaar e-KYC on the Income Tax e-Filing portal.' },
    { title: 'New PAN Card (Form 49A Physical)', url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html', fee: '₹107 (India) / ₹1,017 (Abroad)', desc: 'Application for physical laminated plastic card through Protean (NSDL) or UTIITSL with photo and signature upload.' },
    { title: 'PAN Correction & Changes', url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html', fee: '₹107', desc: 'Update misspelled name, incorrect date of birth, father’s name, or request replacement for damaged card.' },
    { title: 'Reprint Existing PAN Card', url: 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html', fee: '₹50', desc: 'Order an exact physical reprint of your existing PAN card with existing details dispatched to your communication address.' },
    { title: 'Track PAN Application Status', url: 'https://tin.tin.nsdl.com/pantan/StatusTrack.html', fee: 'Free (₹0)', desc: 'Track your 15-digit Acknowledgement Number to inspect dispatch status and Speed Post tracking number.' },
    { title: 'Link PAN with Aadhaar', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar', fee: '₹1,000 late fee challan', desc: 'Mandatory statutory linkage under Section 139AA to prevent PAN inoperability and avoid higher TDS deduction.' },
    { title: 'Check PAN-Aadhaar Link Status', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status', fee: 'Free (₹0)', desc: 'Verify whether your PAN is currently linked with your Aadhaar without entering passwords.' },
    { title: 'Verify Your PAN (Active / Inactive)', url: 'https://eportal.incometax.gov.in/iec/foservices/#/pre-login/verifyYourPANToken', fee: 'Free (₹0)', desc: 'Check if a PAN is registered in the CBDT database, its operational status, and legal name record.' },
  ];

  const faqs = [
    { q: 'Who is eligible for Instant e-PAN?', a: 'Any resident Indian who has never been allotted a PAN, possesses a valid 12-digit Aadhaar number with an active mobile number linked for OTP verification, and is not a minor.' },
    { q: 'What happens if PAN is not linked to Aadhaar?', a: 'An unlinked PAN becomes inoperative. Inoperative PANs cannot be used to file ITR, pending refunds are blocked, and banks/employers deduct TDS at the higher rate of 20%.' },
  ];

  return (
    <>
      <SEOHead
        title="PAN Card Services Guide — Apply Online, Instant e-PAN, Status & Linking"
        description="Official procedural guide for applying for a New PAN card, downloading instant e-PAN, PAN corrections, reprinting physical cards, and PAN-Aadhaar linking."
        canonicalPath="/india/pan"
        breadcrumbs={[
          { label: 'India Hub', url: '/india' },
          { label: 'PAN Card Services' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: 'PAN Services' },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <CreditCard className="w-4 h-4" />
            <span>Permanent Account Number (CBDT / NSDL / UTIITSL)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            PAN Card Online Services &amp; Application
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Procedural instructions for instant paperless e-PAN, physical Form 49A card issuance, corrections, reprints, and status verification.
          </p>
        </div>

        {/* Security Warning */}
        <div className="p-4 mb-8 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-200 flex items-start gap-3 shadow-sm">
          <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Strict Privacy Protection:</p>
            <p>
              Blue Cross never requests or collects your PAN, Aadhaar, or payment card details. All applications occur directly on official government servers (Protean NSDL, UTIITSL, or Income Tax Department).
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {panServices.map((srv, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-indigo-500 hover:shadow-md transition shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {srv.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full flex-shrink-0">
                    {srv.fee}
                  </span>
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
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions (PAN Cards)
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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

        <AdSlot layout="in-content" className="mt-12" />
      </div>
    </>
  );
};
