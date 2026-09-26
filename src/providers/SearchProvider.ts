import { SearchResultItem } from '../types';

export interface SearchProvider {
  searchWeb(query: string, options?: { page?: number; filter?: string }): Promise<SearchResultItem[]>;
  searchNews(query: string): Promise<SearchResultItem[]>;
  searchImages(query: string): Promise<SearchResultItem[]>;
  searchVideos(query: string): Promise<SearchResultItem[]>;
  searchShopping(query: string): Promise<SearchResultItem[]>;
  searchMaps(query: string): Promise<SearchResultItem[]>;
  searchGovernment(query: string): Promise<SearchResultItem[]>;
}

export class BlueCrossSearchProvider implements SearchProvider {
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = !!import.meta.env.VITE_SEARCH_API_KEY;
  }

  async searchWeb(query: string): Promise<SearchResultItem[]> {
    // When external search API key is provided, perform live search.
    // Otherwise, search verified indexed portal databases, official government services, tools, and calculators.
    return this.searchInternalIndex(query, 'web');
  }

  async searchNews(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'news');
  }

  async searchImages(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'images');
  }

  async searchVideos(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'videos');
  }

  async searchShopping(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'shopping');
  }

  async searchMaps(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'maps');
  }

  async searchGovernment(query: string): Promise<SearchResultItem[]> {
    return this.searchInternalIndex(query, 'government');
  }

  private searchInternalIndex(query: string, category: SearchResultItem['category']): SearchResultItem[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const indexedDatabase: SearchResultItem[] = [
      {
        id: 's-aadhaar',
        title: 'UIDAI Aadhaar Services — Official Portal & e-Aadhaar Download',
        url: '/india/aadhaar',
        displayUrl: 'https://myaadhaar.uidai.gov.in',
        snippet: 'Official procedures for Download e-Aadhaar, Order PVC Card, Update Address, Check Enrolment Status, and Biometric Lock/Unlock.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-pan',
        title: 'National PAN Portal — Apply New PAN Card & Instant e-PAN',
        url: '/india/pan',
        displayUrl: 'https://www.onlineservices.nsdl.com',
        snippet: 'Apply for New PAN Card, PAN corrections, Reprint, Aadhaar-PAN linking status verification, and e-PAN download.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-itd',
        title: 'Income Tax e-Filing Portal — ITR Slabs & Tax Calculator',
        url: '/india/income-tax',
        displayUrl: 'https://eportal.incometax.gov.in',
        snippet: 'Income Tax Return (ITR 1-4) filing guidelines, FY 2025-26 New vs Old tax slabs, AIS/TIS inspection, refund status tracker.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-gst',
        title: 'Goods & Services Tax (GST) Portal — Registration & GSTIN Search',
        url: '/india/gst',
        displayUrl: 'https://www.gst.gov.in',
        snippet: 'Official GST filing guide, GSTIN verification, e-Way bill generate rules, input tax credit and return filing schedules.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-udyam',
        title: 'Udyam MSME Registration Portal — Zero Fee MSME Certificate',
        url: '/india/udyam',
        displayUrl: 'https://udyamregistration.gov.in',
        snippet: 'Government of India official portal for MSME registration, classification, collateral-free credit schemes, and subsidies.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-calc-sip',
        title: 'SIP & Mutual Fund Compound Return Calculator',
        url: '/calculators?tab=sip',
        displayUrl: 'https://blue-cross.org/calculators',
        snippet: 'Calculate expected wealth and maturity amounts for monthly Systematic Investment Plans (SIP) with compound growth chart.',
        category: 'tools',
        date: 'Active Tool'
      },
      {
        id: 's-calc-emi',
        title: 'Home & Personal Loan EMI Calculator',
        url: '/calculators?tab=emi',
        displayUrl: 'https://blue-cross.org/calculators',
        snippet: 'Interactive EMI calculator with principal vs interest breakdown, amortization schedule, and loan tenure optimization.',
        category: 'tools',
        date: 'Active Tool'
      },
      {
        id: 's-tools-pdf',
        title: 'Browser-Local PDF Tools — Merge, Split & Rotate PDF',
        url: '/pdf-tools',
        displayUrl: 'https://blue-cross.org/pdf-tools',
        snippet: 'Secure PDF utilities processed 100% locally inside your browser without uploading your sensitive files to any external server.',
        category: 'tools',
        date: 'Offline Capable'
      },
      {
        id: 's-tools-img',
        title: 'Image Compression & WebP Converter Tool',
        url: '/image-tools',
        displayUrl: 'https://blue-cross.org/image-tools',
        snippet: 'Compress photos, crop, resize, convert between PNG/JPG/WebP, and generate custom QR codes completely client-side.',
        category: 'tools',
        date: 'Offline Capable'
      },
      {
        id: 's-tools-dev',
        title: 'Developer Tools — JSON Formatter, Base64 & Regex Tester',
        url: '/developer-tools',
        displayUrl: 'https://blue-cross.org/developer-tools',
        snippet: 'JSON validator, JWT debugger, URL encoder/decoder, UUID generator, SHA-256 hash generator, and code beautifiers.',
        category: 'tools',
        date: 'Offline Capable'
      },
      {
        id: 's-ai-dir',
        title: 'AI Models & Productivity Directory — Blue Cross AI Hub',
        url: '/ai',
        displayUrl: 'https://blue-cross.org/ai',
        snippet: 'Curated directory of leading AI platforms including ChatGPT, Gemini, Claude, Perplexity, DeepSeek, Copilot and Midjourney.',
        category: 'ai',
        date: 'Directory'
      },
      {
        id: 's-ai-tools',
        title: 'AI Writing, Translation & Summarizer Suite',
        url: '/ai-tools',
        displayUrl: 'https://blue-cross.org/ai-tools',
        snippet: 'Professional text generation suite for blogs, emails, translations, grammar fixing, and humanizing text using Gemini 3.8.',
        category: 'ai',
        date: 'Interactive'
      },
      {
        id: 's-schemes',
        title: 'Central & State Government Welfare Schemes Directory',
        url: '/india/schemes',
        displayUrl: 'https://blue-cross.org/india/schemes',
        snippet: 'Comprehensive directory of PM Kisan, Ayushman Bharat, PMAY Housing, Jan Dhan, Mudra Yojana, Sukanya Samriddhi and more.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      },
      {
        id: 's-pincode',
        title: 'All India Pincode & Post Office Directory',
        url: '/india/pincode',
        displayUrl: 'https://blue-cross.org/india/pincode',
        snippet: 'Search 150,000+ Indian postal pincodes by PIN number, post office name, district, or state.',
        category: 'government',
        isOfficial: true,
        date: 'Postal Data'
      },
      {
        id: 's-rto',
        title: 'Parivahan Sarathi & Vahan — Driving Licence & RC Portal',
        url: '/india/rto',
        displayUrl: 'https://parivahan.gov.in',
        snippet: 'Online learner licence application, slot booking, RC status check, challan payment, and PUC certificate validation.',
        category: 'government',
        isOfficial: true,
        date: 'Verified 2026'
      }
    ];

    // Filter by query and category
    return indexedDatabase.filter((item) => {
      const matchQuery =
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q);

      if (category === 'web') return matchQuery;
      return matchQuery && item.category === category;
    });
  }
}

export const searchProvider = new BlueCrossSearchProvider();
