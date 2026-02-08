// src/app/part-time-jobs-maastricht-students/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://studentjobsmaastricht.nl";
const CANONICAL = `${BASE_URL}/part-time-jobs-maastricht-students`;

const PUBLISH_DATE = "2026-10-02";
const MODIFIED_DATE = "2026-02-07";

// Use the local image you mentioned (in /public/blog/)
const HERO_IMAGE_PATH = "/blog/maastricht-bridge.jpg";
const OG_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Student Part Time Jobs in Maastricht (2026) | English Friendly + Weekend | Student Jobs Maastricht",
  description:
    "Find student part time jobs in Maastricht in 2026. English friendly roles, evening and weekend shifts, no experience jobs, hourly pay table, contract types, and live vacancies.",
  keywords: [
    "student part time jobs Maastricht",
    "part time jobs Maastricht students",
    "student jobs Maastricht",
    "English speaking student jobs Maastricht",
    "no experience student jobs Maastricht",
    "weekend jobs Maastricht students",
    "evening jobs Maastricht students",
    "bijbaan Maastricht",
    "flex jobs Maastricht",
    "warehouse jobs Maastricht students",
    "hospitality jobs Maastricht students",
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
    title: "Student Part Time Jobs in Maastricht (2026): Pay, Filters, and Where to Apply",
    description:
      "Pillar guide for Maastricht students: English friendly vacancies, evening and weekend shifts, pay table, contract types, and quick filters.",
    url: CANONICAL,
    type: "article",
    locale: "en_NL",
    siteName: "Student Jobs Maastricht",
    publishedTime: PUBLISH_DATE,
    modifiedTime: MODIFIED_DATE,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Maastricht bridge and canals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Part Time Jobs in Maastricht (2026)",
    description:
      "English friendly roles, weekend and evening shifts, pay table, and live vacancies in Maastricht.",
    images: [OG_IMAGE_URL],
  },
};

export default function PartTimeJobsMaastrichtStudents() {
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
            Student part time jobs in Maastricht: the ultimate guide (2026)
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            By <span className="font-medium">Student Jobs Maastricht</span> • Updated {updatedLabel}
          </p>

          {/* Language toggle */}
          <div className="mt-3">
            <Link
              href="/studenten-bijbaan-maastricht"
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm underline hover:no-underline"
              aria-label="Lees in het Nederlands"
              data-ab="dutch-cta"
            >
              Lees in het Nederlands →
            </Link>
          </div>

          <figure className="mt-5 overflow-hidden rounded-2xl border bg-white">
            <Image
              src={HERO_IMAGE_PATH}
              alt="Maastricht bridge and canals"
              width={1280}
              height={720}
              priority
              className="w-full h-auto object-cover"
            />
            <figcaption className="px-4 py-3 text-xs text-slate-600">
              Photo credit:{" "}
              <a
                href="https://www.maastrichtprivateboat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                maastrichtprivateboat.com
              </a>
            </figcaption>
          </figure>

          {/* Quick filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/jobs?city=Maastricht&evening=true" className="rounded-full border px-3 py-1 text-sm underline">
              Evening
            </Link>
            <Link href="/jobs?city=Maastricht&weekend=true" className="rounded-full border px-3 py-1 text-sm underline">
              Weekend
            </Link>
            <Link href="/jobs?city=Maastricht&noExperience=true" className="rounded-full border px-3 py-1 text-sm underline">
              No experience
            </Link>
            <Link href="/jobs?city=Maastricht&english=true" className="rounded-full border px-3 py-1 text-sm underline">
              English friendly
            </Link>
            <Link href="/jobs?city=Maastricht" className="rounded-full border px-3 py-1 text-sm underline">
              All vacancies (Maastricht)
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
              <li><a href="#where-to-find" className="underline">Where to find a job fast (areas)</a></li>
              <li><a href="#english" className="underline">English speaking student jobs</a></li>
              <li><a href="#schedules" className="underline">Weekend and evening schedules</a></li>
              <li><a href="#no-experience" className="underline">No experience: 10 entry level roles</a></li>
              <li><a href="#pay" className="underline">Hourly pay and tips (table)</a></li>
              <li><a href="#contracts" className="underline">Contract types</a></li>
              <li><a href="#non-eu" className="underline">Non EU students</a></li>
              <li><a href="#apply" className="underline">Application tips and free CV</a></li>
              <li><a href="#live" className="underline">Live vacancies (Maastricht)</a></li>
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
              Maastricht has a massive student job market, but the fastest way to get hired is simple: pick one or two
              job categories, apply early, and target shifts employers struggle to fill (evenings and weekends).
              Use the filters on this page to go straight to vacancies that match your schedule.
            </p>

            <h2 id="where-to-find">Where to find a part time job fast in Maastricht (areas that hire a lot)</h2>
            <p>
              You match faster when you can start close to home. Begin with{" "}
              <Link href="/jobs?city=Maastricht">all Maastricht vacancies</Link> and focus on areas with lots of employers:
            </p>
            <ul>
              <li><strong>Centrum</strong>: hospitality, retail, tourist focused roles, events venues.</li>
              <li><strong>De Pijp and Oud Zuid</strong>: cafés, restaurants, boutique retail, barista roles.</li>
              <li><strong>Oud West and Westerpark</strong>: hospitality density, evening shifts, busy weekends.</li>
              <li><strong>Zuidas</strong>: catering, office services, customer support, weekday shifts.</li>
              <li><strong>Noord</strong>: events, hospitality, warehouses nearby, flexible shifts.</li>
              <li><strong>Sloterdijk and Westpoort</strong>: logistics and warehouses, evening or night allowances.</li>
            </ul>

            <h2 id="english">English speaking student jobs in Maastricht</h2>
            <p>
              Maastricht is one of the most English friendly cities in the Netherlands. You will find English speaking
              teams in hospitality, delivery and logistics, international retail, and customer support. Start here:{" "}
              <Link href="/jobs?city=Maastricht&english=true">English friendly Maastricht vacancies</Link>.
            </p>

            <h2 id="schedules">Weekend and evening schedules that fit your classes</h2>
            <ul>
              <li><strong>Evening shifts</strong> (after 17:00): common in hospitality, events, and warehouses.</li>
              <li><strong>Weekend shifts</strong>: easiest way to build hours without lecture conflicts.</li>
              <li><strong>Allowances</strong>: evening, night, weekend premiums plus holiday pay (often 8 percent).</li>
            </ul>

            <h2 id="no-experience">No experience: 10 entry level student jobs</h2>
            <ul>
              <li>Shelf stocker</li>
              <li>Dishwasher or kitchen help</li>
              <li>Courier by bike or scooter</li>
              <li>Host or hostess</li>
              <li>Promo staff or flyer work</li>
              <li>Runner or service assistant</li>
              <li>Warehouse associate</li>
              <li>Cashier</li>
              <li>Data labeling (remote)</li>
              <li>Cleaning</li>
            </ul>

            <h2 id="pay">Hourly pay and tips: realistic ranges per sector</h2>
            <div className="overflow-x-auto rounded-2xl border bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3">Hourly (gross)</th>
                    <th className="px-4 py-3">Allowances</th>
                    <th className="px-4 py-3">Tips or bonus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">Hospitality (barista or service)</td>
                    <td className="px-4 py-3">€13 to €16</td>
                    <td className="px-4 py-3">Weekend or evening</td>
                    <td className="px-4 py-3">€1 to €3 per hour (tips, variable)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Logistics or warehouse</td>
                    <td className="px-4 py-3">€14 to €18</td>
                    <td className="px-4 py-3">Evening, night, weekend</td>
                    <td className="px-4 py-3">—</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Delivery (platform or retail)</td>
                    <td className="px-4 py-3">€13 to €17</td>
                    <td className="px-4 py-3">Weekend or weather</td>
                    <td className="px-4 py-3">Per ride or bonus</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Events crew or lead</td>
                    <td className="px-4 py-3">€13 to €17 plus</td>
                    <td className="px-4 py-3">Weekend or evening</td>
                    <td className="px-4 py-3">Lead premium</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Retail or cashier</td>
                    <td className="px-4 py-3">€13 to €16</td>
                    <td className="px-4 py-3">Sunday or holiday</td>
                    <td className="px-4 py-3">Staff discount</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Customer support</td>
                    <td className="px-4 py-3">€14 to €17</td>
                    <td className="px-4 py-3">Evening or weekend</td>
                    <td className="px-4 py-3">KPI bonus</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Tutoring</td>
                    <td className="px-4 py-3">€15 to €22</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">Higher with specialization</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600">
              Indicative for 2026. Actual pay depends on age, experience, collective labor agreement, and allowances.
            </p>

            <h2 id="contracts">Contract types: part time, temporary, on call</h2>
            <ul>
              <li><strong>Part time</strong>: fixed weekly hours and predictable schedule.</li>
              <li><strong>On call</strong> (zero hours or min max): flexible, ask about minimum hours and notice period.</li>
              <li><strong>Temporary or agency</strong>: fast start, check allowances and contract duration.</li>
            </ul>

            <h2 id="non-eu">Non EU students: hours limit and work permit</h2>
            <p>
              Non EU students often have an hours limit during the academic year and may need a work permit through the
              employer or agency. Check your personal situation and the latest rules at{" "}
              <a href="https://ind.nl" target="_blank" rel="noopener noreferrer" className="underline">
                IND
              </a>{" "}
              or{" "}
              <a
                href="https://www.rijksoverheid.nl/onderwerpen/werken-tijdens-studie"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rijksoverheid
              </a>
              .
            </p>

            <h2 id="apply">Application tips and free CV template</h2>
            <ul>
              <li>Keep your CV to one page with a short skills line (English, Dutch level, Excel, barista, driver license).</li>
              <li>Apply early and follow up the same day if possible.</li>
              <li>State which areas you can reach fast (Centrum, De Pijp, Oud West, Zuidas, Noord, Sloterdijk).</li>
            </ul>

            <div className="rounded-2xl border p-5 bg-white">
              <div className="font-semibold text-lg">Ready to start?</div>
              <p className="mt-1">
                See <Link href="/jobs?city=Maastricht">all vacancies</Link>,{" "}
                <Link href="/jobs?city=Maastricht&english=true">English friendly</Link>, or{" "}
                <Link href="/categories">browse categories</Link>. Employer?{" "}
                <Link href="/employers">Feature your job</Link>.
              </p>
              <p className="mt-2 text-sm">
                Free CV template: <Link href="/assets/cv-template-student.pdf">download here</Link>.
              </p>
            </div>

            <h2 id="live">Live vacancies (Maastricht)</h2>
            <p className="text-sm text-slate-600">
              Tip: filter by <Link href="/jobs?city=Maastricht&evening=true">evening</Link>,{" "}
              <Link href="/jobs?city=Maastricht&weekend=true">weekend</Link>,{" "}
              <Link href="/jobs?city=Maastricht&noExperience=true">no experience</Link>,{" "}
              <Link href="/jobs?city=Maastricht&english=true">English friendly</Link>.
            </p>

            <div className="rounded-2xl border bg-white p-4">
              <Link href="/jobs?city=Maastricht" className="underline">
                Open live vacancies for Maastricht
              </Link>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/categories/hospitality" className="rounded-full border px-3 py-1 text-sm underline">
                  Hospitality
                </Link>
                <Link href="/categories/delivery" className="rounded-full border px-3 py-1 text-sm underline">
                  Delivery and logistics
                </Link>
                <Link href="/categories/retail" className="rounded-full border px-3 py-1 text-sm underline">
                  Retail
                </Link>
                <Link href="/categories/events" className="rounded-full border px-3 py-1 text-sm underline">
                  Events
                </Link>
                <Link href="/categories/support" className="rounded-full border px-3 py-1 text-sm underline">
                  Customer support
                </Link>
                <Link href="/categories/tutoring" className="rounded-full border px-3 py-1 text-sm underline">
                  Tutoring
                </Link>
              </div>
            </div>

            <h2 id="faq">FAQ</h2>

            <h3>How many hours can I work as a student in Maastricht?</h3>
            <p>
              Many students work 8 to 20 hours per week. If you are a non EU student, extra limits or permit rules may
              apply. Always check your situation.
            </p>

            <h3>Are there English speaking student jobs in Maastricht?</h3>
            <p>
              Yes. Especially in hospitality, delivery and logistics, events, and customer support. Start with{" "}
              <Link href="/jobs?city=Maastricht&english=true">English friendly vacancies</Link>.
            </p>

            <h3>What does a student earn per hour in Maastricht in 2026?</h3>
            <p>
              Often €13 to €17 per hour in hospitality, logistics, retail, and support. Tutoring is often €15 to €22.
              Allowances and tips can increase your hourly rate.
            </p>

            <h3>Which areas are most convenient for part time jobs?</h3>
            <p>
              Centrum, De Pijp, Oud West, Zuidas, Noord, and Sloterdijk and Westpoort for logistics roles.
            </p>
          </article>
        </div>

        {/* JSON-LD: Article + Breadcrumb + FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Student Part Time Jobs in Maastricht (2026)",
              description:
                "Pillar guide for student part time jobs in Maastricht with fast filters, pay table, contract types, and live vacancies.",
              image: [OG_IMAGE_URL],
              datePublished: PUBLISH_DATE,
              dateModified: MODIFIED_DATE,
              inLanguage: "en-NL",
              author: {
                "@type": "Organization",
                name: "Student Jobs Maastricht",
                url: `${BASE_URL}/`,
              },
              publisher: {
                "@type": "Organization",
                name: "Student Jobs Maastricht",
                url: `${BASE_URL}/`,
              },
              mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
              about: [{ "@type": "Place", name: "Maastricht" }],
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
                { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Student part time jobs Maastricht", item: CANONICAL },
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
                  name: "How many hours can I work as a student in Maastricht?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Many students work 8 to 20 hours per week. Non EU students may have additional limits or permit requirements. Check your personal situation and current rules.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are there English speaking student jobs in Maastricht?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes. Hospitality, delivery and logistics, events, and customer support often have English speaking teams. Filtering for English friendly vacancies helps you match faster.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What does a student earn per hour in Maastricht in 2026?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Often €13 to €17 per hour in hospitality, logistics, retail, and support, and about €15 to €22 for tutoring. Allowances and tips can increase your hourly rate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which areas are most convenient for part time jobs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Centrum, De Pijp, Oud West, Zuidas, Noord, and Sloterdijk and Westpoort for logistics roles.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </section>
  );
}
