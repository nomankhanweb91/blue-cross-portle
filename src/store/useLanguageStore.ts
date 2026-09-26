import { create } from 'zustand';
import { AppLanguage } from '../types';

interface LanguageState {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<AppLanguage, Record<string, string>> = {
  en: {
    searchPlaceholder: 'Search the web, India, tools, news and more...',
    tagline: 'Search. Tools. Information. India.',
    quickTools: 'Quick Tools',
    trending: 'Trending Now',
    news: 'Latest News',
    govServices: 'Government Services',
    aiTools: 'AI Tools',
    tools: 'Productivity Tools',
    cricket: 'Cricket Hub',
    shopping: 'Shopping Hub',
    weather: 'Weather Forecast',
    calculators: 'Financial & Daily Calculators',
    officialDisclaimer: 'Blue Cross is an independent information portal. It is not the Government of India and is not affiliated with any government department unless explicitly stated.',
    verifyOfficial: 'Official Government Portal',
    lastVerified: 'Last Verified',
    fees: 'Fee',
    documentsRequired: 'Required Documents',
    steps: 'Application Steps',
    eligibility: 'Eligibility Criteria',
    searchServices: 'Find Government Services',
    privacyNotice: 'Files are processed locally in your browser whenever possible.',
  },
  hi: {
    searchPlaceholder: 'वेब, भारत, टूल्स, समाचार और बहुत कुछ खोजें...',
    tagline: 'खोज। टूल्स। जानकारी। भारत।',
    quickTools: 'त्वरित टूल्स',
    trending: 'ट्रेंडिंग अभी',
    news: 'ताज़ा समाचार',
    govServices: 'सरकारी सेवाएँ',
    aiTools: 'एआई टूल्स',
    tools: 'उपयोगी टूल्स',
    cricket: 'क्रिकेट हब',
    shopping: 'शॉपिंग पोर्टल',
    weather: 'मौसम पूर्वानुमान',
    calculators: 'कैलकुलेटर एवं गणना',
    officialDisclaimer: 'ब्लू क्रॉस एक स्वतंत्र सूचना पोर्टल है। यह भारत सरकार नहीं है और किसी सरकारी विभाग से संबद्ध नहीं है जब तक कि स्पष्ट रूप से न कहा गया हो।',
    verifyOfficial: 'आधिकारिक सरकारी पोर्टल',
    lastVerified: 'अंतिम सत्यापन',
    fees: 'शुल्क',
    documentsRequired: 'आवश्यक दस्तावेज़',
    steps: 'आवेदन के चरण',
    eligibility: 'पात्रता मानदंड',
    searchServices: 'सरकारी सेवाएँ खोजें',
    privacyNotice: 'फ़ाइलें जहाँ तक संभव हो आपके ब्राउज़र में स्थानीय रूप से संसाधित की जाती हैं।',
  },
};

export const useLanguageStore = create<LanguageState>((set, get) => {
  const savedLang = (typeof window !== 'undefined' ? localStorage.getItem('blue-cross-lang') : null) as AppLanguage | null;
  return {
    language: savedLang === 'hi' ? 'hi' : 'en',
    setLanguage: (language) => {
      localStorage.setItem('blue-cross-lang', language);
      set({ language });
    },
    toggleLanguage: () => {
      const next = get().language === 'en' ? 'hi' : 'en';
      get().setLanguage(next);
    },
    t: (key: string) => {
      const lang = get().language;
      return translations[lang]?.[key] || translations['en'][key] || key;
    },
  };
});
