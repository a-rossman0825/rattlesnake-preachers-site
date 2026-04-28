

export interface Meta {
  title: string //SEO Title
  description?: string //SEO Description
  canonicalUrl?: string // Canonical URL
  openGraphImage?: string; // Open Graph image URL
  twitterCard?: 'summary' | 'summary_large_image'; // Twitter card type
  structuredData?: object; // JSON-LD structured data
}