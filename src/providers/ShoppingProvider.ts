import { ShoppingStore } from '../types';

export interface ShoppingProvider {
  getStores(): ShoppingStore[];
  isAffiliateConfigured(): boolean;
}

export class BlueCrossShoppingProvider implements ShoppingProvider {
  private stores: ShoppingStore[] = [
    {
      id: 'amazon-in',
      name: 'Amazon India',
      category: 'Everything, Electronics, Books & Household',
      officialUrl: 'https://www.amazon.in',
      popularCategories: ['Smartphones', 'Laptops', 'Home Appliances', 'Books', 'Kitchenware'],
      tagline: 'India\'s leading multi-category marketplace with Prime fast delivery.',
      logoText: 'amazon.in',
      color: 'border-amber-500 hover:border-amber-600',
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      category: 'Electronics, Fashion, Appliances & Grocery',
      officialUrl: 'https://www.flipkart.com',
      popularCategories: ['Mobiles', 'Televisions', 'Fashion', 'Furniture', 'Electronics'],
      tagline: 'Homegrown Indian e-commerce giant with SuperCoins and big festive days.',
      logoText: 'Flipkart',
      color: 'border-blue-500 hover:border-blue-600',
    },
    {
      id: 'myntra',
      name: 'Myntra',
      category: 'Fashion, Lifestyle & Beauty',
      officialUrl: 'https://www.myntra.com',
      popularCategories: ['Ethnic Wear', 'Footwear', 'Western Wear', 'Watches', 'Skincare'],
      tagline: 'Premier fashion destination featuring 5000+ top Indian and global brands.',
      logoText: 'MYNTRA',
      color: 'border-rose-500 hover:border-rose-600',
    },
    {
      id: 'meesho',
      name: 'Meesho',
      category: 'Affordable Fashion, Home & Everyday Goods',
      officialUrl: 'https://www.meesho.com',
      popularCategories: ['Women Clothing', 'Jewellery', 'Bags', 'Kitchen Tools', 'Kids Wear'],
      tagline: 'Zero-commission marketplace connecting direct manufacturers across India.',
      logoText: 'meesho',
      color: 'border-fuchsia-500 hover:border-fuchsia-600',
    },
    {
      id: 'croma',
      name: 'Croma',
      category: 'Consumer Electronics & Large Appliances',
      officialUrl: 'https://www.croma.com',
      popularCategories: ['Laptops', 'Air Conditioners', 'Smart TVs', 'Cameras', 'Audio'],
      tagline: 'Tata enterprise electronics retailer with verified warranty and express delivery.',
      logoText: 'croma',
      color: 'border-teal-500 hover:border-teal-600',
    },
    {
      id: 'reliance-digital',
      name: 'Reliance Digital',
      category: 'Tech, Gadgets & Home Entertainment',
      officialUrl: 'https://www.reliancedigital.in',
      popularCategories: ['Smartphones', 'Audio Devices', 'Personal Care', 'Refrigerators'],
      tagline: 'Nationwide tech superstore backed by Reliance service network.',
      logoText: 'Reliance Digital',
      color: 'border-red-600 hover:border-red-700',
    },
    {
      id: 'ajio',
      name: 'Ajio',
      category: 'Trending Fashion & Indie Handlooms',
      officialUrl: 'https://www.ajio.com',
      popularCategories: ['Indie Handlooms', 'Sneakers', 'Streetwear', 'Accessories'],
      tagline: 'Reliance Retail’s trend-forward fashion portal with exclusive indie crafts.',
      logoText: 'AJIO',
      color: 'border-yellow-600 hover:border-yellow-700',
    },
    {
      id: 'tata-cliq',
      name: 'Tata CLiQ & Luxury',
      category: 'Premium Electronics, Fashion & Luxury',
      officialUrl: 'https://www.tatacliq.com',
      popularCategories: ['Luxury Watches', 'Designer Wear', 'Premium Audio', 'Fragrances'],
      tagline: 'Authentic branded shopping with direct brand warranties.',
      logoText: 'TATA CLiQ',
      color: 'border-purple-600 hover:border-purple-700',
    },
  ];

  getStores(): ShoppingStore[] {
    return this.stores;
  }

  isAffiliateConfigured(): boolean {
    return false; // Honest indicator: prices and live comparison require active product feed credentials
  }
}

export const shoppingProvider = new BlueCrossShoppingProvider();
