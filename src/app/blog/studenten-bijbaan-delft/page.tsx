// src/app/studenten-bijbaan-delft/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const BASE_URL = "https://studentjobsdelft.nl";

const PUBLISH_DATE = "2026-10-02";
const MODIFIED_DATE = "2026-02-07";
const CANONICAL = `${BASE_URL}/studenten-bijbaan-delft`;

// Local image in /public/blog/delft-bridge.jpg
const HERO_IMAGE_PATH = "/blog/delft-bridge.jpg";

// Absolute URL for OG, Twitter, JSON-LD
const OG_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;

export const metadata: Metadata = {
 metadataBase: new URL(BASE_URL),
 title: "Studenten bijbaan Delft (2026) | Goed betaald, Engelstalig, avond en weekend",
 description:
 "De complete gids voor een studenten bijbaan in Delft. Filters voor avond en weekend, Engelstalige banen, zonder ervaring starten, uurloon per sector, contracten en live vacatures.",
 keywords: [
 "studenten bijbaan Delft",
 "bijbaan Delft",
 "studentenbaan Delft",
 "parttime baan Delft student",
 "student jobs Delft",
 "Engelstalige bijbaan Delft",
 "weekend bijbaan Delft",
 "avond bijbaan Delft",
 "vacatures Delft studenten",
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
 title: "Studenten bijbaan Delft (2026) | Goed betaald, Engelstalig, avond en weekend",
 description:
  "Pillar pagina met snelle filters, uurloon per sector, contractvormen en live vacatures voor studenten in Delft.",
 url: CANONICAL,
 type: "article",
 locale: "nl_NL",
 siteName: "Student Jobs Delft",
 publishedTime: PUBLISH_DATE,
 modifiedTime: MODIFIED_DATE,
 images: [
  {
  url: OG_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "Delft brug en grachten",
  },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: "Studenten bijbaan Delft (2026) | Goed betaald, Engelstalig, avond en weekend",
 description:
  "Snel een bijbaan in Delft vinden als student. Filters, uurloon, contracten en live vacatures.",
 images: [OG_IMAGE_URL],
 },
};

export default function StudentenBijbaanDelft() {
 return (
 <section className="section">
  <div className="mx-auto max-w-6xl">
  {/* HEADER */}
  <header className="max-w-3xl">
   <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
   Studenten bijbaan in Delft: de ultieme gids (2026)
   </h1>

   <p className="mt-3 text-sm text-slate-600">
   Door <span className="font-medium">Student Jobs Delft</span> • Bijgewerkt{" "}
   {new Date(MODIFIED_DATE).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
   })}
   </p>

   {/* Language toggle */}
   <div className="mt-3">
   <Link
    href="/blog/student-jobs-delft-complete-guide-2026"
    className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm underline hover:no-underline"
    aria-label="Read in English"
    data-ab="english-cta"
   >
    Read in English →
   </Link>
   </div>

   <figure className="mt-5 overflow-hidden rounded-2xl border bg-white">
   <Image
    src={HERO_IMAGE_PATH}
    alt="Delft brug en grachten, bijbaan vinden als student in Delft"
    width={1280}
    height={720}
    priority
    className="w-full h-auto object-cover"
   />
   <figcaption className="px-4 py-3 text-xs text-slate-600">
    Foto:{" "}
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

   {/* Quick filters */}
   <div className="mt-6 flex flex-wrap gap-2">
   <Link
    href="/jobs?city=Delft&evening=true"
    className="rounded-full border px-3 py-1 text-sm underline"
   >
    Avond
   </Link>
   <Link
    href="/jobs?city=Delft&weekend=true"
    className="rounded-full border px-3 py-1 text-sm underline"
   >
    Weekend
   </Link>
   <Link
    href="/jobs?city=Delft&noExperience=true"
    className="rounded-full border px-3 py-1 text-sm underline"
   >
    Zonder ervaring
   </Link>
   <Link
    href="/jobs?city=Delft&english=true"
    className="rounded-full border px-3 py-1 text-sm underline"
   >
    Engels
   </Link>
   <Link
    href="/jobs?city=Delft"
    className="rounded-full border px-3 py-1 text-sm underline"
   >
    Alle vacatures (Delft)
   </Link>
   </div>
  </header>

  {/* CONTENT + TOC */}
  <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
   {/* TOC */}
   <nav
   aria-label="Inhoud"
   className="
    order-1 lg:order-2
    lg:sticky lg:top-24 h-max
    rounded-2xl border p-4 bg-slate-50
    text-sm text-slate-700
   "
   >
   <div className="font-semibold">Op deze pagina</div>
   <ul className="mt-2 space-y-1">
    <li><a href="#waar-vinden" className="underline">Waar vind je snel een bijbaan (wijken)</a></li>
    <li><a href="#engels" className="underline">Engelstalige studentenbanen</a></li>
    <li><a href="#roosters" className="underline">Weekend en avond</a></li>
    <li><a href="#zonder-ervaring" className="underline">Zonder ervaring: 10 instapfuncties</a></li>
    <li><a href="#uurloon" className="underline">Uurloon en fooi (tabel)</a></li>
    <li><a href="#contracten" className="underline">Contractvormen</a></li>
    <li><a href="#non-eu" className="underline">Non EU studenten</a></li>
    <li><a href="#sollicitatie" className="underline">Sollicitatietips en gratis CV</a></li>
    <li><a href="#live-vacatures" className="underline">Live vacatures (Delft)</a></li>
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
    [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold
    [&_p]:mt-3 [&_ul]:mt-3 [&_ol]:mt-3
    [&_ul]:list-disc [&_ul]:pl-6
    [&_ol]:list-decimal [&_ol]:pl-6
    [&_a]:underline hover:[&_a]:no-underline
   "
   >
   <p>
    Wil je snel een studenten bijbaan in Delft? De beste aanpak is simpel:
    kies 2 tot 3 sectoren, zet je beschikbaarheid scherp neer (avond of weekend),
    en solliciteer gericht met korte follow up.
   </p>

   <h2 id="waar-vinden">Waar vind je snel een bijbaan in Delft (wijken en gebieden)</h2>
   <p>
    De snelste match krijg je als je dichtbij inzetbaar bent. Begin met{" "}
    <Link href="/jobs?city=Delft">alle vacatures</Link> en kies een gebied dat past bij jouw reisafstand:
   </p>
   <ul>
    <li><strong>Centrum</strong>: horeca, retail, toerisme, evenementen.</li>
    <li><strong>De Pijp en Oud Zuid</strong>: cafés, restaurants, barista, boutique retail.</li>
    <li><strong>Oud West en Westerpark</strong>: horeca, avondshifts, weekenddrukte.</li>
    <li><strong>Delft Oost</strong>: horeca en retail, vaak veel studenten.</li>
    <li><strong>Delft Noord</strong>: events, horeca, flexibele shifts.</li>
    <li><strong>Zuidas</strong>: catering en kantoorservices, vaker doordeweeks.</li>
    <li><strong>Sloterdijk en Westpoort</strong>: logistiek en magazijn, vaak toeslagen in de avond of nacht.</li>
    <li><strong>Zuidoost</strong>: retail en grote locaties, soms langere shifts.</li>
   </ul>

   <h2 id="engels">Engelstalige studentenbanen in Delft</h2>
   <p>
    Delft heeft veel <strong>Engelstalige teams</strong>, vooral in horeca, bezorging, logistiek,
    internationale retail en support. Start met{" "}
    <Link href="/jobs?city=Delft&english=true">Engels vriendelijke vacatures</Link>.
   </p>

   <h2 id="roosters">Weekend en avond: roosters die naast college passen</h2>
   <ul>
    <li><strong>Avondshifts</strong> na 17:00 in horeca, events, logistiek.</li>
    <li><strong>Weekend</strong> voor meer uren zonder colleges.</li>
    <li><strong>Toeslagen</strong> voor avond, nacht of weekend en vaak ook vakantiegeld.</li>
   </ul>

   <h2 id="zonder-ervaring">Zonder ervaring: 10 instapfuncties</h2>
   <ul>
    <li>Vakkenvuller</li>
    <li>Afwas en keukenhulp</li>
    <li>Bezorger (fiets of scooter)</li>
    <li>Host of hostess</li>
    <li>Promotiewerk</li>
    <li>Runner of bediening</li>
    <li>Magazijnmedewerker</li>
    <li>Kassamedewerker</li>
    <li>Data labeling (remote)</li>
    <li>Schoonmaak</li>
   </ul>

   <h2 id="uurloon">Uurloon en fooi: realistische ranges per sector</h2>
   <div className="overflow-x-auto rounded-2xl border bg-white">
    <table className="w-full text-left text-sm">
    <thead className="bg-slate-50">
     <tr>
     <th className="px-4 py-3">Sector</th>
     <th className="px-4 py-3">Uurloon (bruto)</th>
     <th className="px-4 py-3">Toeslagen</th>
     <th className="px-4 py-3">Fooi of bonus</th>
     </tr>
    </thead>
    <tbody>
     <tr>
     <td className="px-4 py-3">Horeca (barista, bediening)</td>
     <td className="px-4 py-3">€13 tot €16</td>
     <td className="px-4 py-3">Weekend, avond</td>
     <td className="px-4 py-3">Fooi is variabel</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Logistiek en magazijn</td>
     <td className="px-4 py-3">€14 tot €18</td>
     <td className="px-4 py-3">Avond, nacht, weekend</td>
     <td className="px-4 py-3">Meestal geen</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Bezorging</td>
     <td className="px-4 py-3">€13 tot €17</td>
     <td className="px-4 py-3">Weekend, weer</td>
     <td className="px-4 py-3">Bonus per shift of per rit</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Events (crew, lead)</td>
     <td className="px-4 py-3">€13 tot €17+</td>
     <td className="px-4 py-3">Weekend, avond</td>
     <td className="px-4 py-3">Lead toeslag</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Retail</td>
     <td className="px-4 py-3">€13 tot €16</td>
     <td className="px-4 py-3">Zondag, feestdag</td>
     <td className="px-4 py-3">Personeelskorting</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Klantenservice en support</td>
     <td className="px-4 py-3">€14 tot €17</td>
     <td className="px-4 py-3">Avond, weekend</td>
     <td className="px-4 py-3">KPI bonus</td>
     </tr>
     <tr>
     <td className="px-4 py-3">Bijles en tutoring</td>
     <td className="px-4 py-3">€15 tot €22</td>
     <td className="px-4 py-3">Meestal geen</td>
     <td className="px-4 py-3">Hoger bij specialisatie</td>
     </tr>
    </tbody>
    </table>
   </div>
   <p className="text-sm text-slate-600">
    Indicatief voor 2026. Werkelijk loon hangt af van leeftijd, ervaring, cao en toeslagen.
   </p>

   <h2 id="contracten">Contractvormen: parttime, tijdelijk, oproep</h2>
   <ul>
    <li><strong>Parttime</strong>: vaste uren per week en voorspelbaar rooster.</li>
    <li><strong>Oproep (0 uren of min max)</strong>: flexibel, vraag naar minimumuren en opzegtermijn.</li>
    <li><strong>Tijdelijk of uitzend</strong>: snel starten, check periode en toeslagen.</li>
   </ul>

   <h2 id="non-eu">Non EU studenten: uren en TWV</h2>
   <p>
    Niet EU studenten hebben vaak een urenlimiet tijdens het studiejaar en kunnen een TWV nodig hebben via
    werkgever of uitzendbureau. Check altijd de actuele regels bij{" "}
    <a href="https://ind.nl" target="_blank" rel="noopener noreferrer" className="underline">
    IND
    </a>{" "}
    en{" "}
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

   <h2 id="sollicitatie">Sollicitatietips en gratis CV template</h2>
   <ul>
    <li>Hou je CV op 1 pagina met een korte skills regel.</li>
    <li>Solliciteer vroeg op de dag en stuur dezelfde dag een korte follow up.</li>
    <li>Noem gebieden die je snel bereikt, bijvoorbeeld Centrum, De Pijp, Oost, Noord.</li>
   </ul>
   <div className="rounded-2xl border p-5 bg-white">
    <div className="font-semibold text-lg">Klaar om te starten?</div>
    <p className="mt-1">
    Bekijk{" "}
    <Link href="/jobs?city=Delft">alle vacatures (Delft)</Link>,{" "}
    <Link href="/jobs?city=Delft&english=true">Engels vriendelijk</Link>{" "}
    of <Link href="/categories">categorieën</Link>. Werkgever?{" "}
    <Link href="/employers">Adverteer je vacature</Link>.
    </p>
    <p className="mt-2 text-sm">
    Gratis CV template: <Link href="/assets/cv-template-student.pdf">download hier</Link>.
    </p>
   </div>

   <h2 id="live-vacatures">Live vacatures (Delft)</h2>
   <p className="text-sm text-slate-600">
    Tip: filter op{" "}
    <Link href="/jobs?city=Delft&evening=true">avond</Link>,{" "}
    <Link href="/jobs?city=Delft&weekend=true">weekend</Link>,{" "}
    <Link href="/jobs?city=Delft&noExperience=true">zonder ervaring</Link>,{" "}
    <Link href="/jobs?city=Delft&english=true">Engels</Link>.
   </p>
   <div className="rounded-2xl border bg-white p-4">
    <Link href="/jobs?city=Delft" className="underline">
    Open live vacatures voor Delft
    </Link>
    <div className="mt-3 flex flex-wrap gap-2">
    <Link href="/categories/hospitality" className="rounded-full border px-3 py-1 text-sm underline">
     Horeca
    </Link>
    <Link href="/categories/delivery" className="rounded-full border px-3 py-1 text-sm underline">
     Bezorging en logistiek
    </Link>
    <Link href="/categories/retail" className="rounded-full border px-3 py-1 text-sm underline">
     Retail
    </Link>
    <Link href="/categories/events" className="rounded-full border px-3 py-1 text-sm underline">
     Events
    </Link>
    <Link href="/categories/support" className="rounded-full border px-3 py-1 text-sm underline">
     Klantenservice
    </Link>
    <Link href="/categories/tutoring" className="rounded-full border px-3 py-1 text-sm underline">
     Bijles
    </Link>
    </div>
   </div>

   <h2 id="faq">FAQ</h2>

   <h3>Hoeveel uur mag ik werken?</h3>
   <p>
    Veel studenten werken 8 tot 20 uur per week. Voor Non EU studenten kunnen extra beperkingen gelden.
    Controleer je situatie bij officiële bronnen en je werkgever.
   </p>

   <h3>Zijn er Engelstalige bijbanen in Delft?</h3>
   <p>
    Ja. Vooral in horeca, bezorging, logistiek, internationale retail en klantenservice. Start bij{" "}
    <Link href="/jobs?city=Delft&english=true">Engels vriendelijke vacatures</Link>.
   </p>

   <h3>Wat verdient een student in 2026?</h3>
   <p>
    Vaak €13 tot €17 per uur in horeca, logistiek en retail, en €15 tot €22 voor bijles.
    Toeslagen en fooi kunnen je effectieve uurloon verhogen.
   </p>

   <h3>Welke wijken zijn handig voor een bijbaan?</h3>
   <p>
    Centrum, De Pijp, Oud West, Oost en Noord zijn vaak handig voor horeca en retail.
    Sloterdijk en Westpoort zijn sterk voor logistiek en magazijn.
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
    headline: "Studenten bijbaan Delft (2026) | Goed betaald, Engelstalig, avond en weekend",
    description:
    "Pillar gids voor studenten bijbanen in Delft met snelle filters, uurloon per sector, contractvormen en live vacatures.",
    image: [
    {
     "@type": "ImageObject",
     url: OG_IMAGE_URL,
     width: 1200,
     height: 630,
     creditText: "delftprivateboat.com",
    },
    ],
    datePublished: PUBLISH_DATE,
    dateModified: MODIFIED_DATE,
    inLanguage: "nl-NL",
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Studenten bijbaan Delft", item: CANONICAL },
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
     name: "Hoeveel uur mag ik werken?",
     acceptedAnswer: {
     "@type": "Answer",
     text:
      "Veel studenten werken 8 tot 20 uur per week. Voor Non EU studenten kunnen extra beperkingen en vergunningseisen gelden. Controleer altijd je persoonlijke situatie en de actuele regels.",
     },
    },
    {
     "@type": "Question",
     name: "Zijn er Engelstalige bijbanen in Delft?",
     acceptedAnswer: {
     "@type": "Answer",
     text:
      "Ja. Vooral in horeca, bezorging, logistiek, internationale retail en klantenservice. Filter op Engels vriendelijke vacatures om sneller te matchen.",
     },
    },
    {
     "@type": "Question",
     name: "Wat verdient een student in 2026?",
     acceptedAnswer: {
     "@type": "Answer",
     text:
      "Vaak €13 tot €17 per uur in horeca, logistiek en retail, en €15 tot €22 voor bijles. Toeslagen en fooi kunnen het effectieve uurloon verhogen.",
     },
    },
    {
     "@type": "Question",
     name: "Welke wijken zijn handig voor een bijbaan?",
     acceptedAnswer: {
     "@type": "Answer",
     text:
      "Centrum, De Pijp, Oud West, Oost en Noord zijn vaak handig voor horeca en retail. Sloterdijk en Westpoort zijn sterk voor logistiek en magazijn.",
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
