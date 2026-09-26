import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileText,
  Calculator,
  Cpu,
  Sparkles,
  MapPin,
  TrendingUp,
  Landmark,
  Compass,
  Code2,
  Image as ImageIcon,
  Train,
  Briefcase,
  GraduationCap,
  Car,
  CloudSun,
  Activity,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 transition-all py-6 px-4 sm:px-8 max-h-[85vh] overflow-y-auto"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: India Hub & Government Services */}
        <div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-wide uppercase mb-3">
            <Landmark className="w-4 h-4" />
            <span>India Super Hub</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/india" onClick={onClose} className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 flex items-center justify-between">
                <span>All Government Services</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded">Hub</span>
              </Link>
            </li>
            <li><Link to="/india/find-service" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Find Government Service</Link></li>
            <li><Link to="/india/aadhaar" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Aadhaar (UIDAI) Services</Link></li>
            <li><Link to="/india/pan" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">PAN Card & Instant e-PAN</Link></li>
            <li><Link to="/india/income-tax" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Income Tax & ITR Slabs</Link></li>
            <li><Link to="/india/gst" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">GST Portal & Verification</Link></li>
            <li><Link to="/india/udyam" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Udyam MSME Registration</Link></li>
            <li><Link to="/india/schemes" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Central & State Schemes</Link></li>
            <li><Link to="/india/scholarships" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">National Scholarships</Link></li>
            <li><Link to="/india/jobs" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">Sarkari Jobs & Notifications</Link></li>
            <li><Link to="/india/states" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-blue-600">28 States & 8 UTs Directory</Link></li>
          </ul>
        </div>

        {/* Column 2: Essential India Utilities */}
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-wide uppercase mb-3">
            <Compass className="w-4 h-4" />
            <span>Citizen Utilities</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/india/passport" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Passport Seva (PSK & Tatkaal)</Link></li>
            <li><Link to="/india/rto" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Driving Licence & RTO (Sarathi)</Link></li>
            <li><Link to="/india/epfo" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">EPFO UAN Passbook & PF Claim</Link></li>
            <li><Link to="/india/banking" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">IFSC, MICR & Bank Branch Finder</Link></li>
            <li><Link to="/india/railways" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Railways (PNR & Schedules)</Link></li>
            <li><Link to="/india/flights" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Flight Status & Airports Guide</Link></li>
            <li><Link to="/india/pincode" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">All India Pincode Search</Link></li>
            <li><Link to="/india/documents" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Government Documents Guide</Link></li>
            <li><Link to="/india/business" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Startup & Business Registrations</Link></li>
            <li><Link to="/india/voter" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Voter ID & e-EPIC Services</Link></li>
            <li><Link to="/india/ayushman" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-indigo-600">Ayushman Bharat (PM-JAY)</Link></li>
          </ul>
        </div>

        {/* Column 3: AI & Developer Tools */}
        <div>
          <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm tracking-wide uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>AI & Developer Hub</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/ai" onClick={onClose} className="font-semibold text-slate-900 dark:text-white hover:text-violet-600 flex items-center justify-between">
                <span>Top AI Directory</span>
                <span className="text-[10px] bg-violet-100 dark:bg-violet-900/60 text-violet-600 dark:text-violet-300 px-1.5 py-0.5 rounded">14+ Tools</span>
              </Link>
            </li>
            <li><Link to="/ai-tools" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">AI Writer, Rewriter & Summarizer</Link></li>
            <li><Link to="/ai-tools?tool=translator" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">Multilingual Indian Translator</Link></li>
            <li><Link to="/ai-tools?tool=humanizer" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">AI Text Humanizer & Paraphraser</Link></li>
            <li><Link to="/developer-tools" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600 font-semibold mt-2 block">Developer Utilities (Offline)</Link></li>
            <li><Link to="/developer-tools?tool=json" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">JSON Formatter & Validator</Link></li>
            <li><Link to="/developer-tools?tool=jwt" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">JWT Token Debugger</Link></li>
            <li><Link to="/developer-tools?tool=base64" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">Base64 & URL Encoder/Decoder</Link></li>
            <li><Link to="/developer-tools?tool=regex" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">Regex Pattern Tester</Link></li>
            <li><Link to="/developer-tools?tool=hash" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-violet-600">SHA-256 Hash & UUID Generator</Link></li>
          </ul>
        </div>

        {/* Column 4: Browser Tools, Calculators & Portals */}
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide uppercase mb-3">
            <Calculator className="w-4 h-4" />
            <span>Markets &amp; Calculators</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/markets" onClick={onClose} className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between">
                <span>Live Currency &amp; Crypto Hub</span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold">Live</span>
              </Link>
            </li>
            <li><Link to="/markets/currency" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Forex &amp; Currency Converter</Link></li>
            <li><Link to="/markets/crypto" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Crypto Market (BTC &amp; ETH)</Link></li>
            <li>
              <Link to="/calculators" onClick={onClose} className="font-semibold text-slate-900 dark:text-white hover:text-emerald-600 flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>19+ Financial Calculators</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">Real-time</span>
              </Link>
            </li>
            <li><Link to="/calculators?tab=sip" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">SIP &amp; Mutual Fund Calculator</Link></li>
            <li><Link to="/calculators?tab=emi" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Loan &amp; Home EMI Calculator</Link></li>
            <li><Link to="/calculators?tab=tax" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Income Tax (New vs Old Regime)</Link></li>
            <li><Link to="/pdf-tools" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold mt-2 block">Browser PDF Tools (Local)</Link></li>
            <li><Link to="/image-tools" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold mt-2 block">Image Tools &amp; QR Maker</Link></li>
            <li><Link to="/weather" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Live Weather &amp; AQI Forecast</Link></li>
            <li><Link to="/cricket" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Cricket Fixtures &amp; Rankings</Link></li>
            <li><Link to="/news" onClick={onClose} className="text-slate-600 dark:text-slate-300 hover:text-emerald-600">Verified Indian News Feed</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Links:</span>
          <Link to="/search" onClick={onClose} className="hover:text-blue-600">Universal Search</Link>
          <Link to="/trending" onClick={onClose} className="hover:text-blue-600">Trends India</Link>
          <Link to="/maps" onClick={onClose} className="hover:text-blue-600">Essential Maps</Link>
          <Link to="/privacy" onClick={onClose} className="hover:text-blue-600">Privacy & Terms</Link>
        </div>
        <div>
          <span>Local browser execution ensures privacy • No credential harvesting</span>
        </div>
      </div>
    </div>
  );
};
