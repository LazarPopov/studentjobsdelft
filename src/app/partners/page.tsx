// src/app/partners/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/BackButton";

type Partner = {
  name: string;
  url: string;
  description?: string;        // plain-text fallback
  descriptionHtml?: string;    // prefer rich HTML (anchors)
  logoUrl?: string;            // optional
};

export const metadata: Metadata = {
  title: "Partners | Student Jobs Maastricht",
  description:
    "Our SEO, community, and hiring partners helping students find great jobs in Maastricht.",
  alternates: { canonical: "https://studentjobsmaastricht.nl/partners" },
  openGraph: {
    title: "Partners | Student Jobs Maastricht",
    description:
      "Our SEO, community, and hiring partners helping students find great jobs in Maastricht.",
    url: "https://studentjobsmaastricht.nl/partners",
    type: "website",
  },
};

// ✅ Real partners (anchor-rich blurbs where relevant)
const PARTNERS: Partner[] = [
  // {
  //   name: "The Storage Scanner",
  //   url: "https://thestoragescanner.com/en-NL/cities/zuid-holland/Maastricht",
  //   descriptionHtml:
  //     `The leading independent platform in Maastricht for comparing self-storage providers. Easily find and compare storage units and garage boxes by location, size, and price. Explore <a href="https://thestoragescanner.com/en-NL/cities/zuid-holland/Maastricht" target="_blank" rel="noopener noreferrer">self storage in Maastricht</a> to choose the best option for your budget.`,
  //   logoUrl: "/logos/storage-scanner.png",
  // },
  {
    name: "Domakin",
    url: "https://domakin.nl",
    descriptionHtml:
      `Housing help for international students: verified listings, remote viewings, and move-in support. Find fast, reliable <a href="https://domakin.nl" target="_blank" rel="noopener noreferrer">student housing in the Netherlands</a> with local guidance.`,
    logoUrl: "/logos/domakin.png",
  },
  {
    name: "RentSwap",
    url: "https://rentswap.io",
    descriptionHtml:
      `A handover marketplace that connects leaving tenants with incoming renters to reduce vacancy time and friction. Great for discovering <a href="https://rentswap.io" target="_blank" rel="noopener noreferrer">student rooms in Maastricht</a> through warm introductions.`,
    logoUrl: "/logos/rentswap.png",
  },
  {
    name: "Bulgarian Society Netherlands (BGSNL)",
    url: "https://bulgariansociety.nl",
    descriptionHtml:
      `Nationwide student network organizing events, internships, and community initiatives across Dutch cities. Partnering for culture, careers, and <a href="https://bulgariansociety.nl" target="_blank" rel="noopener noreferrer">Bulgarian student life in the Netherlands</a>.`,
    logoUrl: "/logos/bgsnl.png",
  },
//   {
//     name: "Acady",
//     url: "https://acady.nl",
//     descriptionHtml:
//       `Expert IB tutoring (MYP & DP) delivered by experienced graduates and educators—online or at home. Personalized support to boost confidence and grades. Learn more about <a href="https://acady.nl" target="_blank" rel="noopener noreferrer">IB tutoring in the Netherlands</a>.`,
//     logoUrl: "/logos/acady.png",
//   },
];

export default function PartnersPage() {
  const hasPartners = PARTNERS.length > 0;

  return (
    <>
      {/* JSON-LD: ItemList of Partners */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Student Jobs Maastricht Partners",
            itemListElement: PARTNERS.map((p, i) => ({
              "@type": "Organization",
              position: i + 1,
              name: p.name,
              url: p.url,
              description: p.description ?? (p.descriptionHtml ? stripHtml(p.descriptionHtml) : undefined),
              logo: p.logoUrl,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="section">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-semibold">Partners</h1>
            <BackButton />
          </div>
          <p className="mt-3 text-lg text-slate-700">
            We collaborate with SEO, community, and hiring partners to help
            students discover quality jobs faster.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/contact"
              className="btn btn-primary"
              data-gtm-event="partners_contact_cta"
            >
              Become a partner
            </Link>
            <a
              href="#list"
              className="btn"
              data-gtm-event="partners_view_list"
            >
              View partners
            </a>
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section id="list" className="section-alt">
        <div className="mx-auto max-w-5xl">
          {hasPartners ? (
            <div className="grid gap-4 md:grid-cols-2">
              {PARTNERS.map((p) => (
                <article
                  key={p.url}
                  className="card flex items-start gap-4"
                  data-gtm-event="partner_card_view"
                  data-gtm-prop-partner={p.name}
                >
                  {p.logoUrl ? (
                    <div className="h-14 w-14 shrink-0 rounded-xl border bg-white overflow-hidden grid place-items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.logoUrl}
                        alt={`${p.name} logo`}
                        className="max-h-12 max-w-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-14 w-14 shrink-0 rounded-xl border bg-slate-50 grid place-items-center text-sm text-slate-500">
                      {p.name[0]}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                        data-gtm-event="partner_visit"
                        data-gtm-prop-partner={p.name}
                      >
                        {p.name}
                      </a>
                    </h2>

                    {p.descriptionHtml ? (
                      <p
                        className="mt-1 text-sm text-slate-700"
                        dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
                      />
                    ) : (
                      p.description && (
                        <p className="mt-1 text-sm text-slate-700">{p.description}</p>
                      )
                    )}

                    <div className="mt-3">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-emerald-700 hover:underline"
                        data-gtm-event="partner_visit"
                        data-gtm-prop-partner={p.name}
                      >
                        {p.url.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card">
              <h2 className="text-lg font-semibold">No partners listed yet</h2>
              <p className="mt-2 text-sm text-slate-700">
                We’re finalizing a few collaborations. If you want to partner
                for SEO, events, or recruiting,{" "}
                <Link href="/contact" className="text-emerald-700 hover:underline">
                  get in touch
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Partner categories (context for SEO) */}
      <section className="section">
        <div className="mx-auto max-w-5xl grid gap-4 md:grid-cols-3">
          <div className="card">
            <div className="text-lg font-semibold">SEO & Web</div>
            <p className="mt-2 text-sm text-slate-700">
              Backlinks, content collaborations, and city-specific landing pages.
            </p>
          </div>
          <div className="card">
            <div className="text-lg font-semibold">Community</div>
            <p className="mt-2 text-sm text-slate-700">
              Student associations and local groups amplifying job discovery.
            </p>
          </div>
          <div className="card">
            <div className="text-lg font-semibold">Hiring Partners</div>
            <p className="mt-2 text-sm text-slate-700">
              Employers with recurring roles and campus-friendly shifts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Tiny helper to strip tags from HTML (for JSON-LD description fallback).
 * NOTE: Kept inline to avoid importing utilities.
 */
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
