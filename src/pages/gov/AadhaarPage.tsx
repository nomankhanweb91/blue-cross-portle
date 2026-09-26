import React from 'react';
import {
  ShieldCheck,
  ExternalLink,
  CreditCard,
  FileText,
  Lock,
  Smartphone,
  MapPin,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Download
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { AdSlot } from '../../components/common/AdSlot';

export const AadhaarPage: React.FC = () => {
  const aadhaarServices = [
    { title: 'Download e-Aadhaar (PDF)', url: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar', desc: 'Download password-protected official PDF copy. Password is 4 letters of name + 4 digit birth year.', fee: 'Free (₹0)' },
    { title: 'Order Aadhaar PVC Card', url: 'https://myaadhaar.uidai.gov.in/genricPVC', desc: 'Pocket-sized durable plastic card with hologram and microtext delivered via India Post Speed Post.', fee: '₹50 (inclusive of delivery)' },
    { title: 'Aadhaar Document Update', url: 'https://myaadhaar.uidai.gov.in', desc: 'Upload latest Proof of Identity (POI) and Proof of Address (POA) documents to keep record active.', fee: 'Free / ₹50' },
    { title: 'Online Address Update', url: 'https://myaadhaar.uidai.gov.in', desc: 'Update residential address online with valid electricity bill, rent agreement, bank passbook, or passport.', fee: '₹50' },
    { title: 'Biometric Lock / Unlock', url: 'https://myaadhaar.uidai.gov.in/lock-unlock-aadhaar', desc: 'Safeguard your biometric data against misuse by toggling fingerprint and iris authentication lock.', fee: 'Free (₹0)' },
    { title: 'Check Enrolment / Update Status', url: 'https://myaadhaar.uidai.gov.in/check-aadhaar-status', desc: 'Track 14-digit Service Request Number (SRN) or 28-digit Enrolment ID (EID) updates in real time.', fee: 'Free (₹0)' },
    { title: 'Locate Aadhaar Seva Kendra', url: 'https://bhaashainmyaadhaar.uidai.gov.in/locate-enrolment-center', desc: 'Find nearest authorized permanent bank, post office, or BSNL Aadhaar enrolment center.', fee: 'Free (₹0)' },
    { title: 'Book an Appointment at ASK', url: 'https://appointments.uidai.gov.in/bookappointment.aspx', desc: 'Reserve time slot for biometric update, mobile number linkage, or photo change to avoid queues.', fee: 'Free booking' },
    { title: 'Virtual ID (VID) Generator', url: 'https://myaadhaar.uidai.gov.in/vid-generation', desc: 'Generate 16-digit revocable mask code to perform KYC without revealing your 12-digit Aadhaar number.', fee: 'Free (₹0)' },
    { title: 'Aadhaar Verification (Verify Aadhaar)', url: 'https://myaadhaar.uidai.gov.in/verify-aadhaar', desc: 'Verify whether an Aadhaar number exists, is valid, and matches age band, gender, and state.', fee: 'Free (₹0)' },
    { title: 'Mobile & Email Update Information', url: 'https://uidai.gov.in', desc: 'Biometric re-authentication at an Aadhaar Seva Kendra is mandatory to link or change your mobile number.', fee: '₹50 at Center' },
    { title: 'UIDAI Toll-Free Helpline (1947)', url: 'tel:1947', desc: '24x7 all-India citizen grievance helpline supporting 12 Indian regional languages.', fee: 'Toll-Free' },
  ];

  const faqs = [
    { q: 'Can I change my mobile number linked with Aadhaar online?', a: 'No. As per UIDAI statutory security directives, updating or linking a new mobile number requires in-person biometric verification (fingerprint or iris) at an authorized Aadhaar Seva Kendra or post office.' },
    { q: 'What is the password format for e-Aadhaar PDF?', a: 'The 8-character password consists of the first 4 letters of your name in CAPITAL LETTERS as printed on the card, followed immediately by your 4-digit Year of Birth (e.g. SURESH born in 1990 = SURE1990).' },
    { q: 'What is a Masked Aadhaar?', a: 'Masked Aadhaar hides the first 8 digits of your Aadhaar number (e.g., XXXX-XXXX-1234) while displaying only the last 4 digits and photograph. It is legally valid for identity verification without exposing full biometric identity numbers.' },
  ];

  return (
    <>
      <SEOHead
        title="Aadhaar Services Guide — e-Aadhaar Download, PVC Card, Status & Updates"
        description="Complete UIDAI citizen guide for downloading e-Aadhaar, ordering PVC cards, updating address, checking enrolment status, and biometric locking on myAadhaar."
        canonicalPath="/india/aadhaar"
        breadcrumbs={[
          { label: 'India Hub', url: '/india' },
          { label: 'Aadhaar Services' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'India Hub', url: '/india' },
            { label: 'Aadhaar (UIDAI)' },
          ]}
        />

        {/* Page Title */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>UIDAI Citizen Services Portal Guide</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Aadhaar Online Services &amp; Information
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Procedural guide to UIDAI's digital portal (myAadhaar). Direct official links for downloads, PVC card orders, address corrections, and security locks.
          </p>
        </div>

        {/* Security Warning */}
        <div className="p-4 mb-8 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 flex items-start gap-3 shadow-sm">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Strict Privacy Protection:</p>
            <p>
              Blue Cross is an independent guide and NEVER collects your 12-digit Aadhaar number, biometric data, or OTP. All transactions take place exclusively on official UIDAI servers (<code>myaadhaar.uidai.gov.in</code>).
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {aadhaarServices.map((srv, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-md transition shadow-sm"
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
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Open Official UIDAI Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions (Aadhaar Guidelines)
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
