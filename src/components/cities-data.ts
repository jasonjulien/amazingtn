export interface CityData {
  slug:        string
  name:        string
  tagline:     string
  region:      'east' | 'middle' | 'west'
  regionLabel: string
  population:  string
  description: string
  heroImage:   string
  highlights:  string[]
}

export const cities: CityData[] = [
  // East Tennessee
  {
    slug:        'knoxville',
    name:        'Knoxville',
    tagline:     'Gateway to the Smokies',
    region:      'east',
    regionLabel: 'East Tennessee',
    population:  '190,000',
    description: 'A vibrant university city nestled at the foothills of the Great Smoky Mountains, known for its lively Market Square, world-class museums, and as the gateway to America\'s most visited national park.',
    heroImage:   'https://images.unsplash.com/photo-1627918563419-121d60046176?w=1200&q=85',
    highlights:  ['Market Square', 'Tennessee Theatre', 'Museum of Appalachia', 'World\'s Fair Park'],
  },
  {
    slug:        'gatlinburg',
    name:        'Gatlinburg',
    tagline:     'Mountain Resort Village',
    region:      'east',
    regionLabel: 'East Tennessee',
    population:  '4,000',
    description: 'A charming mountain resort town serving as the primary gateway to Great Smoky Mountains National Park, famous for its unique shops, SkyLift Park, and stunning natural surroundings.',
    heroImage:   'https://images.unsplash.com/photo-1638801810119-af3e9bc86098?w=1200&q=85',
    highlights:  ['SkyLift Park', 'Ripley\'s Aquarium', 'Arts & Crafts Community', 'Ober Gatlinburg'],
  },
  {
    slug:        'pigeon-forge',
    name:        'Pigeon Forge',
    tagline:     'Home of Dollywood',
    region:      'east',
    regionLabel: 'East Tennessee',
    population:  '6,000',
    description: 'A premier family vacation destination in the Smoky Mountains, home to Dollywood theme park, the Titanic Museum, and endless entertainment options for visitors of all ages.',
    heroImage:   'https://images.unsplash.com/photo-1734964714023-9b8ad269ba75?w=1200&q=85',
    highlights:  ['Dollywood', 'Titanic Museum', 'The Island', 'Smoky Mountain Alpine Coaster'],
  },
  {
    slug:        'chattanooga',
    name:        'Chattanooga',
    tagline:     'Scenic City',
    region:      'east',
    regionLabel: 'East Tennessee',
    population:  '181,000',
    description: 'Dramatically situated along the Tennessee River at the foot of Lookout Mountain, Chattanooga offers world-class outdoor recreation, the renowned Tennessee Aquarium, and a thriving arts scene.',
    heroImage:   'https://images.unsplash.com/photo-1628878685986-6b4f03994a98?w=1200&q=85',
    highlights:  ['Tennessee Aquarium', 'Lookout Mountain', 'Ruby Falls', 'Walnut Street Bridge'],
  },

  // Middle Tennessee
  {
    slug:        'nashville',
    name:        'Nashville',
    tagline:     'Music City',
    region:      'middle',
    regionLabel: 'Middle Tennessee',
    population:  '715,000',
    description: 'The country music capital of the world, Nashville pulses with live music on every corner. From the legendary honky-tonks of Lower Broadway to world-class museums and award-winning restaurants, Music City never sleeps.',
    heroImage:   'https://images.unsplash.com/photo-1715013550766-6dade517c856?w=1200&q=85',
    highlights:  ['Grand Ole Opry', 'Country Music Hall of Fame', 'Lower Broadway', 'The Parthenon'],
  },
  {
    slug:        'franklin',
    name:        'Franklin',
    tagline:     'Coolest Small Town in America',
    region:      'middle',
    regionLabel: 'Middle Tennessee',
    population:  '83,000',
    description: 'Named one of the coolest small towns in America, Franklin combines a beautifully preserved Civil War history with a thriving arts scene, upscale boutiques, and some of Tennessee\'s finest dining.',
    heroImage:   'https://images.unsplash.com/photo-1634232503346-6f69ceb6bfc9?w=1200&q=85',
    highlights:  ['Downtown Franklin', 'Carter House', 'Carnton Plantation', 'Factory at Franklin'],
  },
  {
    slug:        'murfreesboro',
    name:        'Murfreesboro',
    tagline:     'Heart of Tennessee',
    region:      'middle',
    regionLabel: 'Middle Tennessee',
    population:  '152,000',
    description: 'Located at the geographic center of Tennessee, Murfreesboro is home to MTSU, the Stones River National Battlefield, and a rapidly growing arts and dining scene.',
    heroImage:   'https://images.unsplash.com/photo-1661706555040-66f849d4623b?w=1200&q=85',
    highlights:  ['Stones River Battlefield', 'MTSU', 'Discovery Center', 'Cannonsburgh Village'],
  },
  {
    slug:        'lynchburg',
    name:        'Lynchburg',
    tagline:     'Whiskey Country',
    region:      'middle',
    regionLabel: 'Middle Tennessee',
    population:  '6,000',
    description: 'Home to the world-famous Jack Daniel\'s Distillery, tiny Lynchburg is a charming Southern town where you can tour the oldest registered distillery in America and explore Moore County\'s rich history.',
    heroImage:   'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1200&q=85',
    highlights:  ['Jack Daniel\'s Distillery', 'Moore County Courthouse', 'Lynchburg Hardware & General Store', 'Miss Mary Bobo\'s Boarding House'],
  },

  // West Tennessee
  {
    slug:        'memphis',
    name:        'Memphis',
    tagline:     'Home of the Blues & Rock \'n\' Roll',
    region:      'west',
    regionLabel: 'West Tennessee',
    population:  '633,000',
    description: 'Where the blues were born and rock \'n\' roll came of age. Memphis is a city of deep musical heritage, legendary barbecue, and powerful civil rights history — from Beale Street to Graceland to the National Civil Rights Museum.',
    heroImage:   'https://images.unsplash.com/photo-1543372742-e08542e25f8b?w=1200&q=85',
    highlights:  ['Beale Street', 'Graceland', 'National Civil Rights Museum', 'Sun Studio'],
  },
  {
    slug:        'jackson',
    name:        'Jackson',
    tagline:     'Hub City',
    region:      'west',
    regionLabel: 'West Tennessee',
    population:  '65,000',
    description: 'Known as the Hub City for its central location in West Tennessee, Jackson is home to the legendary Casey Jones Village, a vibrant music heritage, and serves as a hub for the surrounding region.',
    heroImage:   'https://images.unsplash.com/photo-1676135032415-8fd99735022d?w=1200&q=85',
    highlights:  ['Casey Jones Village', 'Cypress Grove Nature Park', 'Jackson Generals Baseball', 'West Tennessee Delta Heritage Center'],
  },
  {
    slug:        'dyersburg',
    name:        'Dyersburg',
    tagline:     'Gateway to the Delta',
    region:      'west',
    regionLabel: 'West Tennessee',
    population:  '17,000',
    description: 'A quiet river city in the heart of the Mississippi Delta region, Dyersburg serves as a gateway to West Tennessee\'s rich agricultural heritage and the broad floodplains of the mighty Mississippi River.',
    heroImage:   'https://images.unsplash.com/photo-1548909710-4f03ab85c6b3?w=1200&q=85',
    highlights:  ['Dyer County Courthouse', 'Forked Deer River', 'Downtown Dyersburg', 'Delta Blues Heritage'],
  },
    {
    slug:        'bolivar',
    name:        'Bolivar',
    tagline:     'Historic Hardeman County',
    region:      'west',
    regionLabel: 'West Tennessee',
    population:  '5,000',
    description: 'One of West Tennessee\'s most historically rich small towns, Bolivar features stunning antebellum architecture, the historic Pillars mansion, and a charming courthouse square that recalls the elegance of the Old South.',
    heroImage:   'https://images.unsplash.com/photo-1506380459748-77ed039c2f88?w=1200&q=85',
    highlights:  ['The Pillars Historic Home', 'Hardeman County Courthouse', 'McNairy Central Historic District', 'Hatchie National Wildlife Refuge'],
  },    
]

export const citiesByRegion = {
  east:   cities.filter(c => c.region === 'east'),
  middle: cities.filter(c => c.region === 'middle'),
  west:   cities.filter(c => c.region === 'west'),
}