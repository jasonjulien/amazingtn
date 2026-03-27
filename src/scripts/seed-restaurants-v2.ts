import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function seed() {
  console.log('🔌 Connecting to Payload...')
  const { default: config } = await import('../payload.config')
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config })
  console.log('✅ Connected!')

  const { docs: regions } = await payload.find({ collection: 'regions', limit: 10 })
  const east   = regions.find(r => r.slug === 'east')!
  const middle = regions.find(r => r.slug === 'middle')!
  const west   = regions.find(r => r.slug === 'west')!

  console.log('🍽️ Seeding additional restaurants...')

  const restaurants = [

    // ── KNOXVILLE (East) ──────────────────────────────────────────────────
    {
      slug:             'emilia-knoxville',
      name:             'Emilia',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          ['italian'],
      priceRange:       '$$$',
      shortDescription: 'Chef Matt Gallaher serves handmade pasta and seasonal Italian fare in a cozy Market Square setting, earning national recognition for his ingredient-driven approach.',
      heroImage:        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      address:          '21 Market Square, Knoxville, TN 37902',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://emiliaknoxville.com',
    },
    {
      slug:             'stock-and-barrel-knoxville',
      name:             'Stock & Barrel',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          ['american', 'burgers-sandwiches', 'bar-gastropub'],
      priceRange:       '$$',
      shortDescription: 'Craft burgers and fine bourbon in the heart of Market Square since 2013, using locally sourced beef and Benton\'s Smoky Mountain bacon.',
      heroImage:        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      address:          '35 Market Square, Knoxville, TN 37902',
      featured:         false,
      featuredTier:     'free',
      website:          'https://thestockandbarrel.com',
    },
    {
      slug:             'sweet-ps-bbq-knoxville',
      name:             "Sweet P's BBQ & Downtown Dive",
      city:             'Knoxville',
      region:           east.id,
      cuisine:          ['bbq', 'southern'],
      priceRange:       '$',
      shortDescription: 'Knoxville\'s favorite casual BBQ spot serving smoky brisket, pulled pork, and daily specials from a counter-style setup in a lively downtown setting.',
      heroImage:        'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80',
      address:          '3725 Maryville Pike, Knoxville, TN 37920',
      featured:         false,
      featuredTier:     'free',
      website:          'https://sweetpsbbq.com',
    },
    {
      slug:             'kaizen-knoxville',
      name:             'Kaizen',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          ['asian'],
      priceRange:       '$$',
      shortDescription: 'An izakaya-style pan-Asian pub in Old City serving Japanese, Thai, and Szechuan-inspired small plates including pork belly fried rice and steamed buns.',
      heroImage:        'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=800&q=80',
      address:          '319 N Gay St, Knoxville, TN 37917',
      featured:         false,
      featuredTier:     'free',
      website:          'https://kaizenknoxville.com',
    },
    {
      slug:             'tomato-head-knoxville',
      name:             'The Tomato Head',
      city:             'Knoxville',
      region:           east.id,
      cuisine:          ['pizza', 'vegetarian-vegan', 'american'],
      priceRange:       '$',
      shortDescription: 'A beloved Market Square institution for over 35 years, famous for creative pizzas, sandwiches, and one of the most vegetarian-friendly menus in East Tennessee.',
      heroImage:        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      address:          '12 Market Square, Knoxville, TN 37902',
      featured:         false,
      featuredTier:     'free',
      website:          'https://thetomatohead.com',
    },

    // ── CHATTANOOGA (East) ────────────────────────────────────────────────
    {
      slug:             'alleia-chattanooga',
      name:             'Alleia',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          ['italian'],
      priceRange:       '$$$',
      shortDescription: 'Acclaimed Italian restaurant on Main Street serving handmade pastas and wood-fired dishes including a celebrated pappardelle with braised veal.',
      heroImage:        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      address:          '25 E Main St, Chattanooga, TN 37408',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://alleiarestaurant.com',
    },
    {
      slug:             'calliope-chattanooga',
      name:             'Calliope',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          ['mediterranean'],
      priceRange:       '$$$',
      shortDescription: 'A 2025 New York Times Top 50 restaurant and James Beard semifinalist, serving modern Levantine cuisine with Southern ingredients in downtown Chattanooga.',
      heroImage:        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      address:          '422 E Martin Luther King Blvd, Chattanooga, TN 37403',
      featured:         true,
      featuredTier:     'premium',
      website:          'https://www.callioperestaurant.com',
    },
    {
      slug:             'main-street-meats-chattanooga',
      name:             'Main Street Meats',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          ['american', 'burgers-sandwiches'],
      priceRange:       '$$',
      shortDescription: 'A farm-to-table butcher shop and restaurant on Main Street serving premium cuts, housemade charcuterie, and a burger widely regarded as Chattanooga\'s best.',
      heroImage:        'https://images.unsplash.com/photo-1558030137-a56c1b004fa3?w=800&q=80',
      address:          '217 E Main St, Chattanooga, TN 37408',
      featured:         false,
      featuredTier:     'free',
      website:          'https://mainstreetmeats.com',
    },
    {
      slug:             'community-pie-chattanooga',
      name:             'Community Pie',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          ['pizza', 'italian'],
      priceRange:       '$$',
      shortDescription: 'Chattanooga\'s most beloved pizzeria, serving Neapolitan and Detroit-style pies made fresh daily with locally sourced toppings and house-made dough.',
      heroImage:        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
      address:          '812 Georgia Ave, Chattanooga, TN 37402',
      featured:         false,
      featuredTier:     'free',
      website:          'https://communitypie.com',
    },
    {
      slug:             'stir-chattanooga',
      name:             'STIR',
      city:             'Chattanooga',
      region:           east.id,
      cuisine:          ['american', 'seafood', 'bar-gastropub'],
      priceRange:       '$$$',
      shortDescription: 'An open-air concept in the historic Chattanooga Choo Choo complex, perfect for oysters, craft cocktails, and seasonal American cuisine on the heated patio.',
      heroImage:        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      address:          '1400 Market St, Chattanooga, TN 37402',
      featured:         false,
      featuredTier:     'free',
      website:          'https://stirchattanooga.com',
    },

    // ── NASHVILLE additions (Middle) ──────────────────────────────────────
    {
      slug:             'loveless-cafe-nashville',
      name:             'Loveless Cafe',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          ['southern', 'breakfast-brunch'],
      priceRange:       '$$',
      shortDescription: 'A Nashville icon since 1951, famous for scratch-made biscuits, country ham, and Southern breakfast served in a charming roadhouse on the Natchez Trace.',
      heroImage:        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80',
      address:          '8400 TN-100, Nashville, TN 37221',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://lovelesscafe.com',
    },
    {
      slug:             'princes-hot-chicken-bolton',
      name:             "Bolton's Spicy Chicken & Fish",
      city:             'Nashville',
      region:           middle.id,
      cuisine:          ['hot-chicken', 'southern'],
      priceRange:       '$',
      shortDescription: 'A legendary East Nashville institution serving some of the spiciest and most authentic hot chicken in the city, with a devoted local following since the 1980s.',
      heroImage:        'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80',
      address:          '624 Main St, Nashville, TN 37206',
      featured:         false,
      featuredTier:     'free',
      website:          'https://boltonshotchicken.com',
    },
    {
      slug:             'mas-tacos-por-favor-nashville',
      name:             'Mas Tacos Por Favor',
      city:             'Nashville',
      region:           middle.id,
      cuisine:          ['mexican'],
      priceRange:       '$',
      shortDescription: 'An East Nashville cult favorite serving creative Mexican street food, housemade tortillas, and legendary tortilla soup in a colorful, no-frills setting.',
      heroImage:        'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      address:          '732 McFerrin Ave, Nashville, TN 37206',
      featured:         false,
      featuredTier:     'free',
      website:          'https://mastacos.com',
    },

    // ── FRANKLIN (Middle) ─────────────────────────────────────────────────
    {
      slug:             'merridees-franklin',
      name:             "Merridee's Breadbasket",
      city:             'Franklin',
      region:           middle.id,
      cuisine:          ['american', 'breakfast-brunch'],
      priceRange:       '$',
      shortDescription: 'A Franklin institution since 1981, beloved for fresh-baked breads, hearty soups, and scratch-made breakfast in a warm downtown setting.',
      heroImage:        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      address:          '110 4th Ave S, Franklin, TN 37064',
      featured:         false,
      featuredTier:     'free',
      website:          'https://merridees.com',
    },
    {
      slug:             'frothy-monkey-franklin',
      name:             'Frothy Monkey',
      city:             'Franklin',
      region:           middle.id,
      cuisine:          ['american', 'breakfast-brunch', 'bar-gastropub'],
      priceRange:       '$$',
      shortDescription: 'A Nashville-born cafe and restaurant with a beloved Franklin location, serving farm-to-table breakfast, lunch, and dinner with an exceptional coffee program.',
      heroImage:        'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80',
      address:          '229 Franklin Rd, Franklin, TN 37064',
      featured:         false,
      featuredTier:     'free',
      website:          'https://frothymonkey.com',
    },
    {
      slug:             'saffire-franklin',
      name:             'Saffire',
      city:             'Franklin',
      region:           middle.id,
      cuisine:          ['american', 'southern'],
      priceRange:       '$$$',
      shortDescription: 'Franklin\'s premier upscale dining destination, serving contemporary American cuisine with Southern roots in the historic Factory at Franklin.',
      heroImage:        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      address:          'The Factory, 230 Franklin Rd, Franklin, TN 37064',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://saffirerestaurant.com',
    },

    // ── MEMPHIS additions (West) ──────────────────────────────────────────
    {
      slug:             'cozy-corner-memphis',
      name:             'Cozy Corner Restaurant',
      city:             'Memphis',
      region:           west.id,
      cuisine:          ['bbq', 'southern'],
      priceRange:       '$',
      shortDescription: 'A Memphis BBQ landmark since 1977, famous for its uniquely seasoned Cornish hen and slow-smoked ribs in a no-frills midtown setting beloved by locals.',
      heroImage:        'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
      address:          '745 N Pkwy, Memphis, TN 38105',
      featured:         false,
      featuredTier:     'free',
      website:          'https://cozycornerbbq.com',
    },
    {
      slug:             'payne-bar-b-que-memphis',
      name:             "Payne's Bar-B-Que",
      city:             'Memphis',
      region:           west.id,
      cuisine:          ['bbq'],
      priceRange:       '$',
      shortDescription: 'One of Memphis\'s most authentic and beloved BBQ joints, famous for its pulled pork sandwiches topped with a tangy, house-made slaw on Texas toast.',
      heroImage:        'https://images.unsplash.com/photo-1558030137-a56c1b004fa3?w=800&q=80',
      address:          '1762 Lamar Ave, Memphis, TN 38114',
      featured:         false,
      featuredTier:     'free',
      website:          '',
    },
    {
      slug:             'andrew-michael-italian-kitchen-memphis',
      name:             'Andrew Michael Italian Kitchen',
      city:             'Memphis',
      region:           west.id,
      cuisine:          ['italian'],
      priceRange:       '$$$',
      shortDescription: 'James Beard-nominated Chefs Andrew Ticer and Michael Hudman serve fine Italian cuisine with Southern influences and handmade pastas in an intimate East Memphis setting.',
      heroImage:        'https://images.unsplash.com/photo-1551183053-bf91798d792e?w=800&q=80',
      address:          '712 W Brookhaven Cir, Memphis, TN 38117',
      featured:         true,
      featuredTier:     'featured',
      website:          'https://andrewmichaelitaliankitchen.com',
    },
  ]

  for (const r of restaurants) {
    try {
      await payload.create({
        collection: 'restaurants',
        data: r as any,
      })
      console.log(`  ✓ ${r.name}`)
    } catch (err: any) {
      console.error(`  ✗ ${r.name}: ${err.message}`)
    }
  }

  console.log('✅ Done!')
  process.exit(0)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})