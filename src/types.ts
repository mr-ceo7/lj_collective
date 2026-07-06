export interface Product {
  id: string;
  name: string;
  category: 'ready-to-wear' | 'haute-couture' | 'accessories' | 'jewelry';
  collection: 'Summer Atelier' | 'Winter Silhouette' | 'Essential Classic';
  price: number;
  description: string;
  details: string[];
  sizes: string[];
  images: string[]; // Primary image, secondary angle
  stock: number;
  featured?: boolean;
  materials?: string;
  origin?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  verified: boolean;
  itemPurchased: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
}
