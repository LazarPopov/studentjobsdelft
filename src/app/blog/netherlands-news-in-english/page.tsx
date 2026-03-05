
// src/app/netherlands-news-in-english/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://www.studentjobsdelft.nl";
const CANONICAL = `${BASE_URL}/netherlands-news-in-english`;

const PUBLISH_DATE = "2026-03-05";
const MODIFIED_DATE = "2026-03-05";

const HERO_IMAGE_PATH = "/blog/netherlands-news.jpg";
const OG_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Top English News Sources in the Netherlands (2026) | Living in Delft | Student Jobs Delft",
  description:
    "Trying to keep up with Dutch news in English? We review the best platforms for 2026, including Dutch Brief, DutchNews.nl, and local Delft resources.",
  keywords: [
    "Dutch Brief",
    "Dutch news in English 2026",
    "English language news Netherlands",
    "expat news Delft",
    "DutchNews.nl vs NL Times",
    "Groningen Mail evolution",
    "staying informed Netherlands"
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
    title: "How to follow Dutch News in English: 2026 Essential Guide",
    description:
      "A curated guide for internationals in Delft. From the Dutch Brief newsletter to deep-dive investigative sites, here's how to stay in the loop.",
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
        alt: "Netherlands skyline and newspapers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best English News in the Netherlands (2026 Update)",
    description:
      "Stop relying on Google Translate. Discover the top English-language news outlets for expats in Delft.",
    images: [OG_IMAGE_URL],
  },
};

export default function NetherlandsNewsInEnglishDelft() {
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
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Staying Informed: The Best English News Platforms in the Netherlands (2026)
          </h1>

          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            For internationals living in <strong>Delft</strong>, keeping up with local policy, housing laws, and national news can be a challenge. You shouldn't have to rely on clunky browser translations to know what's happening in your own backyard.
          </p>

          <p className="mt-3 text-sm text-slate-500 italic">
            By <span className="font-semibold text-slate-900">Student Jobs Delft Editorial</span> • Last updated {updatedLabel}
          </p>

          <figure className="mt-8 overflow-hidden rounded-2xl shadow-sm border">
            <Image
              src={HERO_IMAGE_PATH}
              alt="Netherlands skyline and newspapers"
              width={1280}
              height={720}
              priority
              className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
            />
            <figcaption className="bg-slate-50 px-4 py-3 text-xs text-slate-500">
              Source: <a href="https://dutchbrief.com" target="_blank" rel="noopener noreferrer" className="underline">https://dutchbrief.com</a>
            </figcaption>
          </figure>

          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Quick Directory</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { name: "Dutch Brief", href: "https://dutchbrief.com/" },
                { name: "DutchNews.nl", href: "https://www.dutchnews.nl/" },
                { name: "NL Times", href: "https://nltimes.nl/" },
                { name: "IamExpat", href: "https://www.iamexpat.nl/dutch-news" },
                { name: "Jobs in Delft", href: "/jobs?city=Delft", local: true },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.local ? "_self" : "_blank"}
                  rel={link.local ? "" : "noopener noreferrer"}
                  className="rounded-lg border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* TOC */}
          <nav aria-label="Table of contents" className="order-1 lg:order-2 lg:sticky lg:top-24 h-max rounded-2xl border p-6 bg-slate-50">
            <div className="font-bold text-slate-900 uppercase text-xs tracking-wider">In this guide</div>
            <ul className="mt-4 space-y-3 text-sm font-medium text-slate-600">
              <li><a href="#why" className="hover:text-blue-600">The language barrier in Dutch Media</a></li>
              <li><a href="#dutch-brief" className="hover:text-blue-600">Dutch Brief: Efficiency first</a></li>
              <li><a href="#alternatives" className="hover:text-blue-600">Comprehensive alternatives</a></li>
              <li><a href="#how-to-use" className="hover:text-blue-600">Creating a news habit</a></li>
              <li><a href="#students" className="hover:text-blue-600">Tips for Delft students</a></li>
              
              <li><a href="#faq" className="hover:text-blue-600">Common Questions</a></li>
            </ul>
          </nav>

          {/* ARTICLE */}
          <article className="order-2 lg:order-1 max-w-3xl space-y-8 leading-relaxed text-slate-800 text-lg">
            <section id="why">
              <h2 className="text-2xl font-bold text-slate-900">Why English-Language News is Essential</h2>
              <p>
                Navigating the Netherlands as an international often means missing the "fine print" of society. Whether it's a sudden change in 30% ruling policies or a local transit strike in <strong>Delft</strong>, having a source that translates not just the words, but the <em>context</em>, is vital. The platforms below have moved beyond simple translation; they offer curation specifically for the expat experience.
              </p>
            </section>

            <section id="dutch-brief" className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-2xl font-bold text-slate-900 mt-0">Dutch Brief: The Modern Standard</h2>
              <p>
                <a href="https://dutchbrief.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">Dutch Brief</a> has carved out a niche by respecting the reader's time. Originally launched as the <em>Groningen Mail</em>, it successfully transitioned into a national powerhouse by focusing on high-density information.
              </p>
              <ul className="mt-4 space-y-2 text-base">
                <li className="flex items-start gap-2"><span>✅</span> <strong>No fluff:</strong> Designed for busy professionals who need a 5-minute summary.</li>
                <li className="flex items-start gap-2"><span>✅</span> <strong>Expat-centric:</strong> They prioritize news that actually affects your residency and wallet.</li>
                <li className="flex items-start gap-2"><span>✅</span> <strong>Plain English:</strong> Avoiding the overly academic tone found in traditional Dutch broadsheets.</li>
              </ul>
            </section>

            <section id="alternatives">
              <h2 className="text-2xl font-bold text-slate-900">Comparing the Top Platforms</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">DutchNews.nl — <span className="text-slate-500 font-normal">The Investigative Choice</span></h3>
                  <p className="mt-2">Widely considered the "Paper of Record" for English speakers, <strong>DutchNews.nl</strong> provides deep-dive analysis. If you want to understand the <em>why</em> behind Dutch politics, their podcast and long-form features are unmatched.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">NL Times — <span className="text-slate-500 font-normal">The Daily Wire</span></h3>
                  <p className="mt-2">If you want volume, <strong>NL Times</strong> is the answer. They publish dozens of stories daily, covering everything from crime reports to Eredivisie scores. It is the closest experience you'll get to a traditional daily newspaper.</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">IamExpat — <span className="text-slate-500 font-normal">The Practical Guide</span></h3>
                  <p className="mt-2">More than just news, <strong>IamExpat</strong> is about utility. Their news section is heavily filtered to focus on housing, taxes, and career opportunities—perfect for those still settling into <strong>Delft</strong>.</p>
                </div>
              </div>
            </section>

            <section id="how-to-use" className="border-l-4 border-blue-500 pl-6 py-2">
              <h2 className="text-2xl font-bold text-slate-900">The "Informant" Routine</h2>
              <p>Don't let the news cycle overwhelm you. We recommend this 3-step approach:</p>
              <ol className="mt-4 space-y-4 text-base">
                <li><strong>Morning:</strong> Scan <em>Dutch Brief</em> for immediate national updates.</li>
                <li><strong>Mid-week:</strong> Check <em>IamExpat</em> or <em>Expatica</em> for lifestyle and regulatory changes.</li>
                <li><strong>Weekend:</strong> Listen to the <em>DutchNews.nl</em> podcast for the broader political narrative.</li>
              </ol>
            </section>

            <section id="students">
              <h2 className="text-2xl font-bold text-slate-900">For Students in Delft</h2>
              <p>
                The academic year often brings specific challenges—like the ongoing housing shortage or changes to student finance (DUO). These English platforms are often the first to break news regarding student visas and part-time work regulations. 
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link href="/jobs?city=Delft" className="flex-1 text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
                  View Student Jobs in Delft
                </Link>
                <Link href="/categories" className="flex-1 text-center border-2 border-slate-200 font-bold py-3 rounded-xl hover:border-blue-500 transition-colors">
                  Browse Work Categories
                </Link>
              </div>
            </section>

            <section id="faq" className="pt-8 border-t">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Which English news site is the most reliable?</h3>
                  <p className="mt-2 text-slate-600 text-base">DutchNews.nl is frequently cited for its editorial standards, while Dutch Brief is highly regarded for its concise, unbiased summaries.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Is Dutch Brief a paid service?</h3>
                  <p className="mt-2 text-slate-600 text-base">They offer a robust free newsletter, which is why it has become so popular among the international community in cities like Delft.</p>
                </div>
              </div>
            </section>
          </article>
        </div>

        {/* JSON-LD remains same but ensure metadata matches new descriptions */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best English news platforms in the Netherlands (2026)",
              description: "A comprehensive review of English news sources for internationals living in Delft.",
              image: [OG_IMAGE_URL],
              datePublished: PUBLISH_DATE,
              dateModified: MODIFIED_DATE,
              author: { "@type": "Organization", name: "Student Jobs Delft" },
              publisher: { "@type": "Organization", name: "Student Jobs Delft" },
              mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL },
            }),
          }}
        />
      </div>
    </section>
  );
}
