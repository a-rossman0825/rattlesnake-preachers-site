import type { Album } from "~/types/Album";


/* for copy/paste creating new albums:
{
  id: '',
  title: '',
  albumCover: '', 
  releaseDate: '',
  description: '', 
  audioSnippet: '', 
  type: undefined,
  artist: undefined,
  featured: false,
  },
  */

export const albums: Album[] = [
  {
    id: 'feels-too-good',
    title: 'Feels Too Good',
    albumCover: '/assets/media/albumCovers/FTG-cover.png',
    releaseDate: '2026-03-24',
    description: 'Why must we <u>trifle</u>, age and <u>spoil</u>? How has lady Nature granted me the gift of God\'s Nectar, and still yet, She <u>poisons</u> us from within when we consume to <u>cope</u>?',
    audioSnippet: '/assets/audio/FTG-snippet.mp3',
    type: 'Single', 
    artist: 'John Kunk',
    featured: true,
  },
  {
    id: 'rattlesnake-preachers',
    title: 'Rattlesnake Preachers (EP)',
    albumCover: '/assets/media/logos/logo1.png', 
    releaseDate: '2024-02-05',
    description: 'Delight in the <u>moment</u>: Youth\'s <u>hunger</u> to hold and be held will not <u>reside</u> in you as the source <u>forever</u>.', 
    audioSnippet: '/assets/audio/BC-snippet.mp3', 
    type: 'EP',
    artist: undefined,
    featured: true,
  },
  {
    id: 'rattle-my-bones',
    title: 'Rattle My Bones',
    albumCover: '/assets/media/logos/skate-logo.png', 
    releaseDate: '2024-01-01',
    description: 'Drones sail across <u>reddened</u> skies high above the hordes of lizard <u>people</u>. The last of our kind take <u>refuge</u> in sewage wells and shadow-plays of the <u>now-mythical</u> entity named "Basic Cable Television.', 
    audioSnippet: '/assets/audio/RMB-snippet.mp3', 
    type: 'Single',
    artist: undefined,
    featured: true,
  },
];