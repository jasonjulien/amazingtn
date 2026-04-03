import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

async function seed() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const articles = [
    // ─────────────────────────────────────────────
    // 1. Tennessee Whiskey Trail
    // ─────────────────────────────────────────────
    {
      title: 'The Tennessee Whiskey Trail: A Road Trip Through Distillery Country',
      slug: 'tennessee-whiskey-trail',
      category: 'food',
      excerpt:
        'From the limestone-filtered springs of Lynchburg to the craft distilleries of Nashville, Tennessee has become one of the great whiskey destinations in the world. Here\'s how to drink it all in.',
      seoTitle: 'The Tennessee Whiskey Trail: A Road Trip Through Distillery Country',
      seoDescription:
        'Plan the ultimate Tennessee distillery road trip — from Jack Daniel\'s in Lynchburg to Nashville craft distilleries and everything in between.',
      heroImageUrl: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=1600&q=85',
      body: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            para("Tennessee has always had a complicated relationship with whiskey. The state that gave the world Jack Daniel's and George Dickel also spent decades as a patchwork of dry counties where you couldn't buy a bottle legally. That tension — between deep tradition and stubborn independence — is exactly what makes Tennessee whiskey so interesting."),
            para("Today, the state is in the middle of a full-blown distillery renaissance. More than 50 craft distilleries have opened in the last decade, joining the old-guard legends to create one of the most compelling spirits trails in the country. Whether you're a serious bourbon nerd or just someone who likes a good drink with a great story, there's a Tennessee Whiskey Trail route with your name on it."),
            heading('What Makes Tennessee Whiskey Different'),
            para("Legally, Tennessee whiskey must be produced in Tennessee, made from at least 51% corn, aged in new charred oak barrels, and filtered through a minimum of ten feet of maple charcoal before aging — a process called the Lincoln County Process. That last step is what separates Tennessee whiskey from bourbon. It strips out certain congeners and gives the spirit a distinct smoothness that bourbon drinkers often find surprisingly approachable."),
            heading('The Classic Route: Lynchburg & Tullahoma'),
            para([
              bold("Jack Daniel's Distillery, Lynchburg"), " — This is the pilgrimage. The world's best-selling American whiskey is made in a town of roughly 6,000 people in Moore County — which remained dry until 2009, a fact that never stopped being ironic. The tour is genuinely excellent: you walk the hollow where the limestone spring feeds the operation, smell the fermenting mash, and watch the Lincoln County charcoal filtration in person. Book in advance.",
            ]),
            para([
              bold("George Dickel Distillery, Tullahoma"), " — Just 20 miles from Jack Daniel's, Dickel is the underdog worth knowing. Smaller, quieter, and with a devoted following among people who prefer their Tennessee whiskey with a bit more grain-forward bite. The chill filtration here happens in winter temperatures specifically — a detail that makes the whiskey subtly different from anything else on the trail.",
            ]),
            heading('The New Guard: Nashville & Middle Tennessee'),
            para("Nashville's craft distillery scene has exploded since Tennessee loosened its distillery laws in 2009. The city now has a dozen-plus operations within a short drive of downtown, ranging from micro-distilleries in converted warehouses to slick tasting rooms in The Gulch."),
            para([
              bold("Nelson's Green Brier Distillery"), " in Marathon Village is one of the best stories in Tennessee spirits — two brothers who revived their great-great-great-grandfather's pre-Prohibition distillery using original recipes found in a historical archive. The Belle Meade Bourbon here is approachable and well-made, and the tour covers the full family history.",
            ]),
            para([
              bold("Corsair Distillery"), " leans experimental — think smoked malts, quinoa whiskey, and triple hops expressions. If you're tired of drinking the same thing everywhere, Corsair is your detour.",
            ]),
            heading('Tips for the Trail'),
            list([
              [bold("Designate a driver or use rideshare"), " — Distilleries are spread out. Most require a car to reach, so plan accordingly."],
              [bold("Many distilleries require reservations"), " — especially Jack Daniel's. Book tours ahead of time, particularly on weekends."],
              [bold("Dry county awareness"), " — Moore County (Jack Daniel's) only recently allowed whiskey sales on-site. Carry cash and check hours."],
              [bold("Pair with food"), " — Lynchburg's Miss Mary Bobo's Boarding House serves a legendary family-style lunch that pairs the whole experience together nicely."],
              [bold("The Tennessee Distillers Guild"), " maintains an official trail map at tnwhiskeytrail.com with every licensed member distillery."],
            ]),
            heading('Plan Your Trip'),
            para("A proper Tennessee Whiskey Trail road trip takes two to three days minimum if you want to do it right — one day for Lynchburg and Tullahoma, one day for Nashville, and a third for exploring smaller craft operations in between. The trail runs year-round, but fall is exceptional: cooler temperatures, no summer crowds, and the drive through Middle Tennessee is stunning in October."),
            italic("Tennessee didn't invent whiskey. It just perfected its own version of it."),
          ],
        },
      },
    },

    // ─────────────────────────────────────────────
    // 2. Best Waterfall Hikes
    // ─────────────────────────────────────────────
    {
      title: "Tennessee's Best Waterfall Hikes, By Region",
      slug: 'tennessee-waterfall-hikes',
      category: 'outdoors',
      excerpt:
        "Tennessee has hundreds of waterfalls — from the misty curtains of the Smokies to the limestone plunges of the Cumberland Plateau. Here are the ones worth lacing up your boots for.",
      seoTitle: "Best Waterfall Hikes in Tennessee — By Region",
      seoDescription:
        "Discover Tennessee's best waterfall hikes across East, Middle, and West Tennessee — from Laurel Falls in the Smokies to Fall Creek Falls and beyond.",
      heroImageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=85',
      body: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            para("Tennessee is one of the most waterfall-rich states in the eastern United States. The folded terrain of the Appalachians, the layered limestone of the Cumberland Plateau, and hundreds of creeks cutting through ancient rock have conspired to produce a state where a rewarding waterfall hike is almost never more than a short drive away."),
            para("The trick is knowing which ones are worth the effort. Here's the breakdown, region by region."),
            heading('East Tennessee'),
            para([bold("Laurel Falls — Great Smoky Mountains National Park"), " is the most visited waterfall in the Smokies and one of the most visited in the entire national park system. A paved 2.6-mile round-trip trail makes it accessible to almost anyone. Go early on weekdays to avoid crowds. The falls themselves are a two-tiered cascade of about 80 feet, framed by old-growth tulip trees and rhododendron."]),
            para([bold("Abrams Falls — Cades Cove"), " is the payoff hike of the Smokies. Five miles round-trip through some of the most beautiful creek-bottom terrain in the park, ending at a 20-foot falls that drops into a wide, deep pool. The pool looks swimmable. It isn't safe — people have drowned here. Admire from the rocks."]),
            para([bold("Hen Wallow Falls — Cosby"), " is one of the Smokies' secret gems. A 4.4-mile round-trip hike through the park's quietest entrance, ending at a 90-foot falls that spreads like a fan across a mossy rock face. Cosby sees a fraction of the traffic of Gatlinburg-side trails."]),
            heading('Middle Tennessee — The Cumberland Plateau'),
            para("The Cumberland Plateau is Tennessee's waterfall heartland. The plateau's flat sandstone cap sits over softer limestone and shale, and where creeks reach the edge, they fall — sometimes dramatically."),
            para([bold("Fall Creek Falls State Park"), " contains the tallest free-falling waterfall east of the Rocky Mountains at 256 feet. It's accessible by a short walk from the overlook or a longer gorge trail that lets you stand at the base. The park also has Cane Creek Falls, Piney Falls, and Cane Creek Cascades within easy hiking distance — making it one of the best waterfall-per-mile values in the Southeast."]),
            para([bold("Virgin Falls — De Rosset"), " is one of the most unusual hikes in Tennessee. The trail follows a creek that disappears underground, then re-emerges as a 110-foot falls — dropping into a sinkhole and vanishing again into the earth. Eight miles round-trip through remote backcountry. Not for beginners, but unforgettable."]),
            para([bold("Fall Hollow — Natchez Trace Parkway"), " is the easy win on this list: a five-minute walk from a parkway pullout leads to a lovely 20-foot cascade tucked into a sandstone hollow. Almost no one stops here. That's the point."]),
            heading('Tips for Waterfall Hiking in Tennessee'),
            list([
              [bold("Spring is peak season"), " — snowmelt and spring rains push flows to their highest. Many falls are underwhelming in late summer drought."],
              [bold("Wet rocks are dangerous"), " — Tennessee waterfall accidents are almost always from people who slipped on wet rock near the base. Stay on trails."],
              [bold("Creek crossings"), " — Several plateau hikes require rock-hopping creek crossings. Check recent trip reports after heavy rain."],
              [bold("Crowds in the Smokies"), " — Popular falls like Laurel and Abrams see hundreds of visitors daily in summer. Arrive before 9am or visit in fall/winter."],
            ]),
            heading('Plan Your Trip'),
            para("Tennessee's waterfall season runs year-round, but spring (March–May) and fall (October–November) offer the best combination of good flows, comfortable temperatures, and manageable crowds. Fall Creek Falls State Park has excellent camping and cabin accommodations if you want to base yourself in the plateau for a multi-day waterfall tour."),
            italic("Tennessee has hundreds of waterfalls. The hardest part is deciding where to start."),
          ],
        },
      },
    },

    // ─────────────────────────────────────────────
    // 3. Tennessee Small-Batch Craft Breweries
    // ─────────────────────────────────────────────
    {
      title: "Tennessee Small-Batch: Craft Breweries Worth the Drive",
      slug: 'tennessee-craft-breweries',
      category: 'food',
      excerpt:
        "Tennessee's craft beer scene has grown up. From Knoxville's urban taprooms to the farmhouse breweries of Middle Tennessee, here are the small-batch operations making something genuinely worth drinking.",
      seoTitle: "Tennessee Craft Breweries Worth the Drive | AmazingTN",
      seoDescription:
        "Explore Tennessee's best craft breweries — from Knoxville and Chattanooga to Nashville and the smaller towns in between making exceptional small-batch beer.",
      heroImageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=1600&q=85',
      body: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            para("Tennessee spent most of the twentieth century as one of the least beer-friendly states in the country. High-gravity beer was illegal until 2010. Brewpubs couldn't sell to-go cans until 2019. The state seemed almost determined to stay behind the curve."),
            para("Then something shifted. In the last decade, a wave of serious brewers — many trained elsewhere, drawn home by cheap real estate, supportive communities, and frankly great drinking water — built something remarkable. Tennessee now has more than 100 craft breweries, and several of them rank among the best in the South."),
            heading('East Tennessee'),
            para([bold("Saw Works Brewing, Knoxville"), " occupies a converted factory building in the Old City and has been one of the anchors of Knoxville's food-and-drink revival. Their lagers are technically precise in a way that most American craft breweries don't bother with, and the taproom has the lived-in comfort of somewhere that's been good for a long time."]),
            para([bold("Hutton & Smith, Chattanooga"), " sits in the North Shore district and pairs serious brewing with one of the better brewery food programs in the state. The IPAs lean hazy and tropical; the stouts are worth seeking out in winter. The building itself — a beautifully renovated industrial space with a rooftop deck — is worth the visit."]),
            para([bold("Printshop Beer Co., Knoxville"), " is the newer generation: small, focused, and consistently excellent. They rotate a tight lineup of well-executed styles and have built a loyal following among drinkers who find most craft beer exhausting. A good sign."]),
            heading('Middle Tennessee'),
            para([bold("Blackstone Brewing, Nashville"), " has been around long enough to have survived every wave of the Nashville boom and still make interesting beer. Their St. Charles Porter is a Tennessee institution. The midtown taproom is a reliable anchor in a neighborhood that keeps changing around it."]),
            para([bold("Bearded Iris Brewing, Nashville"), " is the brewery that put Tennessee on the national craft beer map. Their New England IPAs are among the most talked-about in the country, with a haze and tropical fruit character that has attracted beer pilgrims from across the South. The Germantown taproom fills up early on weekends."]),
            para([bold("Leiper's Fork Brewery"), " sits in the small village of Leiper's Fork, about 25 miles south of Nashville, and feels like the anti-Nashville-brewery: no hype, no line, just good beer in a beautiful old building surrounded by rolling farmland. The drive alone is worth it."]),
            heading('A Few Things Worth Knowing'),
            list([
              [bold("Tennessee laws still vary by county"), " — some rural counties remain dry or have limited alcohol sales. Check ahead if you're heading off the beaten path."],
              [bold("Taproom hours shift seasonally"), " — smaller breweries often keep limited hours. Always check Instagram or Google before driving out."],
              [bold("The Tennessee Craft Brewers Guild"), " (tncraftbrew.org) maintains a current directory of every licensed craft brewery in the state."],
              [bold("Food trucks are common"), " — many Tennessee taprooms don't have kitchens but host rotating food trucks. Check the brewery's social channels to see what's parked outside."],
            ]),
            heading('Plan Your Trip'),
            para("The most efficient brewery road trip in Tennessee pairs Knoxville and Chattanooga over a weekend, then saves Nashville for a separate trip — the cities are close enough to the Smokies and the plateau that you can combine drinking with hiking, which is the correct way to spend a Tennessee weekend."),
            italic("Tennessee finally caught up to its own potential. The beer is worth the drive."),
          ],
        },
      },
    },

    // ─────────────────────────────────────────────
    // 4. Long Weekend in Middle Tennessee
    // ─────────────────────────────────────────────
    {
      title: 'A Long Weekend in Middle Tennessee: Beyond Nashville',
      slug: 'middle-tennessee-long-weekend',
      category: 'history',
      excerpt:
        "Nashville gets all the attention. But the towns, farms, and back roads surrounding it are where Middle Tennessee earns its reputation. Here's how to spend three days exploring the region properly.",
      seoTitle: 'A Long Weekend in Middle Tennessee: Beyond Nashville',
      seoDescription:
        'Skip the downtown crowds and discover Middle Tennessee — Franklin, Leiper\'s Fork, Columbia, and the rolling countryside that surrounds Music City.',
      heroImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85',
      body: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            para("Nashville is a great city. It's also, especially on a Friday night in summer, a lot. The bachelorette parties, the pedal taverns, the honky-tonk cover bands playing the same four songs on a loop — it's loud and it's fun and it's exactly what some people want."),
            para("But if you came to Tennessee for something quieter — rolling farmland, good food, genuine history, and the kind of small towns that still feel like themselves — the good news is that all of it is within 45 minutes of downtown. You just have to leave."),
            heading('Day One: Franklin'),
            para("Franklin is the obvious first stop, and it earns its reputation. The downtown square is genuinely beautiful — walkable, lined with independent shops and restaurants, anchored by a courthouse that dates to 1859 — and manages to feel authentic rather than manufactured despite its prosperity."),
            para([bold("Start the morning at the Carter House"), ", the most historically significant site in a town full of them. On November 30, 1864, one of the bloodiest battles of the Civil War was fought here in five hours of close-range combat that killed or wounded nearly 10,000 men. The bullet holes are still in the walls. It's sobering in a way that no history textbook quite captures."]),
            para("Walk the downtown square afterward. Lunch at one of the Main Street restaurants. Browse the antique shops on Fifth Avenue. By mid-afternoon you'll understand why Franklin consistently ranks among the most livable small cities in the country."),
            para([bold("In the evening, drive out to Leiper's Fork"), " — a village of maybe 650 people about eight miles west. It has several good restaurants, a couple of galleries, and on any given weekend you might find a world-class songwriter playing a quiet set in a room that holds 40 people. This is the version of Tennessee music culture that doesn't have a neon sign outside."]),
            heading("Day Two: The Natchez Trace & Columbia"),
            para("Pick up the Natchez Trace Parkway just outside Franklin at the northern terminus near milepost 444. Drive south. Stop at every pull-off that interests you. This is not a road that rewards rushing."),
            para("The Tennessee Valley Divide at milepost 404, the Gordon House at milepost 407, Fall Hollow waterfall at milepost 391 — each one is a small, quiet encounter with a specific piece of history or geology. By midday you'll have covered 50 miles and felt like you went back 200 years."),
            para([bold("Break for lunch in Columbia"), ", a town that's been quietly having a revival of its own. The downtown has good food, a farmers market on Saturdays, and the James K. Polk Home — the only surviving residence of the 11th President, a Tennessee institution who tends to get overlooked outside the state."]),
            para("Drive back via TN-50 east through the countryside. The farms, horse pastures, and cedar-lined ridges along this route are as classically Middle Tennessee as it gets."),
            heading('Day Three: The Back Roads South of Nashville'),
            para([bold("Bell Buckle"), " is the kind of town you'd think someone invented for a movie, except it's been here since the 1850s. One main street, a population under 500, a soda fountain that still serves real phosphates, and an annual RC Cola & Moon Pie Festival that somehow draws thousands of people every June."]),
            para([bold("Shelbyville"), ", just north of Bell Buckle, is the home of the Tennessee Walking Horse — one of the most graceful and distinctly Tennessee breeds in the American horse world. The Tennessee Walking Horse National Celebration happens here every August, but the farms and training operations are visible year-round."]),
            para("Head back to Nashville via I-24 in the late afternoon. Stop in Murfreesboro if you have time — the Stones River National Battlefield is one of the better-preserved Civil War sites in the state, and the visitor center is excellent."),
            heading('Practical Notes'),
            list([
              [bold("Best time to visit"), " — Spring and fall. Middle Tennessee summers are genuinely hot. October is exceptional."],
              [bold("Where to stay"), " — Franklin has excellent boutique hotel options and is a better base than Nashville for this itinerary. The Harpeth Hotel on the square is worth the splurge."],
              [bold("Getting around"), " — You need a car. This is not a walkable itinerary. The drives are part of the point."],
              [bold("Dining"), " — Franklin and Leiper's Fork have strong restaurant scenes. Columbia and Bell Buckle are more limited but have their charms — this is meat-and-three country."],
            ]),
            italic("Nashville will always be there. The back roads south of it are what make Middle Tennessee worth returning to."),
          ],
        },
      },
    },
  ]

  for (const article of articles) {
    const existing = await payload.find({
      collection: 'sponsored-articles',
      where: { slug: { equals: article.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`⏭  Skipping "${article.title}" — already exists`)
      continue
    }

    await payload.create({
      collection: 'sponsored-articles',
      data: {
        title: article.title,
        slug: article.slug,
        status: 'published',
        publishedDate: new Date().toISOString(),
        isEditorial: true,
        featuredOnAdvertisePage: false,
        category: article.category,
        excerpt: article.excerpt,
        body: article.body,
        seo: {
          title: article.seoTitle,
          description: article.seoDescription,
        },
      },
    })

    console.log(`✅ Created: "${article.title}"`)
  }

  console.log('\n🎉 Done! Visit /articles to see the full listing.')
  process.exit(0)
}

// ─── Rich text helpers ────────────────────────────────────────────────────────

function para(content: string | (string | { type: 'text'; text: string; format: number })[]) {
  if (typeof content === 'string') {
    return { type: 'paragraph', children: [{ type: 'text', text: content, format: 0 }] }
  }
  return {
    type: 'paragraph',
    children: content.map((c) =>
      typeof c === 'string' ? { type: 'text', text: c, format: 0 } : c,
    ),
  }
}

function heading(text: string) {
  return { type: 'heading', tag: 'h2', children: [{ type: 'text', text, format: 0 }] }
}

function bold(text: string) {
  return { type: 'text', text, format: 1 }
}

function italic(text: string) {
  return { type: 'paragraph', children: [{ type: 'text', text, format: 2 }] }
}

function list(items: (string | { type: 'text'; text: string; format: number })[][]) {
  return {
    type: 'list',
    listType: 'bullet',
    children: items.map((item) => ({
      type: 'listitem',
      children: item.map((c) =>
        typeof c === 'string' ? { type: 'text', text: c, format: 0 } : c,
      ),
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────────

seed().catch((err) => {
  console.error('❌ Seed failed:', err?.message || err)
  process.exit(1)
})