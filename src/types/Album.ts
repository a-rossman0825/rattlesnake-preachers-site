import type { Meta } from "./Meta"

export interface Album {
  id: string //slug based string ids (i.e. title: "Feels Too Good" -> slug id: 'feels-too-good')
  title: string
  albumCover: string
  releaseDate: string // ISO format: "2024-04-27" or "YYYY-MM-DD"
  description: string // 200 chars (with spaces) or less
  audioSnippet: string // path to 30sec preview MP3

  artist?: string // "for "feat:" or collaboration with other artists (i.e. "feat: John Kunk")
  type?: 'LP' | 'EP' | 'Single' | 'Compilation'
  featured?: boolean

  meta?: Meta
}
