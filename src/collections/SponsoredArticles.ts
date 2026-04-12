import type { CollectionConfig } from 'payload'

export const SponsoredArticles: CollectionConfig = {
  slug: 'sponsored-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sponsor', 'publishedDate', 'status'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. natchez-trace-parkway',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short summary shown in cards and meta description',
      },
    },
    {
      name: 'heroImage',
      type: 'text',
      required: false,
      admin: {
        description: 'Full image URL, e.g. https://images.unsplash.com/photo-...',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    // Relationships
    {
      name: 'relatedDestination',
      type: 'relationship',
      relationTo: 'destinations',
      admin: {
        description: 'Links this article back to a destination page',
      },
    },
    {
      name: 'relatedCity',
      type: 'relationship',
      relationTo: 'cities',
      admin: {
        description: 'Links this article to a city page for backlinks',
      },
    },
    {
      name: 'relatedRegion',
      type: 'relationship',
      relationTo: 'regions',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Outdoors & Nature', value: 'outdoors' },
        { label: 'History & Culture', value: 'history' },
        { label: 'Food & Drink', value: 'food' },
        { label: 'Music & Nightlife', value: 'music' },
        { label: 'Arts & Shopping', value: 'arts' },
        { label: 'Family & Fun', value: 'family' },
      ],
    },
    // Sponsor info
    {
      name: 'sponsorName',
      type: 'text',
      admin: {
        description: 'Leave blank for AmazingTN editorial / demo articles',
      },
    },
    {
      name: 'sponsorUrl',
      type: 'text',
    },
    {
      name: 'sponsorLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'isEditorial',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Check for demo/editorial articles; uncheck for paid sponsor content',
      },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: { description: 'Defaults to article title if blank' },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Shown in Google results and social shares' },
        },
      ],
    },
    // Advertise page feature flag
    {
      name: 'featuredOnAdvertisePage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this article as the sample on the Advertise page',
      },
    },
  ],
}
