

export interface StructuredData {
  "@context": string // Always "https://schema.org"
  "@type": string // The type of entity (e.g., "Event", "MusicAlbum", etc.)
  name: string // The name of the entity
  description?: string
  image?: string 
}