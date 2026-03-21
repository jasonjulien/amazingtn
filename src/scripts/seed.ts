import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function seed() {
  console.log('🔌 Connecting to Payload...')
  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  console.log('✅ Connected!')

  console.log('🌱 Seeding regions...')

  const east = await payload.create({
    collection: 'regions',
    data: {
      slug: 'east',
      label: 'East Tennessee',
      tagline: 'Mountain Majesty',
      heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85',
      accentColor: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #15803d)',
      highlights: [
        { icon: 'adventure', label: 'Great Smoky Mountains',  description: "Over 800 miles of trails and stunning vistas in America's most visited national park." },
        { icon: 'nature',    label: 'Pristine Wilderness',    description: '56 state parks and countless natural areas perfect for hiking, camping, and kayaking.' },
        { icon: 'music',     label: 'Appalachian Culture',    description: 'A living heritage of mountain music, craftsmanship, and Appalachian traditions.' },
        { icon: 'history',   label: 'Charming Towns',         description: "From Gatlinburg's resort village charm to the historic streets of Jonesborough." },
      ],
    },
  })

  const middle = await payload.create({
    collection: 'regions',
    data: {
      slug: 'middle',
      label: 'Middle Tennessee',
      tagline: 'Music City & Beyond',
      heroImage: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?w=1600&q=85',
      accentColor: '#d97706',
      gradient: 'linear-gradient(135deg, #d97706, #c2410c)',
      highlights: [
        { icon: 'music',   label: 'Grand Ole Opry',        description: 'The longest-running radio broadcast in history and the heart of country music.' },
        { icon: 'food',    label: 'World-Class Dining',    description: "From hot chicken to James Beard-recognized restaurants, Nashville's food scene thrills." },
        { icon: 'history', label: 'Rich Civil War History', description: "Battlefields, antebellum mansions, and museums that tell America's defining story." },
        { icon: 'nature',  label: 'Rolling Hill Country',  description: 'Scenic parkways, waterfalls, and peaceful countryside just beyond the city limits.' },
      ],
    },
  })

  const west = await payload.create({
    collection: 'regions',
    data: {
      slug: 'west',
      label: 'West Tennessee',
      tagline: 'Soul of the Delta',
      heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600&q=85',
      accentColor: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed, #1d4ed8)',
      highlights: [
        { icon: 'music',   label: 'Birthplace of the Blues', description: 'Beale Street, Sun Studio, and Stax Records — where rock and soul were born.' },
        { icon: 'history', label: 'Civil Rights Legacy',     description: "Home to the National Civil Rights Museum, built at the site of Dr. King's assassination." },
        { icon: 'food',    label: 'Memphis BBQ',             description: 'World-famous dry-rub ribs and slow-smoked traditions that put Memphis on the culinary map.' },
        { icon: 'nature',  label: 'Mississippi River',       description: "Mud Island, riverside parks, and the mighty Mississippi shaping West Tennessee's landscape." },
      ],
    },
  })

  console.log('🌱 Seeding cities...')

  const cityData = [
    { slug: 'knoxville',    name: 'Knoxville',    tagline: 'Gateway to the Smokies',        region: east.id,   regionLabel: 'East Tennessee',   population: '190,000', heroImage: 'https://images.unsplash.com/photo-1627918563419-121d60046176?w=1200&q=85',   highlights: ['Market Square', 'Tennessee Theatre', 'Museum of Appalachia', "World's Fair Park"], description: "A vibrant university city nestled at the foothills of the Great Smoky Mountains." },
    { slug: 'gatlinburg',   name: 'Gatlinburg',   tagline: 'Mountain Resort Village',       region: east.id,   regionLabel: 'East Tennessee',   population: '4,000',   heroImage: 'https://images.unsplash.com/photo-1638801810119-af3e9bc86098?w=1200&q=85',   highlights: ['SkyLift Park', "Ripley's Aquarium", 'Arts & Crafts Community', 'Ober Gatlinburg'], description: 'A charming mountain resort town serving as the primary gateway to Great Smoky Mountains National Park.' },
    { slug: 'pigeon-forge', name: 'Pigeon Forge', tagline: 'Home of Dollywood',             region: east.id,   regionLabel: 'East Tennessee',   population: '6,000',   heroImage: 'https://images.unsplash.com/photo-1734964714023-9b8ad269ba75?w=1200&q=85',   highlights: ['Dollywood', 'Titanic Museum', 'The Island', 'Smoky Mountain Alpine Coaster'], description: 'A premier family vacation destination in the Smoky Mountains, home to Dollywood theme park.' },
    { slug: 'chattanooga',  name: 'Chattanooga',  tagline: 'Scenic City',                   region: east.id,   regionLabel: 'East Tennessee',   population: '181,000', heroImage: 'https://images.unsplash.com/photo-1628878685986-6b4f03994a98?w=1200&q=85',   highlights: ['Tennessee Aquarium', 'Lookout Mountain', 'Ruby Falls', 'Walnut Street Bridge'], description: 'Dramatically situated along the Tennessee River at the foot of Lookout Mountain.' },
    { slug: 'nashville',    name: 'Nashville',    tagline: 'Music City',                    region: middle.id, regionLabel: 'Middle Tennessee', population: '715,000', heroImage: 'https://images.unsplash.com/photo-1715013550766-6dade517c856?w=1200&q=85',   highlights: ['Grand Ole Opry', 'Country Music Hall of Fame', 'Lower Broadway', 'The Parthenon'], description: "The country music capital of the world, Nashville pulses with live music on every corner." },
    { slug: 'franklin',     name: 'Franklin',     tagline: 'Coolest Small Town in America', region: middle.id, regionLabel: 'Middle Tennessee', population: '83,000',  heroImage: 'https://images.unsplash.com/photo-1634232503346-6f69ceb6bfc9?w=1200&q=85',   highlights: ['Downtown Franklin', 'Carter House', 'Carnton Plantation', 'Factory at Franklin'], description: "Named one of the coolest small towns in America, Franklin combines Civil War history with a thriving arts scene." },
    { slug: 'murfreesboro', name: 'Murfreesboro', tagline: 'Heart of Tennessee',            region: middle.id, regionLabel: 'Middle Tennessee', population: '152,000', heroImage: 'https://images.unsplash.com/photo-1661706555040-66f849d4623b?w=1200&q=85',   highlights: ['Stones River Battlefield', 'MTSU', 'Discovery Center', 'Cannonsburgh Village'], description: 'Located at the geographic center of Tennessee, Murfreesboro is home to MTSU and the Stones River National Battlefield.' },
    { slug: 'lynchburg',    name: 'Lynchburg',    tagline: 'Whiskey Country',               region: middle.id, regionLabel: 'Middle Tennessee', population: '6,000',   heroImage: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1200&q=85',   highlights: ["Jack Daniel's Distillery", 'Moore County Courthouse', 'Lynchburg Hardware & General Store', "Miss Mary Bobo's Boarding House"], description: "Home to the world-famous Jack Daniel's Distillery." },
    { slug: 'memphis',      name: 'Memphis',      tagline: "Home of the Blues & Rock 'n' Roll", region: west.id, regionLabel: 'West Tennessee', population: '633,000', heroImage: 'https://images.unsplash.com/photo-1543372742-e08542e25f8b?w=1200&q=85',   highlights: ['Beale Street', 'Graceland', 'National Civil Rights Museum', 'Sun Studio'], description: "Where the blues were born and rock 'n' roll came of age." },
    { slug: 'jackson',      name: 'Jackson',      tagline: 'Hub City',                      region: west.id,   regionLabel: 'West Tennessee',  population: '65,000',  heroImage: 'https://images.unsplash.com/photo-1676135032415-8fd99735022d?w=1200&q=85',   highlights: ['Casey Jones Village', 'Cypress Grove Nature Park', 'Jackson Generals Baseball', 'West Tennessee Delta Heritage Center'], description: 'Known as the Hub City for its central location in West Tennessee.' },
    { slug: 'dyersburg',    name: 'Dyersburg',    tagline: 'Gateway to the Delta',          region: west.id,   regionLabel: 'West Tennessee',  population: '17,000',  heroImage: 'https://images.unsplash.com/photo-1548909710-4f03ab85c6b3?w=1200&q=85',   highlights: ['Dyer County Courthouse', 'Forked Deer River', 'Downtown Dyersburg', 'Delta Blues Heritage'], description: "A quiet river city in the heart of the Mississippi Delta region." },
    { slug: 'bolivar',      name: 'Bolivar',      tagline: 'Historic Hardeman County',      region: west.id,   regionLabel: 'West Tennessee',  population: '5,000',   heroImage: 'https://images.unsplash.com/photo-1506380459748-77ed039c2f88?w=1200&q=85',   highlights: ['The Pillars Historic Home', 'Hardeman County Courthouse', 'McNairy Central Historic District', 'Hatchie National Wildlife Refuge'], description: "One of West Tennessee's most historically rich small towns." },
  ]

  for (const city of cityData) {
    await payload.create({
      collection: 'cities',
      data: {
        slug:        city.slug,
        name:        city.name,
        tagline:     city.tagline,
        region:      city.region,
        regionLabel: city.regionLabel,
        population:  city.population,
        heroImage:   city.heroImage,
        highlights:  city.highlights.map(h => ({ highlight: h })),
        description: city.description,
      },
    })
  }

  console.log('🌱 Seeding destinations...')

  const regionMap: Record<string, number> = {
    east:   east.id,
    middle: middle.id,
    west:   west.id,
  }

  const destinationData = [
    { slug: 'graceland',                  name: 'Graceland',                           shortDescription: 'The legendary home of Elvis Presley, featuring the iconic mansion, museums, and memorabilia.',                                    city: 'Memphis',               region: 'west',   category: 'music',     featured: true,  heroImage: 'https://images.unsplash.com/photo-1720016119359-d6372f8a4491?w=800&q=80' },
    { slug: 'great-smoky-mountains',      name: 'Great Smoky Mountains National Park', shortDescription: "America's most visited national park with stunning mountain views, wildlife, and hiking trails.",                                 city: 'Gatlinburg',            region: 'east',   category: 'nature',    featured: true,  heroImage: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=800&q=80' },
    { slug: 'grand-ole-opry',             name: 'Grand Ole Opry',                      shortDescription: 'The legendary home of country music, hosting live performances since 1925.',                                                       city: 'Nashville',             region: 'middle', category: 'music',     featured: true,  heroImage: 'https://images.unsplash.com/photo-1674332528480-63b5f01070d1?w=800&q=80' },
    { slug: 'beale-street',               name: 'Beale Street',                        shortDescription: 'The home of the blues, lined with legendary clubs, restaurants, and live music venues.',                                          city: 'Memphis',               region: 'west',   category: 'music',     featured: false, heroImage: 'https://images.unsplash.com/photo-1543372742-e7d0b9947a2b?q=80&w=1774' },
    { slug: 'ruby-falls',                 name: 'Ruby Falls',                          shortDescription: "America's tallest and deepest underground waterfall, located deep inside Lookout Mountain.",                                       city: 'Chattanooga',           region: 'east',   category: 'nature',    featured: false, heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80' },
    { slug: 'jack-daniels-distillery',    name: 'Jack Daniels Distillery',             shortDescription: "Tour the world's oldest registered distillery and learn the secrets of Tennessee whiskey.",                                        city: 'Lynchburg',             region: 'middle', category: 'food',      featured: true,  heroImage: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80' },
    { slug: 'dollywood',                  name: 'Dollywood',                           shortDescription: 'Award-winning theme park featuring world-class rides, shows, and Appalachian culture.',                                           city: 'Pigeon Forge',          region: 'east',   category: 'family',    featured: true,  heroImage: 'https://images.unsplash.com/photo-1628008392226-0d2115fb122c?w=800&q=80' },
    { slug: 'parthenon',                  name: 'The Parthenon',                       shortDescription: 'A full-scale replica of the original Parthenon in Athens, featuring a 42-foot Athena statue.',                                    city: 'Nashville',             region: 'middle', category: 'history',   featured: false, heroImage: 'https://images.unsplash.com/photo-1749739427270-73f227ec5b0c?w=800&q=80' },
    { slug: 'ocoee-river',                name: 'Ocoee River Whitewater',              shortDescription: 'Olympic-level whitewater rafting on the river that hosted the 1996 Olympics.',                                                    city: 'Polk County',           region: 'east',   category: 'adventure', featured: false, heroImage: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80' },
    { slug: 'cades-cove',                 name: 'Cades Cove',                          shortDescription: 'A broad valley surrounded by mountains, known for wildlife viewing and historic buildings.',                                      city: 'Great Smoky Mountains', region: 'east',   category: 'nature',    featured: false, heroImage: 'https://images.unsplash.com/photo-1751843090856-254da5d6f441?w=800&q=80' },
    { slug: 'national-civil-rights-museum', name: 'National Civil Rights Museum',      shortDescription: 'Located at the Lorraine Motel, chronicling the American civil rights movement.',                                                  city: 'Memphis',               region: 'west',   category: 'history',   featured: true,  heroImage: 'https://images.unsplash.com/photo-1562387729-4d71956ab564?w=800&q=80' },
    { slug: 'tennessee-aquarium',         name: 'Tennessee Aquarium',                  shortDescription: 'World-class aquarium featuring freshwater and ocean exhibits on the Tennessee River.',                                            city: 'Chattanooga',           region: 'east',   category: 'family',    featured: false, heroImage: 'https://images.unsplash.com/photo-1554147686-c7a0e12404cb?w=800&q=80' },
  ]

  for (const dest of destinationData) {
    await payload.create({
      collection: 'destinations',
      data: {
        slug:             dest.slug,
        name:             dest.name,
        shortDescription: dest.shortDescription,
        city:             dest.city,
        region:           regionMap[dest.region],
        category:         dest.category as any,
        featured:         dest.featured,
        featuredTier:     'free',
        heroImage:        dest.heroImage,
      },
    })
  }

  console.log('✅ Seed complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})