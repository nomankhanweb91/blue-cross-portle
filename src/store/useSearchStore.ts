import { create } from 'zustand';

interface SearchState {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => {
  const getStoredSearches = (): string[] => {
    try {
      const data = localStorage.getItem('blue-cross-recent-searches');
      return data ? JSON.parse(data) : [
        'Aadhaar PVC card apply online',
        'Income Tax return filing dates 2026',
        'SIP calculator 15 years',
        'Udyam registration free process',
        'PM Kisan samman nidhi status',
        'JSON formatter online',
        'All India pincode search'
      ];
    } catch {
      return [];
    }
  };

  return {
    recentSearches: typeof window !== 'undefined' ? getStoredSearches() : [],
    addRecentSearch: (query: string) => {
      const trimmed = query.trim();
      if (!trimmed) return;
      const filtered = get().recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('blue-cross-recent-searches', JSON.stringify(updated));
      } catch {}
      set({ recentSearches: updated });
    },
    clearRecentSearches: () => {
      try {
        localStorage.removeItem('blue-cross-recent-searches');
      } catch {}
      set({ recentSearches: [] });
    },
  };
});
