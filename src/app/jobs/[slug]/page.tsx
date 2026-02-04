// src/app/jobs/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JobApplyForm from "@/components/JobApplyForm";
import { getJobBySlug, listJobs } from "@/data/jobs";

export async function generateStaticParams() {
  return listJobs().map((j) => ({ slug: j.slug }));
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const cityPrefill =
    (job.addressLocality ? String(job.addressLocality) : "amsterdam").toLowerCase();

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-sm text-slate-600">
          <Link href="/jobs" className="hover:underline">
            Jobs
          </Link>
          <span className="mx-2">/</span>
          <span>{job.orgName}</span>
        </div>

        <div className="mt-4 card overflow-hidden">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative h-12 w-12 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0">
                {job.logoUrl ? (
                  <Image
                    src={job.logoUrl}
                    alt={job.logoAlt || `${job.orgName} logo`}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-slate-500">
                    {job.orgName?.[0] ?? "•"}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-semibold">{job.title}</h1>
                <div className="text-slate-700">{job.orgName}</div>

                <div className="mt-3 text-sm text-slate-700">
                  {job.baseSalaryMin
                    ? `€${job.baseSalaryMin}${job.baseSalaryMax ? `–€${job.baseSalaryMax}` : ""}/${job.payUnit?.toLowerCase()}`
                    : "Pay: N/A"}
                  {" • "}
                  {job.workHours ?? "Hours: N/A"}
                  {job.area ? ` • ${job.area}` : ""}
                  {" • "}
                  {job.englishFriendly ? "English-friendly" : "Dutch required"}
                </div>

                <div className="mt-2 text-sm text-slate-600">
                  City: <span className="font-mono">{cityPrefill}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: job.descriptionHtml || "" }} />
            </div>

            {job.externalUrl ? (
              <div className="mt-6">
                <a
                  href={job.externalUrl}
                  target="_blank"
                  rel="nofollow external noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-white bg-slate-900 hover:bg-slate-800"
                >
                  Open employer link
                </a>
                <p className="mt-2 text-xs text-slate-500">
                  You can also apply below if you prefer.
                </p>
              </div>
            ) : null}

          <JobApplyForm
            jobSlug={job.slug}
            jobTitle={job.title}
            orgName={job.orgName}
            city={(job.addressLocality || "amsterdam").toLowerCase()}
            redirectTo={`/thank-you?job=${encodeURIComponent(job.slug)}`}
          />
          </div>
        </div>
      </div>
    </section>
  );
}
