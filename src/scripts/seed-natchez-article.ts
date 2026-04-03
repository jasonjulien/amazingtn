import dotenv from 'dotenv'
dotenv.config()

async function seed() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  // Check if already seeded
  const existing = await payload.find({
    collection: 'sponsored-articles',
    where: { slug: { equals: 'natchez-trace-parkway' } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log('Natchez Trace article already exists, skipping.')
    process.exit(0)
  }

  // Fetch the Middle Tennessee region for relationship
  const regionResult = await payload.find({
    collection: 'regions',
    where: { slug: { equals: 'middle-tennessee' } },
    limit: 1,
  })
  const regionId = regionResult.docs[0]?.id || null

  const article = await payload.create({
    collection: 'sponsored-articles',
    data: {
      title: "Natchez Trace Parkway: Tennessee's Most Scenic Historic Road Trip",
      slug: 'natchez-trace-parkway',
      status: 'published',
      publishedDate: new Date().toISOString(),
      isEditorial: true,
      featuredOnAdvertisePage: true,
      category: 'history',
      excerpt:
        'Follow the ancient Natchez Trace Parkway through Middle Tennessee — 444 miles of history, waterfalls, and canopy-covered roads with zero stoplights.',
      ...(regionId ? { relatedRegion: regionId } : {}),
      seo: {
        title: "Natchez Trace Parkway: Tennessee's Most Scenic Historic Road Trip",
        description:
          'Follow the ancient Natchez Trace Parkway through Middle Tennessee — 444 miles of history, waterfalls, and canopy-covered roads with zero stoplights.',
      },
      body: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Some roads take you somewhere. The Natchez Trace takes you ',
                  format: 0,
                },
                { type: 'text', text: 'somewhen', format: 2 },
                { type: 'text', text: '.', format: 0 },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'For more than 8,000 years, people have walked, ridden, and driven the path now known as the Natchez Trace. What began as a series of animal trails through the wilderness of the American South became one of the most important roads in early American history — and today it\'s one of the most beautiful drives in the entire country.',
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Tennessee claims a generous stretch of it, and if you haven't made the trip, you're missing one of the state's great secrets.",
                  format: 0,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'What Is the Natchez Trace Parkway?', format: 0 }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Natchez Trace Parkway is a 444-mile scenic highway managed by the National Park Service, stretching from Natchez, Mississippi to Nashville, Tennessee. The road follows the approximate path of the original Natchez Trace — the ancient trail used by Native Americans, colonial traders, frontier soldiers, and early American settlers.',
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'No commercial trucks. No billboards. No stoplights. Just two smooth lanes winding through forests, past historic markers, over quiet creeks, and through some of the most unhurried countryside in the South.',
                  format: 0,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'The History Along the Way', format: 0 }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "The Trace earned its place in American history during the late 1700s and early 1800s. Boatmen who floated goods down the Mississippi River to Natchez or New Orleans would sell their flatboats for lumber, then walk the Trace north back to Nashville and beyond — it was simply the only road home.",
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "Andrew Jackson marched troops down the Trace. Meriwether Lewis died mysteriously along it at a place called Grinder's Stand, now marked by a monument near milepost 385. The Chickasaw and Choctaw nations called this land home for centuries before European contact, and their presence is honored at several stops along the route.",
                  format: 0,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Highlights in the Tennessee Stretch', format: 0 }],
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Meriwether Lewis Site (Milepost 385.9)', format: 1 },
                {
                  type: 'text',
                  text: " — The gravesite and monument for the famed explorer sits in a quiet clearing just off the parkway. A small museum tells the story of his troubled final journey. It's haunting and worth every minute.",
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Gordon House and Ferry Site (Milepost 407.7)', format: 1 },
                {
                  type: 'text',
                  text: ' — One of the few surviving structures from the original Trace era, the Gordon House dates to 1818. The adjacent Duck River crossing was a critical ferry point on the old trail.',
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Fall Hollow Waterfall (Milepost 391.9)', format: 1 },
                {
                  type: 'text',
                  text: ' — A short trail from a small parking area leads to a lovely cascade tucked into the hillside. Easy walk, big reward, almost always uncrowded.',
                  format: 0,
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Tips for Driving the Tennessee Trace', format: 0 }],
            },
            {
              type: 'list',
              listType: 'bullet',
              children: [
                {
                  type: 'listitem',
                  children: [
                    { type: 'text', text: 'Best time to visit: ', format: 1 },
                    {
                      type: 'text',
                      text: 'Mid-October for fall color is exceptional. Spring brings wildflowers and dogwood blooms.',
                      format: 0,
                    },
                  ],
                },
                {
                  type: 'listitem',
                  children: [
                    { type: 'text', text: 'Speed limit: ', format: 1 },
                    {
                      type: 'text',
                      text: '50 mph max, enforced. This isn\'t a road you rush. Embrace it.',
                      format: 0,
                    },
                  ],
                },
                {
                  type: 'listitem',
                  children: [
                    { type: 'text', text: 'Fuel up before you enter: ', format: 1 },
                    {
                      type: 'text',
                      text: 'Gas stations don\'t exist on the parkway itself. Plan stops in Hohenwald, Columbia, or Franklin.',
                      format: 0,
                    },
                  ],
                },
                {
                  type: 'listitem',
                  children: [
                    { type: 'text', text: 'Bikes and motorcycles: ', format: 1 },
                    {
                      type: 'text',
                      text: 'The Trace is legendary among cyclists and motorcyclists for its smooth pavement and gentle curves.',
                      format: 0,
                    },
                  ],
                },
                {
                  type: 'listitem',
                  children: [
                    { type: 'text', text: 'Starting from Nashville: ', format: 1 },
                    {
                      type: 'text',
                      text: 'Take I-40 west to TN-96 toward Fairview. You\'ll be on the Trace within 45 minutes of downtown.',
                      format: 0,
                    },
                  ],
                },
              ],
            },
            {
              type: 'heading',
              tag: 'h2',
              children: [{ type: 'text', text: 'Plan Your Trip', format: 0 }],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'The Natchez Trace Parkway is free to enter and open year-round. The National Park Service maintains a helpful trip planner at nps.gov/natr. Camping is available at several points along the route for those who want to slow down even further.',
                  format: 0,
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Tennessee has a lot of great roads. This one has a soul.',
                  format: 2,
                },
              ],
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
  })

  console.log(`✅ Created article: "${article.title}" (id: ${article.id})`)
  console.log(`   → Visit at /articles/natchez-trace-parkway`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err?.message || err)
  console.error(err)
  process.exit(1)
})