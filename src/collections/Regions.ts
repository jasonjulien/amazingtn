import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Regions: CollectionConfig = {
  slug: 'regions',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'tagline'],
  },
  fields: [
    { name: 'slug',        type: 'text', required: true, unique: true, index: true },
    { name: 'label',       type: 'text', required: true },
    { name: 'tagline',     type: 'text' },
    { name: 'description', type: 'richText', editor: defaultLexical },
    { name: 'heroImage',   type: 'text' },
    { name: 'accentColor', type: 'text' },
    { name: 'gradient',    type: 'text' },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['nature', 'music', 'history', 'adventure', 'food', 'family'],
        },
        { name: 'label',       type: 'text' },
        { name: 'description', type: 'text' },
      ],
    },
  ],
}