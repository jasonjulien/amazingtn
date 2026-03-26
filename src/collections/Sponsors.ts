import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    useAsTitle: 'businessName',
    defaultColumns: ['businessName', 'tier', 'status', 'linkedType', 'expiresAt'],
    group: 'Monetization',
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    // ─── Business identity ───────────────────────────────────────────────────
    {
      name: 'businessName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },

    // ─── Sponsorship tier ────────────────────────────────────────────────────
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Basic – $29/mo',    value: 'basic'    },
        { label: 'Featured – $79/mo', value: 'featured' },
        { label: 'Premier – $149/mo', value: 'premier'  },
      ],
    },

    // ─── What they're sponsoring ─────────────────────────────────────────────
    {
      name: 'linkedType',
      type: 'select',
      required: true,
      options: [
        { label: 'Restaurant',           value: 'restaurant'  },
        { label: 'Destination / Attraction', value: 'destination' },
        { label: 'Event',                value: 'event'       },
        { label: 'City Page',            value: 'city'        },
      ],
    },
    {
      name: 'linkedRestaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      admin: {
        condition: (data) => data?.linkedType === 'restaurant',
      },
    },
    {
      name: 'linkedDestination',
      type: 'relationship',
      relationTo: 'destinations',
      admin: {
        condition: (data) => data?.linkedType === 'destination',
      },
    },

    // ─── Status & scheduling ─────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending payment', value: 'pending'   },
        { label: 'Active',          value: 'active'    },
        { label: 'Expired',         value: 'expired'   },
        { label: 'Cancelled',       value: 'cancelled' },
      ],
    },
    {
      name: 'startsAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },

    // ─── Stripe data (set by webhook) ────────────────────────────────────────
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'stripeCheckoutSessionId',
      type: 'text',
      admin: { readOnly: true },
    },

    // ─── Display options ─────────────────────────────────────────────────────
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (data) => ['featured', 'premier'].includes(data?.tier),
      },
    },
    {
      name: 'tagline',
      type: 'text',
      maxLength: 100,
      admin: {
        condition: (data) => data?.tier === 'premier',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
  timestamps: true,
}