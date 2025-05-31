export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: string; // Opcional - para uso interno, não vem da API
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
  category?: string; // Opcional - para uso interno, não vem da API
}

// Tipos para a API do The Guardian
export interface GuardianResponse {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}

export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    headline?: string;
    body?: string;
    byline?: string;
  };
  isHosted: boolean;
  pillarId?: string;
  pillarName?: string;
}
