import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Lock } from 'lucide-react';
import { PWAInstallButton } from '../common/PWAInstallButton';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 text-sm mt-16 pb-20 xl:pb-10">
      
      {/* Disclaimer Strip */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">
                Official Government Disclaimer &amp; Privacy Safeguards
              </p>
              <p>
                <strong>Blue Cross (blue-cross.org)</strong> is an independent digital information and utility portal. It is <strong>NOT</strong> affiliated with, operated by, or endorsed by the Government of India, any state government, or statutory authority. All trademarks, service marks, and department names belong to their respective government custodians.
              </p>
              <p className="text-amber-400/90 font-medium">
                Security Guarantee: Blue Cross NEVER collects or stores your Aadhaar number, PAN, OTP, UPI PIN, biometric information, or bank credentials. Browser tools operate client-side.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <PWAInstallButton />
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 2h4v7h7v4h-7v7h-4v-7H3V9h7V2z" />
                </svg>
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                BLUE<span className="text-blue-400">CROSS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 max-w-sm">
              "Search. Tools. Information. India."
              <br />
              A high-performance citizen information platform engineered for fast search, authentic government service guidance, zero-upload local media tools, and financial calculators.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>TLS Encrypted • Browser Local Processing</span>
            </div>
          </div>

          {/* India Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              India Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/india" className="hover:text-white transition">India Super Hub</Link></li>
              <li><Link to="/india/find-service" className="hover:text-white transition">Find Gov Service</Link></li>
              <li><Link to="/india/aadhaar" className="hover:text-white transition">Aadhaar Services</Link></li>
              <li><Link to="/india/pan" className="hover:text-white transition">PAN &amp; e-PAN</Link></li>
              <li><Link to="/india/income-tax" className="hover:text-white transition">Income Tax (ITR)</Link></li>
              <li><Link to="/india/gst" className="hover:text-white transition">GST Portal</Link></li>
              <li><Link to="/india/udyam" className="hover:text-white transition">Udyam MSME</Link></li>
              <li><Link to="/india/states" className="hover:text-white transition">28 States &amp; 8 UTs</Link></li>
            </ul>
          </div>

          {/* Citizen Welfare */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Welfare &amp; Travel
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/india/schemes" className="hover:text-white transition">Govt Schemes</Link></li>
              <li><Link to="/india/scholarships" className="hover:text-white transition">National Scholarships</Link></li>
              <li><Link to="/india/jobs" className="hover:text-white transition">Sarkari Jobs</Link></li>
              <li><Link to="/india/passport" className="hover:text-white transition">Passport Seva</Link></li>
              <li><Link to="/india/rto" className="hover:text-white transition">Driving Licence / RTO</Link></li>
              <li><Link to="/india/epfo" className="hover:text-white transition">EPFO Passbook</Link></li>
              <li><Link to="/india/banking" className="hover:text-white transition">IFSC &amp; Banking</Link></li>
              <li><Link to="/india/pincode" className="hover:text-white transition">Pincode Directory</Link></li>
            </ul>
          </div>

          {/* Tools & Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Tools &amp; AI
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/ai" className="hover:text-white transition">AI Directory</Link></li>
              <li><Link to="/ai-tools" className="hover:text-white transition">AI Writing Tools</Link></li>
              <li><Link to="/pdf-tools" className="hover:text-white transition">PDF Tools (Offline)</Link></li>
              <li><Link to="/image-tools" className="hover:text-white transition">Image Tools &amp; QR</Link></li>
              <li><Link to="/developer-tools" className="hover:text-white transition">Developer Utilities</Link></li>
              <li><Link to="/calculators" className="hover:text-white transition">SIP &amp; Loan Calculators</Link></li>
              <li><Link to="/weather" className="hover:text-white transition">Live Weather &amp; AQI</Link></li>
              <li><Link to="/cricket" className="hover:text-white transition">Cricket Portal</Link></li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition">Legal Disclaimer</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact &amp; Grievance</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">XML Sitemap</a></li>
              <li><a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Robots.txt</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and attributes */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} <strong>Blue Cross India</strong> (https://blue-cross.org). All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Production Grade Portal</span>
            <span>•</span>
            <span>AdSense ID: ca-pub-8528510551006901</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
