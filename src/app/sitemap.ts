// src/app/sitemap.ts
import { listJobs } from "@/data/jobs";

export default function sitemap() {
  const base = "https://studentjobsdelft.nl";
  const now = new Date();

  const staticUrls = [
    { url: `${base}/`, changefreq: "daily", priority: 1.0, lastModified: now },
    { url: `${base}/jobs`, changefreq: "daily", priority: 0.8, lastModified: now },
    { url: `${base}/categories`, changefreq: "weekly", priority: 0.6, lastModified: now },
    { url: `${base}/blog`, changefreq: "weekly", priority: 0.6, lastModified: now },
    { url: `${base}/employers`, changefreq: "monthly", priority: 0.6, lastModified: now },
  ];

  const categories = [
    "hospitality",
    "retail",
    "delivery",
    "logistics",
    "tutoring",
    "events",
    "sales",
    "fieldwork",
  ].map((c) => ({
    url: `${base}/categories/${c}`,
    changefreq: "weekly",
    priority: 0.5,
    lastModified: now,
  }));

  const jobs = listJobs().map((j) => ({
    url: `${base}/jobs/${j.slug}`,
    changefreq: "daily",
    priority: j.featured ? 0.8 : 0.6,
    // Use job datePosted as lastmod (falls back to now if invalid)
    lastModified: new Date(j.datePosted || now),
  }));

  const blog = [
    "english-speaking-student-jobs-Delft",
    "student-jobs-Delft-complete-guide-2026",
    "best-paying-student-jobs-Delft-2026",
  ].map((slug) => ({
    url: `${base}/blog/${slug}`,
    changefreq: "monthly",
    priority: 0.6,
    lastModified: now,
  }));

  return [...staticUrls, ...categories, ...jobs, ...blog];
}