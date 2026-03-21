import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'region', 'featured', 'featuredTier'],
  },
  fields: [
    { name: 'slug',             type: 'text', required: true, unique: true, index: true },
    { name: 'name',             type: 'text', required: true },
    { name: 'shortDescription', type: 'text' },
    { name: 'description',      type: 'richText', editor: defaultLexical },
    { name: 'city',             type: 'text' },
    {
      name:       'region',
      type:       'relationship',
      relationTo: 'regions',
    },
    {
      name:    'category',
      type:    'select',
      options: ['nature', 'music', 'food', 'history', 'adventure', 'family'],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text' },
      ],
    },
    { name: 'heroImage',       type: 'text' },
    { name: 'featured',        type: 'checkbox', defaultValue: false },
    {
      name:         'featuredTier',
      type:         'select',
      defaultValue: 'free',
      options:      ['free', 'featured', 'premium'],
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'tips',            type: 'richText', editor: defaultLexical },
    { name: 'bestTimeToVisit', type: 'text' },
  ],
}