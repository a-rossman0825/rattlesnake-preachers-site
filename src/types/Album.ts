import type { Meta } from "./Meta"
import type { StructuredData } from "./StructuredData"

export interface Album {
  id: string //slug based string ids (i.e. title: "Feels Too Good" -> slug id: 'feels-too-good')
  title: string
  albumCover: string
  releaseDate: string // ISO format: "2024-04-27" or "YYYY-MM-DD"
  description: string // 200 chars (with spaces) or less
  audioSnippet: string // path to 30sec preview MP3

  artist?: string
  featuredArtists?: string[] // list of featured artists
  type?: 'LP' | 'EP' | 'Single' | 'Compilation'
  featured?: boolean

  meta?: Meta<AlbumStructuredData>
}

export interface AlbumStructuredData extends StructuredData {
  "@type": "MusicAlbum"
  name: string // Album Title
  byArtist: {
    "@type": "MusicGroup"
    name: string
  }
  albumReleaseType: "Album" | "EP" | "Single" | "Compilation";
  datePublished: string; // ISO format (e.g., "YYYY-MM-DD")
  genre: string[] // Genre(s) e.g., "Rock", "Blues"
  track: {
    "@type": "MusicRecording"
    name: string // Track Name
    duration: string // Duration in ISO 8601 (e.g., "PT3M45S")
  }[] // Array of tracks
  image?: string // URL to the album cover image
  url?: string // URL to the album's page
  description?: string // Short description of the album
}
