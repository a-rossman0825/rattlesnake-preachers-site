import type { Show } from '../types/Show'

export const shows: Show[] = [
    {
    id: 'jims-alibi-01192026',
    name: "Jim's Alibi - Live Show",
    date: '2026-01-19', 
    doorsOpen: '19:00', 
    startTime: '20:00', 
    venueName: "Jim's Alibi",
    location: 'Boise, ID, U.S.A', 
    description: 'Join us for an unforgettable night of live music at Jim\'s Alibi in Boise, featuring Rattlesnake Preachers and special guests.',
    supportActs: [
      {
        name: 'The Wild Ones',
        instagramUrl: 'https://instagram.com/thewildones',
        facebookUrl: 'https://facebook.com/thewildones',
        spotifyUrl: 'https://spotify.com/thewildones',
      },
      {
        name: 'The Howlers',
        instagramUrl: 'https://instagram.com/thehowlers',
        facebookUrl: 'https://facebook.com/thehowlers',
        spotifyUrl: 'https://spotify.com/thehowlers',
      },
    ],
    posterImg: '/assets/media/posters/jims-alibi-01192026.png',
    price: '$15',
    ticketUrl: 'https://tickets.example.com/jims-alibi-01192026',
    ticketStatus: 'onsale', 
    is21Plus: true,
    meta: {
      title: "Jim's Alibi - Live Show",
      description: 'Live music at Jim\'s Alibi featuring Rattlesnake Preachers and special guests.',
      canonicalUrl: '/shows/jims-alibi-01192026',
      openGraphImage: '/assets/media/posters/jims-alibi-01192026.png',
      twitterCard: 'summary_large_image',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Jim's Alibi - Live Show", 
        startDate: "2026-01-19T20:00:00",
        location: {
          "@type": "Place",
          name: "Jim's Alibi",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Boise",
            addressRegion: "ID",
            PostalCode: "83702",
            addressCountry: "US",
          },
        },
        offers: {
          "@type": "offer",
          url: "https://tickets.example.com/jims-alibi-01192026",
          price: "15.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          validFrom: "2025-12-01T12:00:00", 
        },
        performer: [
          {
            "@type": "MusicGroup",
            name: "Rattlesnake Preachers",
          },
          {
            "@type": "MusicGroup",
            name: "The Wild Ones",
          },
          {
            "@type": "MusicGroup",
            name: "The Howlers",
          },
        ],
      },
    },
  },
];