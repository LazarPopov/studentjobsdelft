// src/app/categories/[category]/page.tsx — add category route to fix 404
import Image from "next/image";
import Link from "next/link";
import { listJobs, type JobRecord } from "@/data/jobs";

type Category = JobRecord["categories"][number];

const CATEGORY_LABELS: Record<string, string> = {
  delivery: "Delivery",
  logistics: "Logistics",
  hospitality: "Hospitality",
  retail: "Retail",
  tutoring: "Tutoring",
  events: "Events",
  sales: "Sales",
  fieldwork: "Fieldwork",
};

export async function generateMetadata({ params }: { params: { category: string } }) {
  const key = params.category;
  const label = CATEGORY_LABELS[key] ?? key;
  return {
    title: `${label} Jobs in Delft | Student Jobs Delft`,
    description: `Browse ${label.toLowerCase()} jobs in Delft.`,
    alternates: { canonical: `https://studentjobsdelft.nl/categories/${key}` },
  };
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((key) => ({ category: key }));
}

// NEW: ItemList JSON-LD so Google understands this is a jobs list page
function JobsItemListJsonLd({ items }: { items: { slug: string; title: string }[] }) {
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

function RowLink({
  job,
  className,
  children,
}: {
  job: { slug: string; externalUrl?: string };
  className?: string;
  children: React.ReactNode;
}) {
  return job.externalUrl ? (
    <a href={job.externalUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={`/jobs/${job.slug}`} className={className}>
      {children}
    </Link>
  );
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const key = params.category as Category | string;
  const label = CATEGORY_LABELS[key] ?? key;
  const jobs = listJobs().filter((j) => (j.categories as string[]).includes(String(key)));

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        {/* NEW: JSON-LD for this category listing page (does not affect UI) */}
        <JobsItemListJsonLd items={jobs.map((j) => ({ slug: j.slug, title: j.title }))} />

        <nav className="text-sm text-slate-600">
          <Link className="underline" href="/">
            Home
          </Link>{" "}
          / <span>Categories</span> / <span>{label}</span>
        </nav>

        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">{label} Jobs in Delft</h1>

        {jobs.length === 0 ? (
          <p className="mt-6 text-slate-700">No jobs in this category yet. Check back soon.</p>
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
                    {j.shortDescrition && (
                      <p className="mt-2 text-sm text-slate-700">{j.shortDescrition}</p>
                    )}
                    <div className="mt-2 text-sm text-slate-700">
                      {j.workHours ?? "Hours: N/A"}
                      {j.area ? ` • ${j.area}` : ""}
                      {" • "}
                      {j.englishFriendly ? "English-friendly" : "Dutch required"}
                    </div>
                  </div>
                </div>
              </RowLink>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
