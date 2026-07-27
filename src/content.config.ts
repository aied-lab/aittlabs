import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    title_en: z.string().optional(),
    subtitle_en: z.string().optional(),
    type: z.enum(['working-paper', 'method']),
    version: z.string(),
    status: z.enum(['draft', 'published']),
    published: z.coerce.date(),
    authors: z.array(
      z.object({
        name: z.string(),
        name_en: z.string().optional(),
        orcid: z.string().optional(),
        affiliation: z.string().optional(),
      })
    ),
    keywords_zh: z.array(z.string()).default([]),
    keywords_en: z.array(z.string()).default([]),
    methods: z.array(z.string()).default([]),
    data_availability: z.string().optional(),
    license: z.string().default('CC BY-NC 4.0'),
    pdf: z.string().nullable().optional(),
    doi: z.string().nullable().optional(),
    changelog: z
      .array(
        z.object({
          version: z.string(),
          date: z
            .union([z.date(), z.string()])
            .transform(d => (d instanceof Date ? d.toISOString().slice(0, 10) : d)),
          note: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { research };
