// src/app/blog/best-paying-student-jobs-delft-2026/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://studentjobsdelft.nl";
const SLUG = "best-paying-student-jobs-delft-2026";
const CANONICAL = `${BASE_URL}/blog/${SLUG}`;

const PUBLISH_DATE = "2026-01-02";
const MODIFIED_DATE = "2026-02-07";

// Use the real local image in /public/blog/
const HERO_IMAGE_PATH = "/blog/delft-bridge.jpg";
const OG_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Best Paying Student Jobs in Delft (2026) | Student Jobs Delft",
  description:
    "Discover the best paying student jobs in Delft in 2026. Compare high paying categories, shift bonuses, and quick certifications like BHV, HACCP, VCA, forklift, and barista.",
  keywords: [
    "best paying student jobs Delft",
    "highest paying student jobs Delft",
    "high paying student jobs Delft",
    "student wage Delft",
    "student jobs Delft pay",
    "English speaking student jobs Delft",
    "evening weekend allowance Netherlands",
    "BHV certificate",
    "HACCP certificate",
    "VCA certificate",
    "forklift certificate Netherlands",
    "barista course Delft",
  ],
  alternates: { canonical: CANONICAL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Best Paying Student Jobs in Delft (2026)",
    description:
      "High paying categories, shift bonuses, and short certifications that can increase your hourly rate in Delft.",
    url: CANONICAL,
    type: "article",
    locale: "en_NL",
    siteName: "Student Jobs Delft",
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Delft bridge and canals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Paying Student Jobs in Delft (2026)",
    description:
      "Which student jobs pay the most in Delft. Categories, allowances, and certifications that raise your hourly rate.",
    images: [OG_IMAGE_URL],
  },
};

export default function BestPayingGuideDelft() {
  const updatedLabel = new Date(MODIFIED_DATE).toLocaleDateString("en-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="section">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Best Paying Student Jobs in Delft (2026)
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            By <span className="font-medium">Student Jobs Delft</span> • Updated {updatedLabel}
          </p>

          <figure className="mt-5 overflow-hidden rounded-2xl border bg-white">
            <Image
              src={HERO_IMAGE_PATH}
              alt="Delft bridge and canals"
              width={1280}
              height={720}
              priority
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-slate-600">
              Photo credit:{" "}
              <a
                href="https://www.delftprivateboat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                delftprivateboat.com
              </a>
            </figcaption>
          </figure>

          {/* Quick links to convert */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/jobs?city=Delft" className="rounded-full border px-3 py-1 text-sm underline">
              All vacancies (Delft)
            </Link>
            <Link href="/jobs?city=Delft&english=true" className="rounded-full border px-3 py-1 text-sm underline">
              English friendly
            </Link>
            <Link href="/jobs?city=Delft&evening=true" className="rounded-full border px-3 py-1 text-sm underline">
              Evening shifts
            </Link>
            <Link href="/jobs?city=Delft&weekend=true" className="rounded-full border px-3 py-1 text-sm underline">
              Weekend shifts
            </Link>
          </div>
        </header>

        {/* CONTENT + TOC */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* TOC */}
          <nav
            aria-label="Table of contents"
            className="
              order-1 lg:order-2
              lg:sticky lg:top-24 h-max
              rounded-2xl border p-4 bg-slate-50
              text-sm text-slate-700
            "
          >
            <div className="font-semibold">On this page</div>
            <ul className="mt-2 space-y-1">
              <li>
                <a href="#top-categories" className="underline">
                  Top paying categories
                </a>
              </li>
              <li>
                <a href="#shift-bonuses" className="underline">
                  Shift bonuses and allowances
                </a>
              </li>
              <li>
                <a href="#certifications" className="underline">
                  Certifications that increase pay
                </a>
              </li>
              <li>
                <a href="#quick-wins" className="underline">
                  Quick wins
                </a>
              </li>
              <li>
                <a href="#example-paths" className="underline">
                  Example upgrade paths
                </a>
              </li>
              <li>
                <a href="#apply-now" className="underline">
                  Apply now
                </a>
              </li>
              <li>
                <a href="#faq" className="underline">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          {/* ARTICLE */}
          <article
            className="
              order-2 lg:order-1
              max-w-3xl
              space-y-6
              leading-relaxed text-slate-800
              [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold
              [&_h3]:mt-6  [&_h3]:text-xl  [&_h3]:font-semibold
              [&_p]:mt-3   [&_ul]:mt-3   [&_ol]:mt-3
              [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:list-decimal [&_ol]:pl-6
              [&_a]:underline [&_a]:text-brand-700 hover:[&_a]:text-brand-600
            "
          >
            <p>
              If you want a higher hourly rate in Delft, focus on two levers: role type (category) and premium
              shifts. Then add one short certification that unlocks better duties. This guide shows the most common
              paths students use in 2026 to earn more.
            </p>

            <h2 id="top-categories">Top paying categories for students in Delft</h2>
            <p>
              Pay depends on age, contract type, and experience. These categories often land on the higher end for
              student jobs in Delft:
            </p>
            <ul>
              <li>
                <strong>Tutoring and teaching assistant roles</strong>: high pay because you bring a specific skill. See{" "}
                <Link href="/categories/tutoring">tutoring jobs</Link>.
              </li>
              <li>
                <strong>Logistics and warehouse shifts</strong>: evenings and weekends often include allowances. See{" "}
                <Link href="/categories/logistics">logistics</Link> and{" "}
                <Link href="/categories/delivery">delivery</Link>.
              </li>
              <li>
                <strong>Events team lead</strong>: team lead or supervisor shifts tend to pay more than entry crew. Browse{" "}
                <Link href="/categories/events">events</Link>.
              </li>
              <li>
                <strong>Sales with commission</strong>: base pay plus bonuses if you perform. Check{" "}
                <Link href="/categories/sales">sales</Link>.
              </li>
              <li>
                <strong>Skilled hospitality</strong>: barista, closing shifts, and keyholder roles often pay more than runner roles. Explore{" "}
                <Link href="/categories/hospitality">hospitality</Link>.
              </li>
            </ul>

            <h2 id="shift-bonuses">Shift bonuses and allowances that boost pay</h2>
            <p>In Delft, schedule choice can move your effective hourly rate more than people expect:</p>
            <ul>
              <li>
                <strong>Evening, night, and weekend allowances</strong>: common in logistics, events, hospitality, and some delivery roles.
              </li>
              <li>
                <strong>Holiday pay</strong> (often 8 percent): sometimes paid monthly, sometimes yearly.
              </li>
              <li>
                <strong>Travel reimbursements</strong>: relevant if you commute to Westpoort, Sloterdijk, or larger venues.
              </li>
            </ul>

            <h2 id="certifications">Certifications that increase pay</h2>
            <p>Short, practical certificates can unlock better paid duties and shifts:</p>
            <ul>
              <li>
                <strong>BHV</strong>: emergency response, useful in events and hospitality.
              </li>
              <li>
                <strong>HACCP</strong>: food safety, useful for kitchen, café, and catering roles.
              </li>
              <li>
                <strong>VCA</strong>: safety certificate for build up, fieldwork, and some logistics roles.
              </li>
              <li>
                <strong>Forklift</strong> (heftruck): unlocks warehouse roles that often pay better.
              </li>
              <li>
                <strong>Barista training</strong>: a fast upgrade path in hospitality.
              </li>
            </ul>

            <p className="text-sm text-slate-600">
              Tip: ask if the employer reimburses certifications after a probation period.
            </p>

            <h2 id="quick-wins">Quick wins to raise your hourly rate</h2>
            <ul>
              <li>
                <strong>Target premium shifts</strong> in logistics, events, and hospitality.
              </li>
              <li>
                <strong>Pitch availability clearly</strong>: reliable availability often leads to better shifts.
              </li>
              <li>
                <strong>State travel radius</strong>: for example Centrum, De Pijp, Oud West, Zuidas, Noord, Sloterdijk.
              </li>
              <li>
                <strong>Upgrade one skill fast</strong>: BHV, VCA, forklift, or barista, then ask for higher responsibility duties.
              </li>
              <li>
                <strong>Add English and basic Dutch</strong> (A2) on your CV to unlock more roles.
              </li>
            </ul>

            <h2 id="example-paths">Example upgrade paths</h2>
            <ol>
              <li>
                <strong>Hospitality runner to barista to shift lead</strong>: take a short barista course, then ask for closing or machine shifts.
              </li>
              <li>
                <strong>Warehouse picker to forklift certified</strong>: do a forklift course and move to better paid stations.
              </li>
              <li>
                <strong>Event crew to team lead</strong>: get BHV and volunteer to brief teams.
              </li>
              <li>
                <strong>Strong grades to tutor</strong>: specialize in math, programming, or languages for higher rates.
              </li>
            </ol>

            <h2 id="apply-now">Apply now</h2>
            <div className="rounded-2xl border p-5 bg-white">
              <div className="font-semibold text-lg">Ready to earn more?</div>
              <p className="mt-1">
                Start here: <Link href="/jobs?city=Delft">see all jobs in Delft</Link>,{" "}
                <Link href="/jobs?city=Delft&english=true">English friendly only</Link>, and browse{" "}
                <Link href="/categories">categories</Link>. If you are an employer,{" "}
                <Link href="/employers">feature your job</Link>.
              </p>
            </div>

            <h2 id="faq">FAQ</h2>

            <h3>Which student jobs pay the most in Delft?</h3>
            <p>
              Often tutoring, logistics shifts with allowances, event lead roles, and sales with commission. Skilled hospitality roles like barista or shift lead can also pay above entry level.
            </p>

            <h3>How can I quickly increase my hourly rate?</h3>
            <p>
              Choose premium shifts, get one short certificate such as BHV, VCA, forklift, or barista training, then ask for duties with responsibility such as team lead or machine operator.
            </p>

            <h3>Do certifications really matter?</h3>
            <p>
              Yes. They signal safety and reliability, and that often unlocks better tasks and higher paid shifts.
            </p>
          </article>
        </div>

        {/* JSON-LD: Article + Breadcrumb + FAQ + HowTo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best Paying Student Jobs in Delft (2026)",
              description:
                "High paying categories, shift bonuses, and certifications that can increase your hourly rate as a student in Delft.",
              image: [OG_IMAGE_URL],
              datePublished: PUBLISH_DATE,
              dateModified: MODIFIED_DATE,
              inLanguage: "en-NL",
              author: {
                "@type": "Organization",
                name: "Student Jobs Delft",
                url: `${BASE_URL}/`,
              },
              publisher: {
                "@type": "Organization",
                name: "Student Jobs Delft",
                url: `${BASE_URL}/`,
              },
              mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
              about: [{ "@type": "Place", name: "Delft" }],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blog", item: `${BASE_URL}/blog` },
                { "@type": "ListItem", position: 2, name: "Best Paying Student Jobs in Delft (2026)", item: CANONICAL },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": `${CANONICAL}#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Which student jobs pay the most in Delft?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Often tutoring, logistics shifts with allowances, event lead roles, and sales with commission. Skilled hospitality roles like barista or shift lead can also pay above entry level.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I quickly increase my hourly rate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Choose premium shifts, get one short certificate such as BHV, VCA, forklift, or barista training, then ask for higher responsibility duties like team lead or machine operator.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do certifications really matter?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes. Certifications signal safety and reliability and often unlock better tasks and higher paid shifts.",
                  },
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to boost your student wage in Delft in 2 weeks",
              image: [OG_IMAGE_URL],
              totalTime: "P14D",
              inLanguage: "en-NL",
              supply: [
                { "@type": "HowToSupply", name: "One page CV (PDF)" },
                { "@type": "HowToSupply", name: "One short course (BHV, VCA, forklift, or barista)" },
                { "@type": "HowToSupply", name: "Availability plan (evenings and weekends)" },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  name: "Pick a higher paying category",
                  text:
                    "Choose tutoring, logistics shifts with allowances, events lead roles, or sales with commission based on your strengths.",
                },
                {
                  "@type": "HowToStep",
                  name: "Get a quick certification",
                  text:
                    "Complete BHV, VCA, forklift, or barista training to unlock better duties and higher paid shifts.",
                },
                {
                  "@type": "HowToStep",
                  name: "Apply with targeted availability",
                  text:
                    "Apply early, state your premium shift availability clearly, and follow up the same day.",
                },
              ],
            }),
          }}
        />
      </div>
    </section>
  );
}
