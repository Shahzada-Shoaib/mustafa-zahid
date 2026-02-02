import { MetadataRoute } from "next";
import { getAllSingerSlugs } from "@/lib/data/singers";
import { getAllQawwalSlugs } from "@/lib/data/qawwals";
import { getAllBlogSlugs } from "@/lib/data/blog";
import { SITE_URL } from "@/lib/constants/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Fetch all dynamic route slugs in parallel
  const [singerSlugs, qawwalSlugs, blogSlugs] = await Promise.all([
    getAllSingerSlugs(),
    getAllQawwalSlugs(),
    getAllBlogSlugs(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    // Home page
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // About page
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Music Classes Pages
    {
      url: `${baseUrl}/music-classes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/music-classes/guitar-classes-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music-classes/singing-classes-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music-classes/piano-classes-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music-classes/guitar-classes-at-home-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music-classes/singing-classes-at-home-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/music-classes/piano-classes-at-home-in-lahore`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Singers listing page
    {
      url: `${baseUrl}/singers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Qawwals listing page
    {
      url: `${baseUrl}/qawwals`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Blog listing page
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic singer pages
  const singerPages: MetadataRoute.Sitemap = singerSlugs.map((slug) => ({
    url: `${baseUrl}/singers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic qawwal pages
  const qawwalPages: MetadataRoute.Sitemap = qawwalSlugs.map((slug) => ({
    url: `${baseUrl}/qawwals/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...singerPages, ...qawwalPages, ...blogPages];
}
