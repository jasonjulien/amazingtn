import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Cities: CollectionConfig = {
  slug: 'cities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'region', 'featured'],
  },
  fields: [
    { name: 'slug',        type: 'text', required: true, unique: true, index: true },
    { name: 'name',        type: 'text', required: true },
    { name: 'tagline',     type: 'text' },
    {
      name:         'region',
      type:         'relationship',
      relationTo:   'regions',
      required:     true,
    },
    { name: 'regionLabel', type: 'text' },
    { name: 'population',  type: 'text' },
    { name: 'description', type: 'richText', editor: defaultLexical },
    { name: 'heroImage',   type: 'text' },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'highlight', type: 'text' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}