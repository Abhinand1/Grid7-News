export enum Category {
  ALL = 'All',
  AI = 'AI',
  OS = 'OS',
  GADGETS = 'Gadgets',
  OTHER = 'Other'
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // Full content or extended summary
  category: Category;
  source: string;
  url?: string;
  timestamp: string; // ISO string
  imageUrl?: string;
  score?: number; // A stylistic "Verge Score"
}

export interface LaunchEvent {
  id: string;
  productName: string;
  company: string;
  date: string;
  description: string;
  type: 'Hardware' | 'Software' | 'Service';
}

export interface FetchState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}