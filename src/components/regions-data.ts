import { cities } from './cities-data'

const cityImage = (slug: string) =>
  cities.find(c => c.slug === slug)?.heroImage ?? ''

export interface RegionData {
  slug:        string
  label:       string
  tagline:     string
  description: string
  heroImage:   string
  accentColor: string
  gradient:    string
  highlights:  string[]
  cities:      { name: string; tagline: string; image: string; href: string }[]
  attractions: { name: string; href: string }[]
}

export const regionsData: Record<string, RegionData> = {
  east: {
    slug:        'east',
    label:       'East Tennessee',
    tagline:     'Mountain Majesty',
    description: "East Tennessee is a land of breathtaking natural beauty, where the ancient Appalachian Mountains rise to meet the sky. Home to the Great Smoky Mountains National Park—America's most visited national park—this region offers world-class hiking, stunning waterfalls, and charming mountain communities steeped in Appalachian heritage.",
    heroImage:   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85',
    accentColor: '#059669',
    gradient:    'linear-gradient(135deg, #059669, #15803d)',
    highlights:  ['Great Smoky Mountains', 'Dollywood', 'Ruby Falls', 'Cades Cove'],
    cities: [
      { name: 'Knoxville',   tagline: 'Gateway to the Smokies',  image: cityImage('knoxville'),    href: '/cities/knoxville' },
      { name: 'Gatlinburg',  tagline: 'Mountain resort village',  image: cityImage('gatlinburg'),   href: '/cities/gatlinburg' },
      { name: 'Pigeon Forge',tagline: 'Home of Dollywood',        image: cityImage('pigeon-forge'), href: '/cities/pigeon-forge' },
      { name: 'Chattanooga', tagline: 'Scenic City',              image: cityImage('chattanooga'),  href: '/cities/chattanooga' },
    ],
    attractions: [
      { name: 'Great Smoky Mountains National Park', href: '/destinations/great-smoky-mountains' },
      { name: 'Dollywood Theme Park',                href: '/destinations/dollywood' },
      { name: 'Ruby Falls',                          href: '/destinations/ruby-falls' },
      { name: 'Cades Cove',                          href: '/destinations/cades-cove' },
      { name: 'Tennessee Aquarium',                  href: '/destinations/tennessee-aquarium' },
      { name: 'Lookout Mountain',                    href: '/destinations/lookout-mountain' },
    ],
  },

  middle: {
    slug:        'middle',
    label:       'Middle Tennessee',
    tagline:     'Music City & Beyond',
    description: "From the neon lights of Nashville's honky-tonks to the rolling hills of the Highland Rim, Middle Tennessee pulses with music, history, and Southern hospitality. Home to the world-famous Grand Ole Opry, the Jack Daniel's Distillery, and some of the best food in the South.",
    heroImage:   'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?w=1600&q=85',
    accentColor: '#d97706',
    gradient:    'linear-gradient(135deg, #d97706, #c2410c)',
    highlights:  ['Grand Ole Opry', 'Jack Daniels Distillery', 'The Parthenon', 'Franklin'],
    cities: [
      { name: 'Nashville',    tagline: 'Music City',         image: cityImage('nashville'),     href: '/cities/nashville' },
      { name: 'Franklin',     tagline: 'Coolest Small Town', image: cityImage('franklin'),      href: '/cities/franklin' },
      { name: 'Murfreesboro', tagline: 'Geographic Center',  image: cityImage('murfreesboro'),  href: '/cities/murfreesboro' },
      { name: 'Lynchburg',    tagline: 'Whiskey Country',    image: cityImage('lynchburg'),     href: '/cities/lynchburg' },
    ],
    attractions: [
      { name: 'Grand Ole Opry',          href: '/destinations/grand-ole-opry' },
      { name: 'Jack Daniels Distillery', href: '/destinations/jack-daniels-distillery' },
      { name: 'The Parthenon',           href: '/destinations/parthenon' },
      { name: 'Country Music Hall of Fame', href: '/destinations/country-music-hall-of-fame' },
      { name: 'Belle Meade Historic Site',  href: '/destinations/belle-meade' },
      { name: 'Natchez Trace Parkway',      href: '/destinations/natchez-trace' },
    ],
  },

  west: {
    slug:        'west',
    label:       'West Tennessee',
    tagline:     'Soul of the Delta',
    description: "Where the Mississippi River meets the birthplace of the blues. West Tennessee is a land of deep musical roots, profound civil rights history, and the legendary Beale Street in Memphis. From Graceland to the National Civil Rights Museum, this region tells some of America's most important stories.",
    heroImage:   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=85',
    accentColor: '#7c3aed',
    gradient:    'linear-gradient(135deg, #7c3aed, #1d4ed8)',
    highlights:  ['Beale Street', 'Graceland', 'National Civil Rights Museum', 'Mud Island'],
    cities: [
      { name: 'Memphis',  tagline: 'Home of the Blues',      image: cityImage('memphis'),  href: '/cities/memphis' },
      { name: 'Jackson',  tagline: 'Hub City',               image: cityImage('jackson'),  href: '/cities/jackson' },
      { name: 'Dyersburg',tagline: 'Gateway to the Delta',   image: cityImage('dyersburg'),href: '/cities/dyersburg' },
      { name: 'Bolivar',  tagline: 'Historic Hardeman County',image: cityImage('bolivar'), href: '/cities/bolivar' },
    ],
    attractions: [
      { name: 'Beale Street',                 href: '/destinations/beale-street' },
      { name: 'Graceland',                    href: '/destinations/graceland' },
      { name: 'National Civil Rights Museum', href: '/destinations/national-civil-rights-museum' },
      { name: 'Mud Island River Park',        href: '/destinations/mud-island' },
      { name: 'Memphis Zoo',                  href: '/destinations/memphis-zoo' },
      { name: 'Sun Studio',                   href: '/destinations/sun-studio' },
    ],
  },
}