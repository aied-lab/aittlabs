import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aittlabs.org',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-Hant',
        locales: {
          'zh-Hant': 'zh-Hant',
          en: 'en',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
