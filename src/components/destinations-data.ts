import { Category } from './DestinationCard'

export interface Destination {
  slug:             string
  name:             string
  shortDescription: string
  city:             string
  region:           'east' | 'middle' | 'west'
  category:         Category
  featured?:        boolean
  heroImage:        string
}

export const destinations: Destination[] = [
  {
    slug:             'graceland',
    name:             'Graceland',
    shortDescription: 'The legendary home of Elvis Presley, featuring the iconic mansion, museums, and memorabilia.',
    city:             'Memphis',
    region:           'west',
    category:         'music',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1720016119359-d6372f8a4491?w=800&q=80',
  },
  {
    slug:             'great-smoky-mountains',
    name:             'Great Smoky Mountains National Park',
    shortDescription: "America's most visited national park with stunning mountain views, wildlife, and hiking trails.",
    city:             'Gatlinburg',
    region:           'east',
    category:         'nature',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=800&q=80',
  },
  {
    slug:             'grand-ole-opry',
    name:             'Grand Ole Opry',
    shortDescription: 'The legendary home of country music, hosting live performances since 1925.',
    city:             'Nashville',
    region:           'middle',
    category:         'music',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1674332528480-63b5f01070d1?w=800&q=80',
  },
  {
    slug:             'beale-street',
    name:             'Beale Street',
    shortDescription: 'The home of the blues, lined with legendary clubs, restaurants, and live music venues.',
    city:             'Memphis',
    region:           'west',
    category:         'music',
    heroImage:        'https://images.unsplash.com/photo-1543372742-e7d0b9947a2b?q=80&w=1774',
  },
  {
    slug:             'ruby-falls',
    name:             'Ruby Falls',
    shortDescription: "America's tallest and deepest underground waterfall, located deep inside Lookout Mountain.",
    city:             'Chattanooga',
    region:           'east',
    category:         'nature',
    heroImage:        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
  },
  {
    slug:             'jack-daniels-distillery',
    name:             'Jack Daniels Distillery',
    shortDescription: "Tour the world's oldest registered distillery and learn the secrets of Tennessee whiskey.",
    city:             'Lynchburg',
    region:           'middle',
    category:         'food',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80',
  },
  {
    slug:             'dollywood',
    name:             'Dollywood',
    shortDescription: 'Award-winning theme park featuring world-class rides, shows, and Appalachian culture.',
    city:             'Pigeon Forge',
    region:           'east',
    category:         'family',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1628008392226-0d2115fb122c?w=800&q=80',
  },
  {
    slug:             'parthenon',
    name:             'The Parthenon',
    shortDescription: 'A full-scale replica of the original Parthenon in Athens, featuring a 42-foot Athena statue.',
    city:             'Nashville',
    region:           'middle',
    category:         'history',
    heroImage:        'https://images.unsplash.com/photo-1749739427270-73f227ec5b0c?w=800&q=80',
  },
  {
    slug:             'ocoee-river',
    name:             'Ocoee River Whitewater',
    shortDescription: 'Olympic-level whitewater rafting on the river that hosted the 1996 Olympics.',
    city:             'Polk County',
    region:           'east',
    category:         'adventure',
    heroImage:        'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80',
  },
  {
    slug:             'cades-cove',
    name:             'Cades Cove',
    shortDescription: 'A broad valley surrounded by mountains, known for wildlife viewing and historic buildings.',
    city:             'Great Smoky Mountains',
    region:           'east',
    category:         'nature',
    heroImage:        'https://images.unsplash.com/photo-1751843090856-254da5d6f441?w=800&q=80',
  },
  {
    slug:             'national-civil-rights-museum',
    name:             'National Civil Rights Museum',
    shortDescription: 'Located at the Lorraine Motel, chronicling the American civil rights movement.',
    city:             'Memphis',
    region:           'west',
    category:         'history',
    featured:         true,
    heroImage:        'https://images.unsplash.com/photo-1562387729-4d71956ab564?w=800&q=80',
  },
  {
    slug:             'tennessee-aquarium',
    name:             'Tennessee Aquarium',
    shortDescription: 'World-class aquarium featuring freshwater and ocean exhibits on the Tennessee River.',
    city:             'Chattanooga',
    region:           'east',
    category:         'family',
    heroImage:        'https://images.unsplash.com/photo-1554147686-c7a0e12404cb?w=800&q=80',
  },
]