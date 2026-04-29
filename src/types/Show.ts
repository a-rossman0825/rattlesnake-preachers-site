import type { Meta } from "./Meta"
import type { StructuredData } from "./StructuredData"


export interface Show {
  id: string //slug based id (show-venue-show-date) (ie: jim\'s-alibi-01192026)
  name: string
  date: string // YYYY-MM-DD
  doorsOpen?: string // HH:mm - 24 hour clock (ie: "19:00" = 7pm)
  startTime?: string // HH:mm
  venueName: string
  location: string // city, state, country (ie: Boise, ID, U.S.A) (or just city, State)
  description?: string
  supportActs?: supportAct[]
  posterImg?: string
  price?: string
  ticketUrl?: string
  ticketStatus?: 'onsale' | 'soldout' | 'presale' | 'cancelled' | 'postponed' | undefined
  is21Plus?: boolean
  meta?: Meta<ShowStructuredData>
}




interface supportAct {
  name: string
  instagramUrl?: string
  facebookUrl?: string
  spotifyUrl?: string
  bandcampUrl?: string
  appleMusicUrl?: string
  soundcloudUrl?: string
  twitterUrl?: string
  labelUrl?: string
}

export interface ShowStructuredData extends StructuredData {
  "@type": "Event"
  startDate: string
  endDate?: string
  location: {
    "@type": "Place"
    name: string // Venue Name
    address: {
      "@type": "PostalAddress"
      streetAddress?: string
      addressLocality: string
      addressRegion: string
      PostalCode: string
      addressCountry: string
    };
  };
  offers?: {
    "@type": "offer"
    url: string // Ticket URL
    price: string // Ticket Price
    priceCurrency: string // Currency code (e.g., "USD")
    availability: string // e.g., "InStock"
    validFrom?: string // When ticket sales start
  };
  performer?: {
    "@type": "MusicGroup"
    name: string
  }[];
}