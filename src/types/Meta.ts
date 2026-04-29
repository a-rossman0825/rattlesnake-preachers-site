

export interface Meta<T = object> {
  title: string //SEO Title
  description?: string //SEO Description
  canonicalUrl?: string // Canonical URL
  openGraphImage?: string; // Open Graph image URL
  twitterCard?: 'summary' | 'summary_large_image'; // Twitter card type
  structuredData?: T; // JSON-LD structured data
}