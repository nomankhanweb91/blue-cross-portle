export type AppLanguage = 'en' | 'hi';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface GovernmentService {
  id: string;
  title: string;
  titleHi?: string;
  category: string;
  department: string;
  level: 'Central' | 'State';
  state?: string;
  description: string;
  descriptionHi?: string;
  eligibility: string[];
  documents: string[];
  steps: string[];
  fee: string;
  officialUrl: string;
  statusUrl?: string;
  lastVerified: string;
  language?: string;
  tags?: string[];
}

export interface AIDirectoryItem {
  id: string;
  name: string;
  description: string;
  category: 'LLM' | 'Search' | 'Coding' | 'Image' | 'Video' | 'Audio' | 'Productivity';
  officialWebsite: string;
  capabilities: string[];
  pricing: string;
  lastVerified: string;
  badge?: string;
}

export interface StateInfo {
  id: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  officialPortal: string;
  servicePortal: string;
  citizenServicesCount: number;
  highlightServices: string[];
}

export interface WeatherData {
  city: string;
  state?: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainProbability: number;
  aqi: number;
  aqiQuality: 'Good' | 'Moderate' | 'Poor' | 'Unhealthy' | 'Hazardous';
  sunrise: string;
  sunset: string;
  hourly: { time: string; temp: number; icon: string }[];
  daily: { day: string; high: number; low: number; condition: string }[];
  lastUpdated: string;
  source: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  summary: string;
  language: 'English' | 'Hindi';
}

export interface CricketMatch {
  id: string;
  series: string;
  format: 'IPL' | 'ICC' | 'Test' | 'ODI' | 'T20' | 'Women' | 'Domestic';
  team1: { name: string; code: string; flag?: string };
  team2: { name: string; code: string; flag?: string };
  status: 'Live' | 'Upcoming' | 'Completed';
  venue: string;
  startTime: string;
  score1?: string;
  score2?: string;
  result?: string;
  note?: string;
}

export interface ShoppingStore {
  id: string;
  name: string;
  category: string;
  officialUrl: string;
  popularCategories: string[];
  tagline: string;
  logoText: string;
  color: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  url: string;
  snippet: string;
  category: 'web' | 'news' | 'images' | 'videos' | 'maps' | 'shopping' | 'ai' | 'government' | 'tools';
  displayUrl?: string;
  date?: string;
  isOfficial?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}
