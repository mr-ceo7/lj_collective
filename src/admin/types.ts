import { Product } from '../types';

export type AdminProductInput = Omit<Product, 'id'> & { id?: string };

export interface CampaignAsset {
  id: string;
  title: string;
  imageUrl: string;
  placement: 'hero' | 'landing' | 'lookbook' | 'product-story';
  status: 'draft' | 'published';
  sortOrder: number;
  createdAt: string;
  tag?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'checkout' | 'concierge' | 'campaign' | 'private-fitting';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  interest?: string;
  notes?: string;
  createdAt: string;
}
