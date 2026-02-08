// src/app/guides/student-jobs-delft-complete-guide-2026/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://studentjobsdelft.nl";

const PUBLISH_DATE = "2026-10-02";
const MODIFIED_DATE = "2026-02-07";

const CANONICAL = `${BASE_URL}/blog/student-jobs-delft-complete-guide-2026`;

// Use the local image you mentioned (in /public/blog/)
const HERO_IMAGE_PATH = "/blog/delft-bridge.jpg";
const OG_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title:
    "Student Jobs in Delft (2026) | Complete Guide: English Friendly, Pay, Contracts, Visas",
  description:
    "Complete guide to student jobs in Delft for 2026. English friendly roles, pay ranges, contracts, permits, neighborhoods, CV templates, and where to apply fast.",
  keywords: [
    "student jobs Delft",
    "student jobs in Delft",
    "English speaking student jobs Delft",
    "part time jobs Delft students",
    "student visa work Netherlands",
    "Delft student wage",
    "work permit student Netherlands",
    "weekend jobs Delft students",
    "evening jobs Delft students",
    "tutoring jobs Delft",
    "hospitality jobs Delft students",
    "warehouse jobs Delft students",
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
    title: "Student Jobs in Delft (2026): Complete Guide",
    description:
      "Permits, contracts, pay ranges, neighborhoods, and step by step tactics to land a student job in Delft fast.",
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
    title: "Student Jobs in Delft (2026): Complete Guide",
    description:
      "English friendly roles, pay ranges, contracts, permits, and where to apply fast in Delft.",
    images: [OG_IMAGE_URL],
  },
};

export default function GuideComplete() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <header className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Student Jobs in Delft: complete guide (2026)
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            By <span className="font-medium">Student Jobs Delft</span> • Updated{" "}
            {new Date(MODIFIED_DATE).toLocaleDateString("en-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
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

          {/* Quick CTAs */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/jobs?city=Delft" className="rounded-full border px-3 py-1 text-sm underline">
              All Delft jobs
            </Link>
            <Link href="/jobs?city=Delft&english=true" className="rounded-full border px-3 py-1 text-sm underline">
              English friendly
            </Link>
            <Link href="/jobs?city=Delft&weekend=true" className="rounded-full border px-3 py-1 text-sm underline">
              Weekend shifts
            </Link>
            <Link href="/jobs?city=Delft&evening=true" className="rounded-full border px-3 py-1 text-sm underline">
              Evening shifts
            </Link>
            <Link href="/part-time-jobs-delft-students" className="rounded-full border px-3 py-1 text-sm underline">
              Part time jobs page
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
              <li><a href="#quickstart" className="underline">Quick start checklist</a></li>
              <li><a href="#permits" className="underline">Work permits and hours</a></li>
              <li><a href="#contracts-pay" className="underline">Contracts, pay, allowances</a></li>
              <li><a href="#neighborhoods" className="underline">Neighborhoods and commute tips</a></li>
              <li><a href="#categories" className="underline">Best student job categories</a></li>
              <li><a href="#where-to-look" className="underline">Where to find jobs fast</a></li>
              <li><a href="#cv-templates" className="underline">CV and message templates</a></li>
              <li><a href="#schedule" className="underline">Schedule that fits classes</a></li>
              <li><a href="#tax-bsn" className="underline">BSN, bank, taxes, payslips</a></li>
              <li><a href="#faq" className="underline">FAQ</a></li>
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
              [&_a]:underline hover:[&_a]:no-underline
            "
          >
            <p>
              This guide is built for one goal: help you get a student job in Delft fast, legally, and with a schedule
              that still lets you pass your classes. Use the quick start checklist, then apply using the filters.
            </p>

            <h2 id="quickstart">Quick start checklist</h2>
            <ul>
              <li>
                Make a <strong>one page CV</strong> (English or Dutch) with a clear availability block.
              </li>
              <li>
                Pick <strong>2 to 3 categories</strong> and focus:{" "}
                <Link href="/categories/hospitality">hospitality</Link>,{" "}
                <Link href="/categories/delivery">delivery</Link>,{" "}
                <Link href="/categories/fieldwork">warehouse and fieldwork</Link>,{" "}
                <Link href="/categories/tutoring">tutoring</Link>,{" "}
                <Link href="/categories/sales">sales</Link>,{" "}
                <Link href="/categories/support">support</Link>.
              </li>
              <li>
                Apply <strong>before 10:00</strong> and <strong>follow up the same day</strong>.
              </li>
              <li>
                Prepare <strong>ID, BSN or appointment proof, IBAN</strong>. Keep residence documents ready if relevant.
              </li>
              <li>
                Save time: <Link href="/jobs?city=Delft">browse Delft jobs</Link> or{" "}
                <Link href="/jobs?city=Delft&english=true">English friendly only</Link>.
              </li>
            </ul>

            <h2 id="permits">Work permits and hours</h2>
            <p>
              Rules depend on nationality and enrollment. Confirm your exact situation with your employer or official sources.
            </p>
            <ul>
              <li><strong>EU or EEA</strong>: typically free to work under standard Dutch employment rules.</li>
              <li>
                <strong>Non EU</strong>: many students have limits during the academic year and may need a permit via the employer.
                Always verify before you accept hours.
              </li>
            </ul>

            <h2 id="contracts-pay">Contracts, pay, allowances</h2>
            <ul>
              <li><strong>Contract types</strong>: part time, on call, min max, temporary, agency. Ask about guaranteed hours.</li>
              <li><strong>Typical pay</strong>: many student roles land around <strong>€13 to €17 per hour</strong>.</li>
              <li>
                <strong>Allowances</strong>: evening, night, weekend, holidays, plus holiday pay (often 8 percent).
              </li>
              <li><strong>Payslip</strong>: check gross vs net, hours, allowances, and holiday pay.</li>
            </ul>

            <h2 id="neighborhoods">Neighborhoods and commute tips</h2>
            <p>
              Delft is big and travel time kills your energy. Prioritize roles within a realistic commute.
            </p>
            <ul>
              <li><strong>Centrum</strong>: hospitality, retail, tourist traffic, events venues.</li>
              <li><strong>De Pijp and Oud Zuid</strong>: cafés, restaurants, boutique retail, barista and shift roles.</li>
              <li><strong>Oud West and Westerpark</strong>: busy hospitality, evening shifts, weekend demand.</li>
              <li><strong>Noord</strong>: events, hospitality, flexible schedules, good access from central ferries.</li>
              <li><strong>Zuidas</strong>: catering and office services, weekday shifts.</li>
              <li><strong>Sloterdijk and Westpoort</strong>: logistics and warehouses, often with evening or night premiums.</li>
            </ul>

            <h2 id="categories">Best student job categories in Delft</h2>
            <ul>
              <li>
                <strong>Hospitality and events</strong>: flexible shifts, fast onboarding, tips possible.
              </li>
              <li>
                <strong>Delivery and logistics</strong>: stable demand, evening schedules, premiums.
              </li>
              <li>
                <strong>Tutoring</strong>: high hourly pay if you have strong subjects and communication.
              </li>
              <li>
                <strong>Sales and support</strong>: international teams value English, bonuses possible.
              </li>
            </ul>

            <h2 id="where-to-look">Where to find jobs fast</h2>
            <ul>
              <li><Link href="/jobs?city=Delft">Student Jobs Delft: all jobs</Link></li>
              <li>
                Use filters:{" "}
                <Link href="/jobs?city=Delft&english=true">English friendly</Link>,{" "}
                <Link href="/jobs?city=Delft&evening=true">evening</Link>,{" "}
                <Link href="/jobs?city=Delft&weekend=true">weekend</Link>,{" "}
                <Link href="/jobs?city=Delft&noExperience=true">no experience</Link>.
              </li>
              <li><Link href="/categories">Browse by category</Link></li>
              <li><Link href="/employers">Employer: feature your job</Link></li>
            </ul>

            <h2 id="cv-templates">CV and message templates</h2>
            <p>Copy and paste this into an application form or message:</p>
            <blockquote>
              Hi! I’m a student in Delft and I’m available on weekdays after 16:00 and on weekends. I can start
              immediately and I’m reliable with evening and weekend shifts. CV attached. Thank you!
            </blockquote>
            <p>
              Add a one line skills bar on your CV:{" "}
              <em>English C1 • Dutch A2 • Barista • Excel • Customer service • Driver’s license</em>.
            </p>

            <h2 id="schedule">Weekly schedule that fits classes</h2>
            <ul>
              <li><strong>Mon to Thu</strong>: 1 to 2 evening shifts.</li>
              <li><strong>Fri to Sun</strong>: 1 to 2 shifts, often the easiest hours to secure.</li>
              <li>Keep the same pattern every week. Managers reward predictable availability.</li>
            </ul>

            <h2 id="tax-bsn">BSN, bank, taxes, payslips</h2>
            <ul>
              <li><strong>BSN</strong>: needed for payroll. Keep proof if your appointment is pending.</li>
              <li><strong>IBAN</strong>: a Dutch bank account can speed up payments.</li>
              <li><strong>Taxes</strong>: keep payslips and annual statements. Many students are eligible for refunds.</li>
            </ul>

            <div className="rounded-2xl border p-5 bg-white">
              <div className="font-semibold text-lg">Ready to apply?</div>
              <p className="mt-1">
                Start here: <Link href="/jobs?city=Delft">Delft jobs</Link>,{" "}
                <Link href="/jobs?city=Delft&english=true">English friendly</Link>, or{" "}
                <Link href="/categories">categories</Link>.
              </p>
            </div>

            <h2 id="faq">FAQ</h2>

            <h3>Is Dutch required for student jobs in Delft?</h3>
            <p>
              Not always. Many hospitality, delivery, logistics, events, and support roles are English friendly. Basic Dutch helps for retail.
            </p>

            <h3>How many hours should I work as a student?</h3>
            <p>
              Many students aim for 8 to 20 hours per week. If you are non EU, check if you have additional limits or permit rules.
            </p>

            <h3>What is a good starting wage in Delft?</h3>
            <p>
              Often €13 to €17 per hour for many student roles. Tutoring can be higher, and allowances can boost your effective hourly rate.
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
              headline: "Student Jobs in Delft (2026): Complete Guide",
              description:
                "Permits, contracts, pay ranges, neighborhoods, and step by step tactics to land a student job in Delft fast.",
              image: [OG_IMAGE_URL],
              datePublished: PUBLISH_DATE,
              dateModified: MODIFIED_DATE,
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
                { "@type": "ListItem", position: 2, name: "Student Jobs in Delft (2026)", item: CANONICAL },
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
                  name: "Is Dutch required for student jobs in Delft?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Not always. Many hospitality, delivery, logistics, events, and support roles are English friendly. Basic Dutch helps for retail roles.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many hours should I work as a student?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Many students aim for 8 to 20 hours per week. Non EU students may have additional limits or permit requirements, so always check your personal situation.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is a good starting wage in Delft?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Often €13 to €17 per hour for many student jobs. Tutoring can be higher, and allowances for evening, night, or weekend shifts can raise your effective hourly rate.",
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
              name: "How to get a student job in Delft fast",
              image: [OG_IMAGE_URL],
              totalTime: "PT2H",
              supply: [
                { "@type": "HowToSupply", name: "One page CV (PDF)" },
                { "@type": "HowToSupply", name: "ID, BSN or appointment proof" },
                { "@type": "HowToSupply", name: "IBAN bank account" },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  name: "Pick categories that hire fast",
                  text:
                    "Choose 2 to 3 categories such as hospitality, delivery, logistics, tutoring, sales, or customer support based on your schedule and language.",
                },
                {
                  "@type": "HowToStep",
                  name: "Apply early and follow up",
                  text:
                    "Apply before 10:00 and follow up the same day. Employers often fill shifts quickly.",
                },
                {
                  "@type": "HowToStep",
                  name: "Use a short message",
                  text:
                    "Send a short note with your availability, start date, and strengths. Attach your CV.",
                },
                {
                  "@type": "HowToStep",
                  name: "Confirm documents",
                  text:
                    "Bring ID, BSN or appointment confirmation, IBAN, and any required residence or work permission documents.",
                },
              ],
            }),
          }}
        />
      </div>
    </section>
  );
}
