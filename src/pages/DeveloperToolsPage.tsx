import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Code,
  Copy,
  Check,
  RotateCw,
  Terminal,
  FileCode,
  KeyRound,
  Hash,
  Clock,
  Palette,
  Binary,
  Layers,
  Wrench,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';

export const DeveloperToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toolParam = searchParams.get('tool') || 'json';

  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Tools metadata
  const devTools = [
    { id: 'json', name: 'JSON Formatter & Validator', desc: 'Prettify, minify, and validate JSON data structures.' },
    { id: 'jwt', name: 'JWT Decoder', desc: 'Decode header and payload claims of JSON Web Tokens locally.' },
    { id: 'base64', name: 'Base64 Encoder / Decoder', desc: 'Encode text to base64 or decode base64 strings.' },
    { id: 'url', name: 'URL Encoder / Decoder', desc: 'Encode special characters into percent-encoded URI strings.' },
    { id: 'uuid', name: 'UUID Generator (v4)', desc: 'Generate cryptographically random RFC-compliant UUIDs.' },
    { id: 'hash', name: 'SHA-256 Hash Generator', desc: 'Generate cryptographic SHA-256 hashes using SubtleCrypto.' },
    { id: 'regex', name: 'Regex Pattern Tester', desc: 'Test regular expressions with real-time match evaluation.' },
    { id: 'timestamp', name: 'Timestamp & Epoch Converter', desc: 'Convert Unix epoch timestamps to ISO & Indian standard time.' },
    { id: 'color', name: 'Color Converter (HEX/RGB/HSL)', desc: 'Convert color values across HEX, RGB, and HSL palettes.' },
    { id: 'password', name: 'Secure Password Generator', desc: 'Generate random passwords with symbols, numbers, and casing.' },
    { id: 'lorem', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text paragraphs for UI mockups.' },
  ];

  const currentTool = devTools.find((t) => t.id === toolParam) || devTools[0];

  const copyResult = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. JSON Formatter & Validator
  const handleFormatJson = (indent = 2) => {
    try {
      if (!inputVal.trim()) return;
      const parsed = JSON.parse(inputVal);
      setOutputVal(JSON.stringify(parsed, null, indent));
      setStatus({ type: 'success', message: 'Valid JSON data structure!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: `Invalid JSON syntax: ${err.message}` });
    }
  };

  // 2. JWT Decoder
  const handleDecodeJwt = () => {
    try {
      const parts = inputVal.trim().split('.');
      if (parts.length < 2) {
        throw new Error('JWT must have at least 2 dot-separated parts (Header.Payload)');
      }
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      setOutputVal(
        `HEADER:\n${JSON.stringify(header, null, 2)}\n\nPAYLOAD CLAIMS:\n${JSON.stringify(payload, null, 2)}`
      );
      setStatus({ type: 'success', message: 'JWT decoded successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: `Failed to decode JWT: ${err.message}` });
    }
  };

  // 3. Base64
  const handleBase64Encode = () => {
    try {
      setOutputVal(btoa(inputVal));
      setStatus({ type: 'success', message: 'Encoded to Base64' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const handleBase64Decode = () => {
    try {
      setOutputVal(atob(inputVal));
      setStatus({ type: 'success', message: 'Decoded from Base64' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  // 4. URL
  const handleUrlEncode = () => {
    setOutputVal(encodeURIComponent(inputVal));
    setStatus({ type: 'success', message: 'URL Encoded' });
  };

  const handleUrlDecode = () => {
    try {
      setOutputVal(decodeURIComponent(inputVal));
      setStatus({ type: 'success', message: 'URL Decoded' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  // 5. UUID Generator
  const handleGenerateUUID = () => {
    const list = Array.from({ length: 5 }, () => crypto.randomUUID()).join('\n');
    setOutputVal(list);
    setStatus({ type: 'success', message: 'Generated 5 UUIDs' });
  };

  // 6. SHA-256 Hash
  const handleGenerateHash = async () => {
    try {
      const msgBuffer = new TextEncoder().encode(inputVal);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setOutputVal(hashHex);
      setStatus({ type: 'success', message: 'SHA-256 Hash generated!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  // 7. Regex Tester
  const handleTestRegex = () => {
    try {
      const re = new RegExp(regexPattern, regexFlags);
      const matches = inputVal.match(re);
      if (matches) {
        setRegexMatches(Array.from(matches));
        setOutputVal(`Found ${matches.length} matches:\n\n${matches.map((m, i) => `Match ${i + 1}: ${m}`).join('\n')}`);
        setStatus({ type: 'success', message: `${matches.length} matches found!` });
      } else {
        setRegexMatches([]);
        setOutputVal('No matches found.');
        setStatus({ type: 'error', message: 'No matches found.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: `Invalid Regex: ${err.message}` });
    }
  };

  // 8. Timestamp
  const handleConvertTimestamp = () => {
    try {
      const num = parseInt(inputVal.trim());
      const date = isNaN(num) ? new Date(inputVal) : new Date(num > 1e11 ? num : num * 1000);
      if (isNaN(date.getTime())) throw new Error('Invalid Date / Timestamp');

      setOutputVal(
        `ISO 8601: ${date.toISOString()}\nIndian Standard Time (IST): ${date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\nUnix Epoch (Seconds): ${Math.floor(date.getTime() / 1000)}\nUnix Epoch (Milliseconds): ${date.getTime()}`
      );
      setStatus({ type: 'success', message: 'Timestamp converted successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  // 9. Password
  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~';
    let pwd = '';
    const array = new Uint32Array(18);
    crypto.getRandomValues(array);
    for (let i = 0; i < 18; i++) {
      pwd += chars[array[i] % chars.length];
    }
    setOutputVal(pwd);
    setStatus({ type: 'success', message: 'Secure 18-character password generated' });
  };

  // 10. Lorem Ipsum
  const handleGenerateLorem = () => {
    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    setOutputVal(lorem);
    setStatus({ type: 'success', message: 'Generated placeholder paragraph' });
  };

  return (
    <>
      <SEOHead
        title={`${currentTool.name} — Free Developer Tools (Offline & Local)`}
        description={`Use Blue Cross ${currentTool.name}. Free client-side developer utility. ${currentTool.desc}`}
        canonicalPath={`/developer-tools?tool=${currentTool.id}`}
        breadcrumbs={[
          { label: 'Tools', url: '/calculators' },
          { label: 'Developer Tools', url: '/developer-tools' },
          { label: currentTool.name },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        <Breadcrumbs
          items={[
            { label: 'Developer Tools', url: '/developer-tools' },
            { label: currentTool.name },
          ]}
        />

        {/* Header */}
        <div className="my-6">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Terminal className="w-4 h-4" />
            <span>Client-Side Developer Utilities</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            Developer Toolkit
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Essential client-side utilities for programmers, web developers, and sysadmins. Fast, secure, and operates 100% offline.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Tools List */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
              All Developer Tools ({devTools.length})
            </h3>
            <div className="space-y-1">
              {devTools.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSearchParams({ tool: t.id });
                    setInputVal('');
                    setOutputVal('');
                    setStatus(null);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                    currentTool.id === t.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Workbench */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {currentTool.name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentTool.desc}
                </p>
              </div>

              {/* Regex Specific Inputs */}
              {currentTool.id === 'regex' && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Regular Expression Pattern
                    </label>
                    <input
                      type="text"
                      value={regexPattern}
                      onChange={(e) => setRegexPattern(e.target.value)}
                      placeholder="e.g. [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Flags
                    </label>
                    <input
                      type="text"
                      value={regexFlags}
                      onChange={(e) => setRegexFlags(e.target.value)}
                      placeholder="g, i, m"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Standard Input textarea (except password and uuid which don't need text) */}
              {currentTool.id !== 'password' && currentTool.id !== 'uuid' && currentTool.id !== 'lorem' && (
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Input:
                  </label>
                  <textarea
                    rows={6}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={
                      currentTool.id === 'json' ? 'Paste raw JSON string here...' :
                      currentTool.id === 'jwt' ? 'Paste JWT token here...' :
                      currentTool.id === 'timestamp' ? 'Enter epoch timestamp (e.g. 1727339400) or date string...' :
                      'Enter text here...'
                    }
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentTool.id === 'json' && (
                  <>
                    <button onClick={() => handleFormatJson(2)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                      Prettify (2 Spaces)
                    </button>
                    <button onClick={() => handleFormatJson(0)} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition">
                      Minify JSON
                    </button>
                  </>
                )}

                {currentTool.id === 'jwt' && (
                  <button onClick={handleDecodeJwt} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Decode JWT
                  </button>
                )}

                {currentTool.id === 'base64' && (
                  <>
                    <button onClick={handleBase64Encode} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                      Encode Base64
                    </button>
                    <button onClick={handleBase64Decode} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition">
                      Decode Base64
                    </button>
                  </>
                )}

                {currentTool.id === 'url' && (
                  <>
                    <button onClick={handleUrlEncode} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                      Encode URL
                    </button>
                    <button onClick={handleUrlDecode} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 transition">
                      Decode URL
                    </button>
                  </>
                )}

                {currentTool.id === 'uuid' && (
                  <button onClick={handleGenerateUUID} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Generate Random UUIDs
                  </button>
                )}

                {currentTool.id === 'hash' && (
                  <button onClick={handleGenerateHash} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Generate SHA-256 Hash
                  </button>
                )}

                {currentTool.id === 'regex' && (
                  <button onClick={handleTestRegex} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Test Regex Pattern
                  </button>
                )}

                {currentTool.id === 'timestamp' && (
                  <>
                    <button onClick={handleConvertTimestamp} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                      Convert Timestamp
                    </button>
                    <button onClick={() => { setInputVal(Math.floor(Date.now() / 1000).toString()); }} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      Set Current Epoch
                    </button>
                  </>
                )}

                {currentTool.id === 'password' && (
                  <button onClick={handleGeneratePassword} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Generate 18-Char Password
                  </button>
                )}

                {currentTool.id === 'lorem' && (
                  <button onClick={handleGenerateLorem} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition">
                    Generate Lorem Ipsum
                  </button>
                )}
              </div>

              {/* Status Banner */}
              {status && (
                <div className={`p-3 rounded-xl text-xs mb-4 flex items-center gap-2 ${
                  status.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}>
                  {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Output Display */}
              {outputVal && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Output Result
                    </span>
                    <button
                      onClick={copyResult}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {outputVal}
                  </pre>
                </div>
              )}

            </div>

            <AdSlot layout="in-content" />

          </div>

        </div>
      </div>
    </>
  );
};
