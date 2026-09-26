export interface NearbyPlaceCategory {
  id: string;
  name: string;
  icon: string;
  queryTerm: string;
}

export interface MapsProvider {
  isConfigured(): boolean;
  getCategories(): NearbyPlaceCategory[];
  getDirectGoogleMapsUrl(location: string, action?: 'search' | 'directions'): string;
}

export class BlueCrossMapsProvider implements MapsProvider {
  private hasApiKey: boolean;

  constructor() {
    this.hasApiKey = !!import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  }

  isConfigured(): boolean {
    return this.hasApiKey;
  }

  getCategories(): NearbyPlaceCategory[] {
    return [
      { id: 'aadhaar', name: 'Aadhaar Seva Kendra', icon: 'Fingerprint', queryTerm: 'Aadhaar Seva Kendra near me' },
      { id: 'postoffice', name: 'Post Office', icon: 'Mail', queryTerm: 'Post Office near me' },
      { id: 'hospital', name: 'Ayushman Empaneled Hospitals', icon: 'Building2', queryTerm: 'Government and Empaneled Hospital near me' },
      { id: 'police', name: 'Police Station', icon: 'Shield', queryTerm: 'Police Station near me' },
      { id: 'rto', name: 'RTO Office', icon: 'Car', queryTerm: 'RTO Office near me' },
      { id: 'metro', name: 'Metro & Railway Station', icon: 'Train', queryTerm: 'Railway Station near me' },
      { id: 'bank', name: 'Banks & ATMs', icon: 'Landmark', queryTerm: 'Bank ATM near me' },
      { id: 'csc', name: 'Common Service Centre (CSC)', icon: 'Laptop', queryTerm: 'Common Service Centre near me' },
    ];
  }

  getDirectGoogleMapsUrl(location: string, action: 'search' | 'directions' = 'search'): string {
    const encoded = encodeURIComponent(location);
    if (action === 'directions') {
      return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  }
}

export const mapsProvider = new BlueCrossMapsProvider();
