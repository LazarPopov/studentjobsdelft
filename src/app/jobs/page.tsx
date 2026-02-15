// src/app/jobs/page.tsx
import Image from "next/image";
import Link from "next/link";
import { listJobs, listFeaturedJobs } from "@/data/jobs";

export const metadata = {
 title: "Jobs in Delft | Student Jobs Delft",
 description: "All current student jobs in Delft.",
 alternates: { canonical: "https://studentjobsdelft.nl/jobs" },
};

type Search = { q?: string | string[]; category?: string | string[]; english?: string | string[] };

function RowLink({
 job,
 className,
 children,
}: {
 job: { slug: string };
 className?: string;
 children: React.ReactNode;
}) {
 return (
 <Link href={`/jobs/${job.slug}`} className={className}>
  {children}
 </Link>
 );
}

function stripHtml(html: string) {
 return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// NEW: ItemList JSON-LD so Google understands this is a jobs list
function JobsItemListJsonLd({
 items,
}: {
 items: { slug: string; title: string }[];
}) {
 const baseUrl = "https://studentjobsdelft.nl";
 const elementList = items.map((j, i) => ({
 "@type": "ListItem",
 position: i + 1,
 name: j.title,
 url: `${baseUrl}/jobs/${j.slug}`,
 }));

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "ItemList",
 itemListElement: elementList,
 };

 return (
 <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 );
}

export default function JobsIndex({ searchParams }: { searchParams: Search }) {
 const q = String(searchParams.q ?? "").trim().toLowerCase();
 const category = String(searchParams.category ?? "").trim().toLowerCase();
 const english = String(searchParams.english ?? "").trim().toLowerCase();

 const all = listJobs();
 const jobs = all.filter((j) => {
 if (category && !(j.categories as string[]).map((c) => c.toLowerCase()).includes(category))
  return false;
 if (english === "true" && !j.englishFriendly) return false;
 if (english === "false" && j.englishFriendly) return false;
 if (q) {
  const hay = `${j.title} ${j.orgName} ${stripHtml(j.descriptionHtml)}`.toLowerCase();
  if (!hay.includes(q)) return false;
 }
 return true;
 });

 const featured = listFeaturedJobs();

 const hasFilters = Boolean(q || category || (english && english !== ""));

 return (
 <section className="px-6 py-10">
  <div className="mx-auto max-w-5xl">
  {/* NEW: JSON-LD for this listing page (does not affect UI) */}
  <JobsItemListJsonLd items={jobs.map((j) => ({ slug: j.slug, title: j.title }))} />

  {/* Top bar with Return and (optional) Clear filters */}
  <div className="flex items-center justify-between">
   <h1 className="text-3xl md:text-4xl font-semibold">All Jobs in Delft</h1>
   <div className="flex gap-2">
   <Link href="/" className="btn btn-ghost">
    ← Return
   </Link>
   {hasFilters && (
    <Link href="/jobs" className="btn btn-ghost">
    Clear filters
    </Link>
   )}
   </div>
  </div>

  {/* Results */}
  {jobs.length === 0 ? (
   <div className="mt-6">
   <p className="text-slate-700">No jobs match your filters. Try changing the search or category.</p>
   <div className="mt-4 flex gap-2">
    <Link href="/jobs" className="btn btn-primary">
    Browse all jobs
    </Link>
    <Link href="/" className="btn btn-ghost">
    ← Return
    </Link>
   </div>
   </div>
  ) : (
   <div className="mt-6 grid gap-4 md:grid-cols-2">
   {jobs.map((j) => (
    <RowLink key={j.slug} job={j} className="card hover:shadow-md transition">
    <div className="flex items-start gap-3">
     <div className="relative h-10 w-10 rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
     {j.logoUrl ? (
      <Image
      src={j.logoUrl}
      alt={j.logoAlt || `${j.orgName} logo`}
      fill
      sizes="40px"
      className="object-contain"
      />
     ) : (
      <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
      {j.orgName?.[0] ?? "•"}
      </div>
     )}
     </div>
     <div>
     <div className="text-lg font-semibold">{j.title}</div>
     <div className="text-slate-700">{j.orgName}</div>
     {j.shortDescrition && <p className="mt-2 text-sm text-slate-700">{j.shortDescrition}</p>}
     <div className="mt-2 text-sm text-slate-700">
      {j.baseSalaryMin
      ? `€${j.baseSalaryMin}${j.baseSalaryMax ? `-€${j.baseSalaryMax}` : ""}/${j.payUnit?.toLowerCase()}`
      : "Pay: N/A"}
      {" • "}
      {j.workHours ?? "Hours: N/A"}
      {j.area ? ` • ${j.area}` : ""}
      {" • "}
      {j.englishFriendly ? "English-friendly" : "Dutch required"}
      {j.DUO ? "DUO" : "No Duo"}
     </div>
     </div>
    </div>
    </RowLink>
   ))}
   </div>
  )}

  {/* Always show Featured at the bottom */}
  {featured.length > 0 && (
   <div className="mt-12">
   <div className="flex items-center justify-between">
    <h2 className="text-2xl md:text-3xl font-semibold">Featured jobs</h2>
    <Link href="/employers" className="text-sm underline">
    Are you a business? Feature your job →
    </Link>
   </div>

   <div className="mt-6 grid gap-4 md:grid-cols-3">
    {featured.map((job) => (
    <RowLink key={job.slug} job={job} className="card hover:shadow-md transition">
     <div className="flex items-start justify-between">
     <div className="flex items-center gap-3">
      <div className="relative h-10 w-10 rounded-lg bg-white border border-slate-200 overflow-hidden">
      {job.logoUrl ? (
       <Image
       src={job.logoUrl}
       alt={job.logoAlt || `${job.orgName} logo`}
       fill
       sizes="40px"
       className="object-contain"
       />
      ) : (
       <div className="h-full w-full flex items-center justify-center text-xs text-slate-500">
       {job.orgName?.[0] ?? "•"}
       </div>
      )}
      </div>
      <div>
      <div className="text-lg font-semibold">{job.title}</div>
      <div className="text-slate-600">{job.orgName}</div>
      </div>
     </div>
     <div className="text-xs font-medium text-brand-700">Featured</div>
     </div>

     {job.shortDescrition && <p className="mt-3 text-sm text-slate-700">{job.shortDescrition}</p>}

     <div className="mt-3 text-sm text-slate-700">
     {job.area && <span className="mr-3">{job.area}</span>}
     {job.englishFriendly && <span className="badge">English-friendly</span>}
     </div>
    </RowLink>
    ))}
   </div>
   </div>
  )}
  </div>
 </section>
 );
}
