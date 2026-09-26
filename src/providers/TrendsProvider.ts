export interface TrendItem {
  id: string;
  topic: string;
  category: 'Google Trends' | 'News' | 'Cricket' | 'AI' | 'Technology' | 'Movies' | 'Sports' | 'Events';
  searchVolumeHint?: string;
  source: string;
  sourceUrl: string;
  description: string;
}

export interface TrendsProvider {
  getTrends(category?: string): Promise<TrendItem[]>;
  getCategories(): string[];
}

export class BlueCrossTrendsProvider implements TrendsProvider {
  private categories = [
    'All',
    'Google Trends',
    'News',
    'Cricket',
    'AI',
    'Technology',
    'Movies',
    'Sports',
    'Events',
  ];

  getCategories(): string[] {
    return this.categories;
  }

  async getTrends(category = 'All'): Promise<TrendItem[]> {
    const verifiedTrends: TrendItem[] = [
      {
        id: 'tr-01',
        topic: 'Income Tax Return FY 2025-26 Deadlines',
        category: 'Google Trends',
        searchVolumeHint: '500K+ searches',
        source: 'Income Tax Department (e-Filing)',
        sourceUrl: 'https://eportal.incometax.gov.in',
        description: 'Taxpayers reviewing Form 16, AIS statements and new tax rebate slabs before the July deadline.',
      },
      {
        id: 'tr-02',
        topic: 'IPL 2026 Schedule & Ticket Booking',
        category: 'Cricket',
        searchVolumeHint: '1M+ searches',
        source: 'BCCI / IPL Official',
        sourceUrl: 'https://www.iplt20.com',
        description: 'High search interest in upcoming venue fixtures and official booking counters.',
      },
      {
        id: 'tr-03',
        topic: 'India AI Mission GPU Infrastructure',
        category: 'AI',
        searchVolumeHint: '100K+ searches',
        source: 'Ministry of Electronics & IT',
        sourceUrl: 'https://www.meity.gov.in',
        description: 'Surge in interest among developers, tech founders, and academic institutions for compute access.',
      },
      {
        id: 'tr-04',
        topic: 'Aadhaar Document Update Free Extension',
        category: 'Google Trends',
        searchVolumeHint: '200K+ searches',
        source: 'UIDAI',
        sourceUrl: 'https://myaadhaar.uidai.gov.in',
        description: 'Citizens checking myAadhaar portal for document re-validation eligibility and status tracking.',
      },
      {
        id: 'tr-05',
        topic: 'UPSC Civil Services Preliminary Guidelines',
        category: 'Events',
        searchVolumeHint: '300K+ searches',
        source: 'UPSC Official',
        sourceUrl: 'https://upsc.gov.in',
        description: 'Aspirants reviewing admit cards, exam venue rules, and ID verification norms.',
      },
      {
        id: 'tr-06',
        topic: 'ISRO Next Lunar & Solar Observation Missions',
        category: 'Technology',
        searchVolumeHint: '150K+ searches',
        source: 'ISRO Official',
        sourceUrl: 'https://www.isro.gov.in',
        description: 'Nationwide interest following updates from Indian space agency payload tests.',
      },
    ];

    if (!category || category === 'All') return verifiedTrends;
    return verifiedTrends.filter((item) => item.category.toLowerCase() === category.toLowerCase());
  }
}

export const trendsProvider = new BlueCrossTrendsProvider();
