// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://studentjobsmaastricht.nl/blog";
const OG_IMAGE_URL = "https://studentjobsmaastricht.nl/blog/maastricht-bridge.jpg";

const POSTS = [
  {
    slug: "studenten-bijbaan-maastricht",
    title: "Studenten bijbaan Maastricht (2026) – Goed betaald, Engelstalig & weekend",
    description:
      "De ultieme gids voor een studenten bijbaan in Maastricht: avond/weekend, Engelstalig, zonder ervaring. Uurloon-tabellen, contractvormen, wijken en snelle filters.",
  },
  {
    slug: "student-jobs-maastricht-complete-guide-2026",
    title: "Student Jobs in Maastricht — Complete Guide (2026)",
    description:
      "Permits, contracts, pay, neighborhoods, and tactics to land a job fast.",
  },
  {
    slug: "english-speaking-student-jobs-maastricht",
    title: "English-Speaking Student Jobs in Maastricht (2026)",
    description:
      "Where to find roles that don’t require Dutch, with quick-apply tips.",
  },
  {
    slug: "best-paying-student-jobs-maastricht-2026",
    title: "Best-Paying Student Jobs in Maastricht (2026)",
    description:
      "Shift bonuses, industries, and certifications that increase pay.",
  },
];

export const metadata: Metadata = {
  title: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
  description:
    "Maastricht student job guides for 2026: English-friendly part-time jobs, pay, contracts, permits, CV tips, and where to apply fast.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
    description:
      "Guides on Maastricht student jobs: English-speaking roles, wages, contracts, permits, and quick application tactics.",
    url: CANONICAL,
    type: "website",
    locale: "en_NL",
    siteName: "Student Jobs Maastricht",
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: "Maastricht bridge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
    description:
      "Find English-friendly student jobs in Maastricht: pay, contracts, permits, and fast apply tips.",
    images: [OG_IMAGE_URL],
  },
};

export default function BlogIndex() {
  return (
    <section className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold">Blog</h1>
          <p className="mt-3 text-slate-700">
            Maastricht student jobs: English-friendly roles, pay, contracts, permits, and quick apply tactics.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/jobs?city=Maastricht" className="rounded-full border px-3 py-1 text-sm underline">
              All jobs (Maastricht)
            </Link>
            <Link href="/jobs?city=Maastricht&english=true" className="rounded-full border px-3 py-1 text-sm underline">
              English-friendly
            </Link>
            <Link href="/jobs?city=Maastricht&weekend=true" className="rounded-full border px-3 py-1 text-sm underline">
              Weekend
            </Link>
            <Link href="/jobs?city=Maastricht&evening=true" className="rounded-full border px-3 py-1 text-sm underline">
              Evening
            </Link>
          </div>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
              aria-label={`Read: ${p.title}`}
            >
              <div className="text-lg font-semibold">{p.title}</div>
              <p className="text-gray-600 text-sm mt-2">{p.description}</p>
              <div className="mt-3 text-sm underline">Read more</div>
            </Link>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Student Jobs Maastricht — Blog",
              url: CANONICAL,
              description:
                "Maastricht student job guides for 2026: English-friendly part-time jobs, pay, contracts, permits, CV tips, and where to apply fast.",
              publisher: { "@type": "Organization", name: "Student Jobs Maastricht" },
              blogPost: POSTS.map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                description: p.description,
                url: `${CANONICAL}/${p.slug}`,
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
