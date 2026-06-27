import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://webcraftio.studio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Future local pages can be added here, e.g.:
    // {
    //   url: 'https://webcraftio.studio/locations/london',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
