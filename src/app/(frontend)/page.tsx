import DestinationCard from '@/components/DestinationCard'

const sampleDestinations = [
  {
    slug:             'graceland',
    name:             'Graceland',
    shortDescription: 'The legendary home of Elvis Presley, featuring the iconic mansion, museums, and memorabilia.',
    city:             'Memphis',
    region:           'west' as const,
    category:         'music' as const,
    featured:         true,
  },
  {
    slug:             'great-smoky-mountains',
    name:             'Great Smoky Mountains National Park',
    shortDescription: "America's most visited national park with stunning mountain views, wildlife, and hiking trails.",
    city:             'Gatlinburg',
    region:           'east' as const,
    category:         'nature' as const,
    featured:         true,
  },
  {
    slug:             'grand-ole-opry',
    name:             'Grand Ole Opry',
    shortDescription: 'The legendary home of country music, hosting live performances since 1925.',
    city:             'Nashville',
    region:           'middle' as const,
    category:         'music' as const,
    featured:         true,
  },
  {
    slug:             'beale-street',
    name:             'Beale Street',
    shortDescription: 'The home of the blues, lined with legendary clubs, restaurants, and live music venues.',
    city:             'Memphis',
    region:           'west' as const,
    category:         'music' as const,
  },
  {
    slug:             'ruby-falls',
    name:             'Ruby Falls',
    shortDescription: "America's tallest and deepest underground waterfall, located deep inside Lookout Mountain.",
    city:             'Chattanooga',
    region:           'east' as const,
    category:         'nature' as const,
  },
  {
    slug:             'jack-daniels-distillery',
    name:             'Jack Daniels Distillery',
    shortDescription: "Tour the world's oldest registered distillery and learn the secrets of Tennessee whiskey.",
    city:             'Lynchburg',
    region:           'middle' as const,
    category:         'food' as const,
    featured:         true,
  },
]

export default function HomePage() {
  return (
    <div style={{ padding: '48px', background: '#fafaf9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
        Explore Tennessee
      </h1>
      <p style={{ fontSize: '16px', color: '#475569', marginBottom: '40px' }}>
        Discover attractions, experiences, and hidden gems across the Volunteer State
      </p>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '24px',
      }}>
        {sampleDestinations.map(d => (
          <DestinationCard key={d.slug} {...d} />
        ))}
      </div>
      </div>
    </div>
  )
}