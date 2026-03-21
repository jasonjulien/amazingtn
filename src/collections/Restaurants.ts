import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'cuisine', 'city', 'featured', 'featuredTier'],
  },
  fields: [
    { name: 'slug',             type: 'text', required: true, unique: true, index: true },
    { name: 'name',             type: 'text', required: true },
    { name: 'city',             type: 'text' },
    {
      name:       'region',
      type:       'relationship',
      relationTo: 'regions',
    },
    {
  name:    'cuisine',
  type:    'select',
  hasMany: true,
  options: [
    'american',
    'bbq',
    'southern',
    'hot-chicken',
    'italian',
    'mexican',
    'seafood',
    'asian',
    'french',
    'mediterranean',
    'steakhouse',
    'breakfast-brunch',
    'burgers-sandwiches',
    'pizza',
    'vegetarian-vegan',
    'bar-gastropub',
    'other',
  ],
},
    {
      name:    'priceRange',
      type:    'select',
      options: ['$', '$$', '$$$', '$$$$'],
    },
    { name: 'shortDescription', type: 'text' },
    { name: 'description',      type: 'richText', editor: defaultLexical },
    { name: 'heroImage',        type: 'text' },
    { name: 'address',          type: 'text' },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'featured',        type: 'checkbox', defaultValue: false },
    {
      name:         'featuredTier',
      type:         'select',
      defaultValue: 'free',
      options:      ['free', 'featured', 'premium'],
    },
    { name: 'website', type: 'text' },
    { name: 'phone',   type: 'text' },
  ],
}