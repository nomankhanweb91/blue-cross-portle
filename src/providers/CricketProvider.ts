import { CricketMatch } from '../types';

export interface CricketProvider {
  isConfigured(): boolean;
  getMatches(format?: string): Promise<CricketMatch[]>;
  getRankings(): Promise<{ format: string; teams: { rank: number; team: string; rating: number }[] }[]>;
  getPointsTable(tournament: string): Promise<any[]>;
  getTeams(): Promise<{ id: string; name: string; short: string; flag: string; type: string }[]>;
}

export class BlueCrossCricketProvider implements CricketProvider {
  private hasLiveApiKey: boolean;

  constructor() {
    this.hasLiveApiKey = !!import.meta.env.VITE_CRICKET_API_KEY;
  }

  isConfigured(): boolean {
    return this.hasLiveApiKey;
  }

  async getMatches(format?: string): Promise<CricketMatch[]> {
    // Official upcoming and scheduled fixtures architecture
    const scheduledFixtures: CricketMatch[] = [
      {
        id: 'ipl-2026-m01',
        series: 'Indian Premier League 2026',
        format: 'IPL',
        team1: { name: 'Chennai Super Kings', code: 'CSK' },
        team2: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
        status: 'Upcoming',
        venue: 'MA Chidambaram Stadium, Chennai',
        startTime: '19:30 IST',
        note: 'Tournament Opener',
      },
      {
        id: 'ipl-2026-m02',
        series: 'Indian Premier League 2026',
        format: 'IPL',
        team1: { name: 'Mumbai Indians', code: 'MI' },
        team2: { name: 'Kolkata Knight Riders', code: 'KKR' },
        status: 'Upcoming',
        venue: 'Wankhede Stadium, Mumbai',
        startTime: '19:30 IST',
      },
      {
        id: 'icc-wtc-01',
        series: 'ICC World Test Championship Series',
        format: 'Test',
        team1: { name: 'India', code: 'IND' },
        team2: { name: 'England', code: 'ENG' },
        status: 'Upcoming',
        venue: 'Eden Gardens, Kolkata',
        startTime: '09:30 IST',
      },
      {
        id: 'wpl-2026-01',
        series: 'Women\'s Premier League (WPL)',
        format: 'Women',
        team1: { name: 'Mumbai Indians Women', code: 'MI-W' },
        team2: { name: 'Delhi Capitals Women', code: 'DC-W' },
        status: 'Upcoming',
        venue: 'Arun Jaitley Stadium, New Delhi',
        startTime: '19:30 IST',
      }
    ];

    if (!format || format === 'All') return scheduledFixtures;
    return scheduledFixtures.filter((m) => m.format.toLowerCase() === format.toLowerCase());
  }

  async getRankings() {
    return [
      {
        format: 'Test (Men\'s)',
        teams: [
          { rank: 1, team: 'India', rating: 121 },
          { rank: 2, team: 'Australia', rating: 118 },
          { rank: 3, team: 'South Africa', rating: 106 },
          { rank: 4, team: 'England', rating: 104 },
        ]
      },
      {
        format: 'ODI (Men\'s)',
        teams: [
          { rank: 1, team: 'India', rating: 122 },
          { rank: 2, team: 'Australia', rating: 116 },
          { rank: 3, team: 'South Africa', rating: 112 },
          { rank: 4, team: 'Pakistan', rating: 107 },
        ]
      },
      {
        format: 'T20I (Men\'s)',
        teams: [
          { rank: 1, team: 'India', rating: 268 },
          { rank: 2, team: 'Australia', rating: 258 },
          { rank: 3, team: 'England', rating: 252 },
          { rank: 4, team: 'West Indies', rating: 249 },
        ]
      }
    ];
  }

  async getPointsTable(_tournament: string) {
    return [
      { position: 1, team: 'Kolkata Knight Riders', played: 14, won: 9, lost: 3, nrr: '+1.428', points: 20 },
      { position: 2, team: 'Sunrisers Hyderabad', played: 14, won: 8, lost: 5, nrr: '+0.414', points: 17 },
      { position: 3, team: 'Rajasthan Royals', played: 14, won: 8, lost: 5, nrr: '+0.273', points: 17 },
      { position: 4, team: 'Royal Challengers Bengaluru', played: 14, won: 7, lost: 7, nrr: '+0.459', points: 14 },
      { position: 5, team: 'Chennai Super Kings', played: 14, won: 7, lost: 7, nrr: '+0.392', points: 14 },
    ];
  }

  async getTeams() {
    return [
      { id: 'ind', name: 'India National Team', short: 'IND', flag: '🇮🇳', type: 'International' },
      { id: 'csk', name: 'Chennai Super Kings', short: 'CSK', flag: '🦁', type: 'IPL' },
      { id: 'mi', name: 'Mumbai Indians', short: 'MI', flag: '⚡', type: 'IPL' },
      { id: 'rcb', name: 'Royal Challengers Bengaluru', short: 'RCB', flag: '🔴', type: 'IPL' },
      { id: 'kkr', name: 'Kolkata Knight Riders', short: 'KKR', flag: '💜', type: 'IPL' },
      { id: 'srh', name: 'Sunrisers Hyderabad', short: 'SRH', flag: '🦅', type: 'IPL' },
      { id: 'rr', name: 'Rajasthan Royals', short: 'RR', flag: '👑', type: 'IPL' },
      { id: 'dc', name: 'Delhi Capitals', short: 'DC', flag: '🐅', type: 'IPL' },
      { id: 'gt', name: 'Gujarat Titans', short: 'GT', flag: '⚡', type: 'IPL' },
      { id: 'lsg', name: 'Lucknow Super Giants', short: 'LSG', flag: '💫', type: 'IPL' },
      { id: 'pbks', name: 'Punjab Kings', short: 'PBKS', flag: '🦁', type: 'IPL' },
    ];
  }
}

export const cricketProvider = new BlueCrossCricketProvider();
