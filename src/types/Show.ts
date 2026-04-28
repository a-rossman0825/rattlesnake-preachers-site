import type { Meta } from "./Meta"


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
  meta?: Meta
}




interface supportAct {
  name: string
  url1?: string
  url2?: string
  url3?: string
}