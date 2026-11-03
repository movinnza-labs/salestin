import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { linkField } from '../fields/link'
import { revalidateEverything } from '../hooks/revalidate'

const globalAccess = { read: anyone, update: authenticated }

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Settings' },
  access: globalAccess,
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'SELESTIN Professional' },
            { name: 'tagline', type: 'text' },
          ],
        },
        {
          label: 'Company & contact',
          description: 'Shown in the footer, on the contact page and in search-engine structured data.',
          fields: [
            { name: 'companyName', type: 'text' },
            { name: 'address', type: 'textarea' },
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { width: '50%' } },
                { name: 'email', type: 'email', admin: { width: '50%' } },
              ],
            },
            { name: 'website', type: 'text' },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp number',
              admin: {
                description:
                  'With country code, e.g. +91 99756 06592. Enables the WhatsApp buttons on products and the contact page.',
              },
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Google Maps embed URL',
              admin: {
                description:
                  'Optional. In Google Maps: Share → Embed a map → copy the src="…" link. If empty, the map searches for the address above.',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: ['instagram', 'facebook', 'youtube', 'linkedin', 'x'].map((v) => ({ label: v, value: v })),
                },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO defaults',
          fields: [
            { name: 'defaultMetaTitle', type: 'text' },
            { name: 'defaultMetaDescription', type: 'textarea', maxLength: 300 },
            { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              label: 'Google Analytics 4 measurement ID',
              admin: { description: 'Looks like G-XXXXXXXXXX. Leave empty to disable analytics.' },
            },
            {
              name: 'searchConsoleVerification',
              type: 'text',
              label: 'Google Search Console verification code',
              admin: {
                description:
                  'From Search Console → HTML tag method: only the content="…" value of the <meta name="google-site-verification"> tag.',
              },
            },
          ],
        },
        {
          label: 'Notifications',
          fields: [
            {
              name: 'enquiryNotificationEmail',
              type: 'email',
              admin: {
                description:
                  'New website enquiries are emailed here (requires SMTP settings in the server environment).',
              },
            },
          ],
        },
      ],
    },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  admin: { group: 'Settings' },
  access: globalAccess,
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    {
      name: 'announcement',
      type: 'text',
      admin: { description: 'Thin bar above the header. Leave empty to hide.' },
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      admin: { initCollapsed: true },
      fields: [
        linkField({ required: true }),
        {
          name: 'subLinks',
          label: 'Dropdown links',
          type: 'array',
          maxRows: 10,
          admin: { description: 'Optional: turns this item into a dropdown menu.', initCollapsed: true },
          fields: [linkField({ required: true })],
        },
      ],
    },
    linkField({ name: 'cta', label: 'Header button' }),
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: { group: 'Settings' },
  access: globalAccess,
  hooks: { afterChange: [revalidateEverything] },
  fields: [
    { name: 'about', type: 'textarea' },
    {
      name: 'columns',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [linkField({ required: true })] },
      ],
    },
    { name: 'bottomNote', type: 'text' },
  ],
}

export const globals = [SiteSettings, Header, Footer]
