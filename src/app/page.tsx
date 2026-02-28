// src/app/page.tsx (Next.js App Router) — Delft homepage (SEO-ready, rank-and-rent)
import type { Metadata } from "next";
import Link from "next/link";
import { listFeaturedJobs } from "@/data/jobs";
import Image from "next/image";
import FeaturedJobsAccordion from "@/components/FeaturedJobsAccordion";
import PromoAd from "@/components/PromoAd";


function JobCardLink({
  job,
  className,
  children,
}: {
  job: { slug: string; externalUrl?: string };
  className?: string;
  children: React.ReactNode;
}) {
  return job.externalUrl ? (
    <a
      href={job.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-gtm-event="job_card_click"
      data-gtm-label="external"
      data-gtm-prop-slug={job.slug}
    >
      {children}
    </a>
  ) : (
    <Link
      href={`/jobs/${job.slug}`}
      className={className}
      data-gtm-event="job_card_click"
      data-gtm-label="internal"
      data-gtm-prop-slug={job.slug}
    >
      {children}
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Student Jobs in Delft (2026) | Part-Time & English-Friendly Work",
  description:
    "Find student jobs in Delft: hospitality, logistics, retail, tutoring and more. English-friendly roles, flexible hours, updated daily.",
  alternates: { canonical: "https://studentjobsdelft.nl/" },
  openGraph: {
    title: "Student Jobs in Delft (2026)",
    description:
      "Part-time & English-friendly work for students in Delft. Updated daily.",
    url: "https://studentjobsdelft.nl/",
    siteName: "Student Jobs Delft",
    type: "website",
    locale: "en_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Jobs in Delft (2026)",
    description:
      "Part-time & English-friendly work for students in Delft. Updated daily.",
  },
};

export default function Page() {
  const featuredJobs = listFeaturedJobs();

  const categories = [
    { key: "hospitality", label: "Hospitality" },
    { key: "retail", label: "Retail" },
    { key: "delivery", label: "Delivery" },
    { key: "logistics", label: "Logistics" },
    { key: "tutoring", label: "Tutoring" },
    { key: "events", label: "Events" },
  ];

  const blogPosts = [
    {
      slug: "studenten-bijbaan-delft",
      title:
        "Studenten bijbaan Delft (2026) – Goed betaald, Engelstalig & weekend",
      excerpt:
        "De ultieme gids voor een studenten bijbaan in Delft: avond/weekend, Engelstalig, zonder ervaring. Uurloon-tabellen, contractvormen, wijken en snelle filters.",
    },
    {
      slug: "student-jobs-delft-complete-guide-2026",
      title: "Student Jobs in Delft — Complete Guide (2026)",
      excerpt:
        "Permits, contracts, pay, neighborhoods, and tactics to land a job fast.",
    },
    {
      slug: "english-speaking-student-jobs-delft",
      title: "English-Speaking Student Jobs in Delft (2026)",
      excerpt:
        "Where to find roles that don’t require Dutch, with quick-apply tips.",
    },
    {
      slug: "best-paying-student-jobs-delft-2026",
      title: "Best-Paying Student Jobs in Delft (2026)",
      excerpt:
        "Shift bonuses, industries, and certifications that increase pay.",
    },
  ];

  const faqs = [
    {
      q: "Can non-EU students work in Delft?",
      a: "Yes, but typically up to 16 hours/week during the academic year (or full-time in summer) with the correct permit. Always confirm the latest rules with your employer.",
    },
    {
      q: "Do I need Dutch for these jobs?",
      a: "Many roles are English-friendly (hospitality, logistics, delivery). Speaking basic Dutch broadens your options.",
    },
    {
      q: "How are listings vetted?",
      a: "We review employer details, contract type, and pay transparency before publishing. Report issues via the Contact page.",
    },
  ];

  return (
    <>
      {/* JSON-LD: WebSite + SearchAction */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Student Jobs Delft",
            url: "https://studentjobsdelft.nl/",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://studentjobsdelft.nl/jobs?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Student Jobs Delft",
            url: "https://studentjobsdelft.nl/",
            sameAs: [],
            areaServed: {
              "@type": "City",
              name: "Delft",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delft",
                addressCountry: "NL",
              },
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: featuredJobs.map((job: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              url: job.externalUrl
                ? job.externalUrl
                : `https://studentjobsdelft.nl/jobs/${job.slug}`,
              name: job.title,
            })),
          }),
        }}
      />

      {/* HERO with Featured Jobs inside */}
      <section className="relative min-h-[620px] md:min-h-[560px] lg:min-h-[600px]">
        {/* Banner image */}
        <Image
          src="/delft.jpg"
          alt="Delft buildings"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />

        {/* Headline + Featured Jobs */}
        <div className="relative z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-5xl font-semibold text-white">
                  Student Jobs in Delft (2026)
                </h1>
                <p className="mt-3 text-base md:text-xl text-white/90 max-w-2xl">
                  Part-time & English-friendly roles. Flexible hours. Updated daily.
                </p>
              </div>
              <Link
                href="/employers"
                className="hidden md:inline-block text-sm underline text-white/90 hover:text-white"
                data-gtm-event="cta_business"
                data-gtm-label="hero_top"
              >
                Are you a business? Feature your job →
              </Link>
            </div>

            <div aria-label="Actively hiring" className="mt-6 md:mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-semibold text-white">
                  Actively hiring
                </h2>
                <Link
                  href="/employers"
                  className="text-sm underline text-white/90 hover:text-white md:inline-block"
                  data-gtm-event="cta_business"
                  data-gtm-label="actively_hiring_bar"
                >
                  Feature your job →
                </Link>
              </div>

              {/* Single-open accordion (mobile = column). This must replace all previous <details> blocks */}
              <FeaturedJobsAccordion featuredJobs={featuredJobs} />
            </div>
          </div>

          {/* Keep hero image behind content */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/delft.jpg"
              alt="Delft buildings"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
          </div>
        </div>
      </section>
    <section className="px-6 py-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <PromoAd placement="landing_page_1" />
        </div>
      </section>
      {/* SEARCH — moved below hero for clarity and mobile UX */}
      <section className="px-4 sm:px-6 py-6 md:py-8 bg-white">
        <div className="mx-auto max-w-6xl">
          {/* (1) Helper text BEFORE the search bar */}
          <p className="mb-3 md:mb-4 text-sm md:text-base text-slate-700">
            Can’t find what you’re looking for?{" "}
            <span className="font-semibold">Search in our database.</span>
          </p>

          <form
            aria-label="Search jobs"
            action="/jobs"
            method="GET"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 rounded-2xl p-3 border bg-white"
          >
            <label htmlFor="q" className="sr-only">
              Search
            </label>
            <input
              id="q"
              name="q"
              autoComplete="off"
              placeholder="Search job title (e.g., barista, rider, tutor)"
              className="w-full min-w-0 border rounded-xl px-4 py-3 bg-white text-slate-900 placeholder:text-slate-400"
            />

            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w/full min-w-0 border rounded-xl px-4 py-3 bg-white text-slate-900"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>

            <label htmlFor="english" className="sr-only">
              Language
            </label>
            <select
              id="english"
              name="english"
              className="w-full min-w-0 border rounded-xl px-4 py-3 bg-white text-slate-900"
            >
              <option value="">Language: Any</option>
              <option value="true">English-friendly</option>
              <option value="false">Dutch required</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary w-full sm:col-span-2 md:col-span-1 rounded-xl px-4 py-3"
              data-gtm-event="search"
              data-gtm-label="hero_find_jobs"
              data-gtm-collect="query:#q,category:#category,language:#english"
            >
              Find jobs
            </button>
          </form>
        </div>
      </section>

      {/* CITY VALUE BLOCK */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Why Delft works for students
            </h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>• Strong demand in hospitality around the city center.</li>
              <li>• Logistics & warehousing shifts linked to port operations.</li>
              <li>• Evening & weekend work compatible with study schedules.</li>
              <li>• Many English-friendly roles; basic Dutch helps for retail.</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Quick facts</h3>
            <p className="mt-2 text-gray-700">
              Typical student roles include café/barista, event staff, warehouse
              assistant, rider/delivery, retail, and tutoring. Always review
              contract type and pay on the job page before applying.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="px-6 py-6 md:py-10 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Browse by category</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={`/categories/${c.key}`}
                className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
                data-gtm-event="browse_category"
                data-gtm-label={c.key}
              >
                <div className="text-lg font-semibold">{c.label}</div>
                <div className="text-gray-600 text-sm mt-1">
                  Recent openings • Filters for hours & language
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <PromoAd placement="landing_page_2" />
        </div>
      </section>
      {/* EMPLOYER CTA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl rounded-2xl border p-6 md:p-10 bg-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                Are you a business? Hire students in Delft
              </h2>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• City-specific audience of active student job-seekers</li>
                <li>• Homepage & category “Featured” placements</li>
                <li>• Newsletter & blog embeds available</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/employers"
                  className="rounded-xl px-5 py-3 border"
                  data-gtm-event="cta_business"
                  data-gtm-label="employer_section_learn_more"
                >
                  Learn more
                </Link>
              </div>
            </div>
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold">What you get</h3>
              <p className="mt-2 text-gray-700">
                Featured placement on the homepage, priority in relevant
                categories, and targeted candidates via our Delft-only list.
                We review every role before it goes live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="px-6 py-6 md:py-10 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Latest from the blog</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border bg-white p-5 hover:shadow-md transition"
                data-gtm-event="blog_open"
                data-gtm-label={post.slug}
              >
                <div className="text-lg font-semibold">{post.title}</div>
                <p className="text-gray-600 text-sm mt-2">{post.excerpt}</p>
                <div className="mt-3 text-sm underline">Read more</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Get weekly student jobs in your inbox (Delft)
          </h2>
          <p className="mt-2 text-gray-700">
            One email per week. No spam. Unsubscribe anytime.
          </p>
          <form
            action="/api/lead"
            method="POST"
            className="mt-6 grid gap-3 md:grid-cols-3"
          >
            <input
              name="name"
              placeholder="Your name"
              className="border rounded-xl px-4 py-3"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="border rounded-xl px-4 py-3"
              required
            />
            <input type="hidden" name="city" value="Delft" />
            <button
              className="rounded-xl px-4 py-3 border bg-black text-white"
              type="submit"
              data-gtm-event="newsletter_subscribe"
              data-gtm-label="homepage_weekly"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-6 md:py-10 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Students say</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5">
              <div className="font-semibold">M., Erasmus student</div>
              <p className="text-gray-700 mt-2 text-sm">
                Found a weekend job near Kralingen that fits my schedule.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-5">
              <div className="font-semibold">A., International student</div>
              <p className="text-gray-700 mt-2 text-sm">
                English-friendly roles made the search much easier.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-5">
              <div className="font-semibold">S., RBS student</div>
              <p className="text-gray-700 mt-2 text-sm">
                Applied Monday, started Friday—fast process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border p-5">
                <div className="font-semibold">{f.q}</div>
                <p className="text-gray-700 mt-2 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm">
            Questions about a listing?{" "}
            <Link href="/contact" className="underline" data-gtm-event="contact_open" data-gtm-label="faq_footer">
              Contact us
            </Link>
            .
          </div>
        </div>
      </section>

      {/* PARTNERS LINK */}
      <section className="px-6 py-8 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border bg-white p-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Our partners</h2>
              <p className="text-sm text-gray-700 mt-1">
                We collaborate with SEO, community, and hiring partners in Delft.
              </p>
            </div>
            <Link
              href="/partners"
              className="btn btn-primary"
              data-gtm-event="partners_link_home"
              data-gtm-label="homepage_footer"
            >
              See partners →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
