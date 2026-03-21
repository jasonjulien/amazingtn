import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function seed() {
  console.log('🔌 Connecting to Payload...')
  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  console.log('✅ Connected!')

  // Fetch regions so we can attach relationships
  const { docs: regions } = await payload.find({ collection: 'regions', limit: 10 })
  const east   = regions.find(r => r.slug === 'east')!
  const middle = regions.find(r => r.slug === 'middle')!
  const west   = regions.find(r => r.slug === 'west')!

  console.log('🍽️ Seeding restaurants...')

  const restaurants = [

    // ── MIDDLE TENNESSEE (Nashville & surrounds) ──────────────────────────
    {
      slug:             'princes-hot-chicken',
      name:             "Prince's Hot Chicken Shack",
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'southern',
      priceRange:       '$',
      shortDescription: "The legendary originator of Nashville hot chicken, serving incendiary fried chicken since the 1940s.",
      heroImage:        'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80',
      address:          '123 Ewing Dr, Nashville, TN 37207',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://princeshotchicken.com',
    },
    {
      slug:             'husk-nashville',
      name:             'Husk Nashville',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'southern',
      priceRange:       '$$$',
      shortDescription: 'Chef Sean Brock\'s celebrated farm-to-table Southern restaurant in a stunning 1904 Victorian mansion.',
      heroImage:        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      address:          '37 Rutledge St, Nashville, TN 37210',
      featured:         true,
      featuredTier:     'premium',
      website:          'https://husknashville.com',
    },
    {
      slug:             'bastion-nashville',
      name:             'Bastion',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'american',
      priceRange:       '$$$$',
      shortDescription: 'James Beard Award-winning Chef Josh Habiger\'s intimate 24-seat restaurant serving a weekly six-course tasting menu. Nashville\'s first Michelin Star recipient.',
      heroImage:        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80',
      address:          '434 Houston St, Nashville, TN 37203',
      featured:         true,
      featuredTier:     'premium',
      website:          'https://bastionrestaurant.com',
    },
    {
      slug:             'city-house-nashville',
      name:             'City House',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'italian',
      priceRange:       '$$$',
      shortDescription: 'Chef Tandy Wilson\'s beloved Germantown restaurant serving inventive Italian-Southern cuisine, famous for its pork belly pizza.',
      heroImage:        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
      address:          '1222 4th Ave N, Nashville, TN 37208',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://cityhousenashville.com',
    },
    {
      slug:             'arnolds-country-kitchen',
      name:             "Arnold's Country Kitchen",
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'southern',
      priceRange:       '$',
      shortDescription: 'A Nashville institution since 1983, serving classic Southern meat-and-three plates from a cafeteria-style line beloved by locals.',
      heroImage:        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      address:          '605 8th Ave S, Nashville, TN 37203',
      featured:         false,
      featuredTier:     'free',
      website:          'https://arnoldscountrykitchen.com',
    },
    {
      slug:             'peg-leg-porker-nashville',
      name:             'Peg Leg Porker',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'bbq',
      priceRange:       '$$',
      shortDescription: 'Pitmaster Carey Bringle\'s acclaimed BBQ joint in The Gulch, serving dry-rub ribs, pulled pork, and Tennessee whiskey.',
      heroImage:        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
      address:          '903 Gleaves St, Nashville, TN 37203',
      featured:         false,
      featuredTier:     'free',
      website:          'https://peglegporker.com',
    },
    {
      slug:             'butcher-and-bee-nashville',
      name:             'Butcher & Bee',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          'mediterranean',
      priceRange:       '$$',
      shortDescription: 'Creative Middle Eastern-inspired small plates in a vibrant East Nashville setting, known for inventive seasonal menus.',
      heroImage:        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      address:          '902 Main St, Nashville, TN 37206',
      featured:         false,
      featuredTier:     'free',
      website:          'https://butcherandbee.com',
    },

    // ── WEST TENNESSEE (Memphis) ──────────────────────────────────────────
    {
      slug:             'charlie-vergos-rendezvous',
      name:             "Charlie Vergos' Rendezvous",
      city:             'Memphis',
      region:           west.id,
      cuisine:          'bbq',
      priceRange:       '$$',
      shortDescription: 'Memphis BBQ institution since 1948, famous for slow-cooked dry-rub ribs served in a legendary basement alley location downtown.',
      heroImage:        'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      address:          '52 S 2nd St, Memphis, TN 38103',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://hogsfly.com',
    },
    {
      slug:             'central-bbq-memphis',
      name:             'Central BBQ',
      city:             'Memphis',
      region:           west.id,
      cuisine:          'bbq',
      priceRange:       '$',
      shortDescription: 'A local favorite with multiple Memphis locations, serving award-winning ribs, pulled pork, and beloved BBQ nachos.',
      heroImage:        'https://images.unsplash.com/photo-1558030137-a56c1b004fa3?w=800&q=80',
      address:          '2249 Central Ave, Memphis, TN 38104',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://eatcentralbbq.com',
    },
    {
      slug:             'restaurant-iris-memphis',
      name:             'Restaurant Iris',
      city:             'Memphis',
      region:           west.id,
      cuisine:          'french',
      priceRange:       '$$$$',
      shortDescription: 'James Beard-nominated Chef Kelly English serves elegant Creole-French cuisine in an intimate, romantically lit Cooper-Young setting.',
      heroImage:        'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
      address:          '2146 Monroe Ave, Memphis, TN 38104',
      featured:         true,
      featuredTier:     'premium',
      website:          'https://restaurantiris.com',
    },
    {
      slug:             'gus-world-famous-fried-chicken',
      name:             "Gus's World Famous Fried Chicken",
      city:             'Memphis',
      region:           west.id,
      cuisine:          'southern',
      priceRange:       '$',
      shortDescription: 'Legendary spicy fried chicken with a devoted following, served in a no-frills setting that lets the crispy, flavorful bird speak for itself.',
      heroImage:        'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&q=80',
      address:          '310 S Front St, Memphis, TN 38103',
      featured:         false,
      featuredTier:     'free',
      website:          'https://gusfriedchicken.com',
    },
    {
      slug:             'hog-and-hominy-memphis',
      name:             'Hog & Hominy',
      city:             'Memphis',
      region:           west.id,
      cuisine:          'italian',
      priceRange:       '$$$',
      shortDescription: 'James Beard finalist Chefs Ticer and Hudman serve wood-fired pizzas and inventive Southern-Italian dishes at this beloved Cooper-Young restaurant.',
      heroImage:        'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=80',
      address:          '707 W Brookhaven Cir, Memphis, TN 38117',
      featured:         false,
      featuredTier:     'free',
      website:          'https://hogandhominy.com',
    },

    // ── EAST TENNESSEE (Knoxville & Chattanooga) ──────────────────────────
    {
      slug:             'jc-holdway-knoxville',
      name:             'J.C. Holdway',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          'american',
      priceRange:       '$$$',
      shortDescription: 'James Beard Award-winning Chef Joseph Lenn\'s flagship Knoxville restaurant, serving refined wood-fired Southern cuisine with handmade pastas.',
      heroImage:        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      address:          '501 Union Ave, Knoxville, TN 37902',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://jcholdway.com',
    },
    {
      slug:             'a-dopo-pizza-knoxville',
      name:             'A Dopo Pizza',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          'italian',
      priceRange:       '$$',
      shortDescription: 'Knoxville\'s premier wood-fired Neapolitan pizzeria, known for its tangy sourdough crust and beautifully balanced seasonal toppings.',
      heroImage:        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      address:          '407 Union Ave, Knoxville, TN 37902',
      featured:         false,
      featuredTier:     'free',
      website:          'https://adopokitchen.com',
    },
    {
      slug:             'st-johns-restaurant-chattanooga',
      name:             "St. John's Restaurant",
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          'american',
      priceRange:       '$$$',
      shortDescription: 'Five-time James Beard nominee Chef Daniel Lindley serves rustic Italian-inspired dishes in Chattanooga\'s Southside, featuring wood-fired pizzas and handmade pasta.',
      heroImage:        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      address:          '1278 Market St, Chattanooga, TN 37402',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://stjohnschattanooga.com',
    },
    {
      slug:             'easy-bistro-chattanooga',
      name:             'Easy Bistro & Bar',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          'french',
      priceRange:       '$$$',
      shortDescription: 'A Chattanooga West Village favorite since 2005, offering approachable French-American cuisine in a warm, relaxed atmosphere.',
      heroImage:        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      address:          '203 Broad St, Chattanooga, TN 37402',
      featured:         false,
      featuredTier:     'free',
      website:          'https://easybistro.com',
    },
  ]

  for (const r of restaurants) {
    await payload.create({
      collection: 'restaurants',
      data: r as any,
    })
    console.log(`  ✓ ${r.name}`)
  }

  console.log('✅ Restaurants seeded!')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})