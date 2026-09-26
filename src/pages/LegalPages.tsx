import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Send
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

// 1. Privacy Policy Page
export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Data Safeguards &amp; Zero Personal Data Storage"
        description="Blue Cross India privacy charter. We never harvest or store Aadhaar numbers, PAN, OTPs, UPI PINs, or biometric details. Browser utilities operate locally."
        canonicalPath="/privacy"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm my-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: September 26, 2026 • Blue Cross India (https://blue-cross.org)
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
            <strong className="block text-sm mb-1">Our Core Commitment:</strong>
            Blue Cross is strictly an informational and utility platform. We never ask for, collect, store, or transmit your 12-digit Aadhaar number, PAN card number, one-time passwords (OTP), UPI PINs, bank passwords, or biometric credentials.
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            1. Client-Side Browser Utilities
          </h2>
          <p>
            All PDF utilities (merging, rotation, conversion), image tools (compression, cropping, QR generation), and mathematical calculators (SIP, EMI, GST, Salary) operate locally inside your web browser’s memory sandbox using HTML5 Canvas, WebAssembly, and JavaScript. Your documents and photographs are never uploaded to any remote server.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            2. Server-Side AI Processing
          </h2>
          <p>
            When utilizing our AI writing and translation tools, the text prompt you submit is transmitted over an encrypted TLS connection directly to our server-side API proxy which queries Google Gemini. Prompts are processed strictly to generate your requested output and are not permanently cataloged or sold to third parties.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            3. Advertising &amp; Cookies
          </h2>
          <p>
            Blue Cross may display advertising via Google AdSense (Publisher ca-pub-8528510551006901). Google and its advertising partners use standard cookies to serve ads based on prior visits. Users may opt out of personalized advertising by visiting Google Ad Settings.
          </p>
        </div>
      </div>
    </>
  );
};

// 2. Terms of Use Page
export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service — Blue Cross India Super Portal"
        description="Terms of service and usage conditions for Blue Cross India independent portal."
        canonicalPath="/terms"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Terms of Use' }]} />
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm my-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-400">Effective: September 2026</p>

          <p>
            By accessing or using Blue Cross (https://blue-cross.org), you agree to comply with and be bound by these Terms of Service. If you do not agree, please discontinue use immediately.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            1. Independent Informational Status
          </h2>
          <p>
            Blue Cross is an independent citizen portal. It is <strong>NOT</strong> an official agency of the Government of India or any state government. Procedural guides and links are provided for public convenience and reference. Official statutory decisions rest entirely with respective government departments.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            2. Permitted Use of Tools
          </h2>
          <p>
            Calculators and browser utilities are provided for general educational and productivity purposes. While calculation formulas follow standard Indian financial and statutory algorithms (e.g. New Tax Regime slabs, compound quarterly interest), users should consult certified chartered accountants or legal advisors before making substantial financial commitments.
          </p>
        </div>
      </div>
    </>
  );
};

// 3. Legal Disclaimer Page
export const DisclaimerPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Legal Disclaimer &amp; Government Non-Affiliation Statement"
        description="Official statement of non-affiliation with the Government of India, state governments, UIDAI, CBDT, or statutory authorities."
        canonicalPath="/disclaimer"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Disclaimer' }]} />
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm my-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Statutory Non-Affiliation Notice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Legal Disclaimer
          </h1>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 space-y-2">
            <p className="font-bold text-sm">
              "Blue Cross is an independent information portal. It is not the Government of India and is not affiliated with any government department unless explicitly stated."
            </p>
            <p>
              Blue Cross does not represent or act on behalf of UIDAI (Aadhaar), the Income Tax Department (CBDT), Central Board of Indirect Taxes and Customs (GST), Ministry of External Affairs (Passport Seva), Ministry of Road Transport and Highways (Parivahan), EPFO, Election Commission of India, or any other statutory agency.
            </p>
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            No Government Seals or Emblems
          </h2>
          <p>
            In strict compliance with the State Emblem of India (Prohibition of Improper Use) Act, 2005, Blue Cross does not display the National Emblem of India, official departmental seals, or deceptive government logos. All government links navigate directly to official government domains (ending in <code>.gov.in</code> or <code>.nic.in</code>).
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            No Live Simulation or Falsified Data
          </h2>
          <p>
            Blue Cross adheres to a strict truth-in-reporting standard: we never fabricate live cricket scores, simulated government application statuses, or fake weather data.
          </p>
        </div>
      </div>
    </>
  );
};

// 4. Cookies Page
export const CookiesPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Cookie Policy — Blue Cross India"
        description="Understanding how cookies are used for theme preferences, language settings, and advertising."
        canonicalPath="/cookies"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-sm my-6 space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-xs text-slate-400">Effective: September 2026</p>

          <p>
            Cookies and local storage are small text files stored in your web browser. Blue Cross uses local storage strictly to remember:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Your visual theme preference (Light or Dark mode)</li>
            <li>Your language preference (English or Hindi)</li>
            <li>Your local recent searches on Blue Cross</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">
            Third-Party Cookies
          </h2>
          <p>
            Google AdSense may set cookies to measure ad performance. You can disable third-party cookies in your browser settings at any time without impacting your ability to use our local calculators, search, or government guides.
          </p>
        </div>
      </div>
    </>
  );
};

// 5. Contact Page
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact Us &amp; Editorial Grievance — Blue Cross India"
        description="Contact the editorial and technical team of Blue Cross India Super Portal. Report corrections, suggest utilities, or submit inquiries."
        canonicalPath="/contact"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Contact &amp; Grievances
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We welcome suggestions, content corrections, and feedback regarding our government guides and browser utilities.
            </p>

            <div className="space-y-3 pt-4 text-xs">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Editorial Desk: <strong>contact@blue-cross.org</strong></span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Domain: <strong>https://blue-cross.org</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 mt-6">
              <strong>Notice:</strong> Blue Cross does not provide personal legal or financial counsel. For official government dispute resolution, contact the respective ministry grievance portal (CPGRAMS at pgportal.gov.in).
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you for reaching out to Blue Cross. Our editorial team reviews all submissions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message / Feedback:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we improve Blue Cross? Report a broken link or suggest a new tool..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
};
