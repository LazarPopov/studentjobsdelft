
// src/app/blog/get-started-ing-student/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import IngButton from "./IngButton";

const BASE_URL = "https://www.studentjobsdelft.nl/";
const CANONICAL = `${BASE_URL}/blog/get-started-ing-student`;
const PUBLISH_DATE = "2026-03-12";
const MODIFIED_DATE = "2026-03-12";

const FAQS = [
  {
    question: "Do students in Delft need a Dutch bank account?",
    answer:
      "Not always immediately, but many students open one because it makes rent payments, salary payments, and daily transactions in the Netherlands easier.",
  },
  {
    question: "Can I use my foreign bank account when I first arrive?",
    answer:
      "Usually yes for some transactions, but many local services and payment flows in the Netherlands work more smoothly with a Dutch IBAN and iDEAL access.",
  },
  {
    question: "What documents are usually needed to open a Dutch bank account?",
    answer:
      "Banks often ask for a valid passport or ID, proof of enrolment, a Dutch address, and sometimes a BSN depending on the bank and the stage of the application.",
  },
  {
    question: "Do I need a BSN before opening a bank account?",
    answer:
      "That depends on the bank. Some banks may allow you to begin the process before you have your BSN, while others require it earlier.",
  },
  {
    question: "Why do students in Delft care about iDEAL?",
    answer:
      "iDEAL is commonly used for online payments in the Netherlands, so students often prefer an account that supports it for shopping, services, and local transactions.",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Student Guide to Opening a Bank Account in Delft (2026) | Student Jobs Delft",
  description:
    "A practical guide for students moving to Delft. Learn why a Dutch bank account helps with rent, salary payments, iDEAL, and everyday life in the Netherlands.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Student Banking in Delft: What You Need to Know",
    description:
      "Understand how Dutch banking works, what documents students usually need, and how to prepare for daily life in Delft.",
    url: CANONICAL,
    type: "article",
    images: [{ url: `${BASE_URL}/blog/created_at_histogram.png` }],
  },
};

export default function IngPageDelft() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Opening a Dutch Bank Account in Delft: A Practical Student Guide",
    description:
      "A practical guide for students moving to Delft. Learn why a Dutch bank account helps with rent, salary payments, iDEAL, and everyday life in the Netherlands.",
    datePublished: PUBLISH_DATE,
    dateModified: MODIFIED_DATE,
    mainEntityOfPage: CANONICAL,
    image: [`${BASE_URL}/blog/created_at_histogram.png`],
    author: {
      "@type": "Organization",
      name: "Student Jobs Delft Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "Student Jobs Delft",
    },
  };

  const navItems = [
    { id: "why", label: "Why it matters" },
    { id: "city", label: "Banking in Delft" },
    { id: "documents", label: "What you need" },
    { id: "compare", label: "What to compare" },
    { id: "next-steps", label: "Next steps" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 text-slate-800 sm:px-6 lg:px-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-500">
          Student Life in Delft
        </p>

        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Opening a Dutch Bank Account in Delft: A Practical Student Guide
        </h1>

        <p className="max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          If you are moving to <strong>Delft</strong> for your studies, setting
          up a Dutch bank account can make daily life much easier. This guide
          explains why it matters, what documents are commonly requested, and
          what to keep in mind before choosing a bank in the Netherlands.
        </p>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Many students choose to sort this out early so they can handle rent,
          salary payments, and iDEAL purchases more easily. If you already know
          you want to continue with ING, you can use the link below.
        </p>

        <div className="mt-4">
          <IngButton city="Delft" />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-sm text-slate-500">
          <span>
            Published on{" "}
            {new Date(PUBLISH_DATE).toLocaleDateString("en-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="hidden sm:inline">|</span>
          <span>
            Updated on{" "}
            {new Date(MODIFIED_DATE).toLocaleDateString("en-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="hidden sm:inline">|</span>
          <span>By Student Jobs Delft Editorial</span>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-8 lg:mb-0">
          <nav
            aria-label="Page navigation"
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900">
                On this page
              </h2>

              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        <div className="space-y-12 text-base leading-7 sm:text-lg sm:leading-8">
          <section id="why" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Why students in Delft often open a Dutch bank account
            </h2>

            <p className="mb-4">
              Many international students arrive in the Netherlands assuming
              their existing bank card will work everywhere. In practice, Dutch
              payment habits can be different from what you may be used to.
            </p>

            <p className="mb-4">
              Some shops, online checkouts, and local payment systems rely
              heavily on <strong>iDEAL</strong> and Dutch banking infrastructure.
              A Dutch IBAN can also be useful when arranging rent payments,
              receiving a salary from a student job, managing subscriptions, or
              handling other local administrative tasks.
            </p>

            <p>
              This does not always mean you must replace your current bank
              account. However, for many students in <strong>Delft</strong>,
              having a local account makes everyday payments simpler and reduces
              friction during the first months in the Netherlands.
            </p>
          </section>

          <Image
            src="/blog/created_at_histogram.png"
            alt="Student life in Delft"
            width={1200}
            height={630}
            className="rounded-2xl border shadow-sm"
            priority
          />

          <section
            id="city"
            className="scroll-mt-24 rounded-2xl border bg-slate-50 p-6 sm:p-8"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Banking as a student in Delft
            </h2>

            <p className="mb-6 text-slate-700">
              You came to Delft to engineer the future; start by engineering a frictionless way to manage your daily student budget.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  Living in the city
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Historic, picture-perfect, and intensely academic. It’s a tight-knit community of future engineers and designers living in a classic Dutch postcard.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  Student work and payments
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Tutoring is a massive industry here. Whether it's helping high schoolers with calculus or working as a teaching assistant on the TU Delft campus, these professional gigs require professional payroll setups.
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-6 text-sm italic text-slate-700 sm:text-base">
              <strong>Local note for Delft:</strong> Don't be the only one at the faculty 'borrel' (drinks) who can't pay their share because your foreign card is acting up. The ING app makes splitting the bill an exact science.
            </div>
          </section>

          <section id="documents" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              What banks usually ask for
            </h2>

            <p className="mb-4">
              Requirements can differ by bank and by personal situation, but
              students are often asked to provide some combination of the
              following:
            </p>

            <ul className="grid list-none gap-3 pl-0 sm:grid-cols-2">
              <li className="rounded-lg border bg-white p-3 text-sm text-slate-700">
                Valid passport or national ID card
              </li>
              <li className="rounded-lg border bg-white p-3 text-sm text-slate-700">
                Proof of enrolment from your university or institution
              </li>
              <li className="rounded-lg border bg-white p-3 text-sm text-slate-700">
                Dutch residential address
              </li>
              <li className="rounded-lg border bg-white p-3 text-sm text-slate-700">
                BSN number, if required for your application stage
              </li>
            </ul>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
              Always check the latest conditions directly with the bank before
              applying, since procedures and accepted documents can change.
            </p>
          </section>

          <section id="compare" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              What to compare before choosing a Dutch bank
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Monthly fees
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Check whether the account has student pricing, standard
                  account fees, or extra charges for a debit card.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  English support
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Review whether the website, app, and customer support are easy
                  to use in English.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  iDEAL access
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Make sure the account supports common Dutch online payment
                  methods used for shopping and services.
                </p>
              </div>

              <div className="rounded-xl border bg-white p-5">
                <h3 className="mb-2 font-semibold text-slate-900">
                  Registration method
                </h3>
                <p className="text-sm leading-6 text-slate-700 sm:text-base">
                  Some banks allow digital onboarding, while others may require
                  identity verification steps or additional checks.
                </p>
              </div>
            </div>
          </section>

          <section
            id="next-steps"
            className="scroll-mt-24 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-10 text-center sm:px-6 sm:py-12"
          >
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Ready to review your options?
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
              Once you know what documents you have and what features matter
              most, you can review the available account options and continue
              with the bank that fits your situation best.
            </p>

            <IngButton city="Delft" />

            <p className="mt-6 text-xs leading-5 text-slate-500 sm:text-sm">
              You will be redirected to the official registration page.
            </p>
          </section>

          <section id="faq" className="scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border bg-white p-5"
                >
                  <summary className="cursor-pointer list-none pr-6 font-semibold text-slate-900">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-700 sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
