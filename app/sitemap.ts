import { MetadataRoute } from "next";
import { getAllSingerSlugsWithDates } from "@/lib/data/singers";
import { getAllQawwalSlugsWithDates } from "@/lib/data/qawwals";
import { getAllBlogSlugsWithDates } from "@/lib/data/blog";
import { SITE_URL } from "@/lib/constants/site";

// Revalidate sitemap every hour to ensure new pages are included
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;

  // Fetch all dynamic route slugs with dates in parallel
  const [singerSlugsWithDates, qawwalSlugsWithDates, blogSlugsWithDates] = await Promise.all([
    getAllSingerSlugsWithDates(),
    getAllQawwalSlugsWithDates(),
    getAllBlogSlugsWithDates(),
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
  const singerPages: MetadataRoute.Sitemap = singerSlugsWithDates.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/singers/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic qawwal pages
  const qawwalPages: MetadataRoute.Sitemap = qawwalSlugsWithDates.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/qawwals/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugsWithDates.map(({ slug, updatedAt }) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...singerPages, ...qawwalPages, ...blogPages];
}
