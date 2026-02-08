// src/app/blog/rss.xml/route.ts
import { NextResponse } from "next/server";

const site = "https://studentjobsdelft.nl";

const posts = [
  {
    slug: "english-speaking-student-jobs-delft",
    title: "English-Speaking Student Jobs in Delft (2026)",
    description:
      "Find English-friendly student jobs in Delft: best sectors, quick-apply tips, and where to look.",
    date: "2026-10-02",
  },
  {
    slug: "student-jobs-delft-complete-guide-2026",
    title: "Student Jobs in Delft — Complete Guide (2026)",
    description:
      "Permits, contracts, pay, neighborhoods, and step-by-step tactics to land a student job fast in Delft.",
    date: "2026-10-02",
  },
  {
    slug: "best-paying-student-jobs-delft-2026",
    title: "Best-Paying Student Jobs in Delft (2026)",
    description:
      "Top-paying categories, shift allowances, and certifications (BHV, VCA, HACCP, forklift) to boost your hourly rate.",
    date: "2026-10-02",
  },
];

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateIso: string) {
  const d = new Date(`${dateIso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export async function GET() {
  const items = posts
    .map((p) => {
      const url = `${site}/blog/${p.slug}`;
      return `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${toRfc822(p.date)}</pubDate>
    </item>`;
    })
    .join("");

  const channelTitle = "Student Jobs Delft Blog";
  const channelDescription =
    "Delft student job guides: English-friendly jobs, pay, contracts, visas, and where to apply.";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${site}/blog</link>
    <atom:link href="${site}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(channelDescription)}</description>
    <language>en-NL</language>
    <generator>Next.js</generator>
    <ttl>1440</ttl>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
