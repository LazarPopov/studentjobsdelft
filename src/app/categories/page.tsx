// src/app/categories/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { listJobs, listFeaturedJobs } from "@/data/jobs";

export const metadata: Metadata = {
 title: "Browse Job Categories in Delft | Student Jobs Rotterdam",
 description:
 "Find student jobs in Rotterdam by category: hospitality, delivery, logistics, retail, tutoring, events, sales, and fieldwork. Mobile-friendly and SEO-optimized.",
 alternates: { canonical: "https://studentjobsDelft.nl/categories/${slug}" },
 openGraph: {
 title: "Browse Job Categories in Rotterdam",
 description:
  "Explore student jobs in Rotterdam by category and discover English-friendly roles.",
 url: "https://studentjobsDelft.nl/categories",
 siteName: "Student Jobs Rotterdam",
 type: "website",
 locale: "en_NL",
 },
 twitter: {
 card: "summary_large_image",
 title: "Browse Job Categories in Rotterdam",
 description:
  "Explore student jobs in Rotterdam by category and discover English-friendly roles.",
 },
 robots: { index: true, follow: true },
};

const CATEGORIES: { key: "hospitality" | "retail" | "delivery" | "logistics" | "tutoring" | "events" | "sales" | "fieldwork"; label: string; blurb: string }[] = [
 { key: "hospitality", label: "Hospitality", blurb: "Cafés, bars, restaurants, campus catering." },
 { key: "retail", label: "Retail", blurb: "Supermarkets, stores, shop assistants." },
 { key: "delivery", label: "Delivery", blurb: "Riders, drivers, meal/e-commerce delivery." },
 { key: "logistics", label: "Logistics", blurb: "Warehouse, sorting, port-adjacent shifts." },
 { key: "tutoring", label: "Tutoring", blurb: "Private tutoring, university assistant roles." },
 { key: "events", label: "Events", blurb: "Festivals, event staff, crew & lead roles." },
 { key: "sales", label: "Sales", blurb: "Call/chat support, retail add-ons, D2D." },
 { key: "fieldwork", label: "Fieldwork", blurb: "On-site surveys, viewings, outdoor gigs." },
];

export default function CategoriesIndexPage() {
 const jobs = listJobs();
 const counts = Object.fromEntries(
 CATEGORIES.map((c) => [
  c.key,
  jobs.filter((j) => (j.categories as unknown as string[]).includes(c.key)).length,
 ])
 );
 const featured = listFeaturedJobs();

 return (
 <section className="px-4 sm:px-6 py-8 sm:py-10 bg-gray-50 min-h-svh">
  <div className="mx-auto max-w-6xl">
  {/* Hero */}
  <header className="mb-6 sm:mb-8">
   <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Browse job categories</h1>
   <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl">
   Explore student jobs in Rotterdam by category. Filter for English-friendly roles on the results page.
   </p>
   <div className="mt-4 flex flex-wrap gap-2">
   <Link href="/jobs" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-white">
    See all jobs
   </Link>
   <Link href="/jobs?english=true" className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-white">
    English-friendly only
   </Link>
   </div>
  </header>

  {/* Categories grid */}
  <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
   {CATEGORIES.map((c) => (
   <Link
    key={c.key}
    href={`/categories/${c.key}`}
    className="rounded-2xl border bg-white p-5 hover:shadow-md transition flex flex-col"
   >
    <div className="flex items-baseline justify-between gap-3">
    <div className="text-lg sm:text-xl font-semibold">{c.label}</div>
    <span className="text-xs sm:text-sm rounded-full border px-2 py-0.5 text-slate-700">
     {counts[c.key] ?? 0} jobs
    </span>
    </div>
    <p className="mt-2 text-sm text-slate-700">{c.blurb}</p>
    <div className="mt-4 text-sm underline">Browse {c.label.toLowerCase()}</div>
   </Link>
   ))}
  </div>

  {/* Structured data: ItemList of categories */}
  <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{
   __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: CATEGORIES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    url: `https://studentjobsDelft.nl/categories/${c.key}`,
    })),
   }),
   }}
  />

  {/* Featured jobs (always visible at bottom) */}
  <section className="mt-10 sm:mt-12">
   <div className="flex items-end justify-between">
   <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Featured jobs</h2>
   <Link href="/employers" className="text-xs sm:text-sm underline">
    Are you a business? Feature your job →
   </Link>
   </div>

   {featured.length === 0 ? (
   <div className="mt-4 text-sm text-slate-600">
    No featured jobs at the moment.{" "}
    <Link href="/jobs" className="underline">See all jobs</Link>.
   </div>
   ) : (
   <div className="mt-6 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {featured.map((job) => (
    <Link
     key={job.slug}
     href={`/jobs/${job.slug}`}
     className="rounded-2xl border bg-white p-5 hover:shadow-md transition block"
    >
     <div className="text-sm font-medium text-emerald-700">Featured</div>
     <div className="mt-2 text-base sm:text-lg font-semibold">{job.title}</div>
     <div className="text-slate-700 text-sm">{job.orgName}</div>
     <div className="mt-2 text-xs sm:text-sm text-slate-700 flex flex-wrap gap-x-3 gap-y-1">
     {job.baseSalaryMin
      ? `€${job.baseSalaryMin}${job.baseSalaryMax ? `-€${job.baseSalaryMax}` : ""}/${job.payUnit?.toLowerCase()}`
      : "Pay: N/A"}
     {job.workHours ? `• ${job.workHours}` : ""}
     {job.area ? `• ${job.area}` : ""}
     {job.englishFriendly && (
      <span className="rounded-full border px-2 py-0.5 text-xs">English-friendly</span>
     )}
     </div>
    </Link>
    ))}
   </div>
   )}
  </section>
  </div>
 </section>
 );
}
