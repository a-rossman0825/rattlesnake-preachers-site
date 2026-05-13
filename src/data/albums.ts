import type { Album } from '~/types/Album'

export const albums: Album[] = [
  {
    id: 'feels-too-good',
    title: 'Feels Too Good',
    albumCover: '/assets/media/albumCovers/FTG-cover.png',
    releaseDate: '2026-03-24',
    description:
      "Why must we <u>trifle</u>, age and <u>spoil</u>? How has lady Nature granted me the gift of God's Nectar, and still yet, She <u>poisons</u> us from within when we attempt to <u>cope</u> by its <u>consumption</u>?",
    audioSnippet: '/assets/audio/FTG-snippet.mp3',
    type: 'Single',
    artist: 'Rattlesnake Preachers',
    featuredArtists: ["John Kunk"],
    featured: true,
    meta: {
      title: 'Feels Too Good - Single',
      description: 'A single by Rattlesnake Preachers featuring John Kunk, released on March 24, 2026.',
      canonicalUrl: '/albums/feels-too-good',
      openGraphImage: '/assets/media/albumCovers/FTG-cover.png',
      twitterCard: 'summary_large_image',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: "Feels Too Good",
        byArtist: {
          "@type": "MusicGroup",
          name: "Rattlesnake Preachers",
        },
        albumReleaseType: "Single",
        datePublished: "2026-03-24",
        genre: ["Rock", "Blues", "Alternative", "Punk", "Indy"],
        track: [
          {
            "@type": "MusicRecording",
            name: "Feels Too Good",
            duration: "PT3M20S",
          },
        ],
        image: "/assets/media/albumCovers/FTG-cover.png",
        url: "/albums/feels-too-good",
        description: "A single by Rattlesnake Preachers featuring John Kunk, released on March 24, 2026.",
      },
    },
  },
  {
    id: 'rattlesnake-preachers',
    title: 'Rattlesnake Preachers [EP]',
    albumCover: '/assets/media/logos/logo1.png',
    releaseDate: '2024-02-05',
    description:
      'Drones sail across <u>reddened</u> skies high above the hordes of lizard <u>people</u>. The last of our kind take <u>refuge</u> in sewage wells and shadow-plays of the <u>now-mythical</u> entity named "Basic Cable Television.',
    audioSnippet: '/assets/audio/BC-snippet.mp3',
    type: 'EP',
    featured: true,
    meta: {
      title: 'Rattlesnake Preachers [EP]',
      description: 'An EP by Rattlesnake Preachers, released on February 5, 2024.',
      canonicalUrl: '/albums/rattlesnake-preachers',
      openGraphImage: '/assets/media/logos/logo1.png',
      twitterCard: 'summary_large_image',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: "Rattlesnake Preachers [EP]",
        byArtist: {
          "@type": "MusicGroup",
          name: "Rattlesnake Preachers",
        },
        albumReleaseType: "EP",
        datePublished: "2024-02-05",
        genre: ["Blues", "Rock", "Punk", "Indy", "Alternative"],
        track: [
          {
            "@type": "MusicRecording",
            name: "Rattle My Bones",
            duration: "PT2M43S",
          },
          {
            "@type": "MusicRecording",
            name: "The Love is Gone",
            duration: "PT4M20S",
          },
          {
            "@type": "MusicRecording", 
            name: "Black Coal",
            duration: "PT4M42S",
          },
          {
            "@type": "MusicRecording",
            name: "Live Free",
            duration: "PT5M02S"
          }
        ],
        image: "/assets/media/logos/logo1.png",
        url: "/albums/rattlesnake-preachers",
        description: "An EP by Rattlesnake Preachers, released on February 5, 2024.",
      },
    },
  },
  {
    id: 'rattle-my-bones',
    title: 'Rattle My Bones',
    albumCover: '/assets/media/logos/skate-logo.png',
    releaseDate: '2024-01-01',
    description:
      "Delight in the <u>moment</u>: Youth's <u>hunger</u> to hold and be held will not <u>reside</u> in you as the source <u>forever</u>.",
    audioSnippet: '/assets/audio/RMB-snippet.mp3',
    type: 'Single',
    featured: true,
    meta: {
      title: 'Rattle My Bones - Single',
      description: 'A single by Rattlesnake Preachers, released on January 1, 2024.',
      canonicalUrl: '/albums/rattle-my-bones',
      openGraphImage: '/assets/media/logos/skate-logo.png',
      twitterCard: 'summary_large_image',
      structuredData: {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: "Rattle My Bones",
        byArtist: {
          "@type": "MusicGroup",
          name: "Rattlesnake Preachers",
        },
        albumReleaseType: "Single",
        datePublished: "2024-01-01",
        genre: ["Rock"],
        track: [
          {
            "@type": "MusicRecording",
            name: "Rattle My Bones",
            duration: "PT2M43S",
          },
        ],
        image: "/assets/media/logos/skate-logo.png",
        url: "/albums/rattle-my-bones",
        description: "A single by Rattlesnake Preachers, released on January 1, 2024.",
      },
    },
  },
];
