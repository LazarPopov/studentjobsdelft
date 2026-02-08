// src/app/employers/page.tsx
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import EmployerForm from "./EmployerForm";

export const metadata: Metadata = {
  title: "Are you a business? Feature your job | Student Jobs Delft",
  description:
    "Hire students in Delft. Feature your job on the homepage, category pages, and our weekly newsletter.",
  alternates: { canonical: "https://studentjobsdelft.nl/employers" },
};

export default function EmployersPage() {
  return (
    <>
      {/* JSON-LD: Organization + ContactPoint */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Student Jobs Delft",
            url: "https://studentjobsdelft.nl/",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: "info@studentjobsdelft.nl",
              areaServed: "NL",
              availableLanguage: ["en", "nl"],
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="section">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-5xl font-semibold">
              Are you a business? Feature your job
            </h1>
            <BackButton />
          </div>
          <p className="mt-3 text-lg text-slate-700">
            Reach active students in Delft. Get qualified applicants fast via homepage & category placement, plus our weekly newsletter.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#submit" className="btn btn-primary" data-gtm-event="cta_business">
              List a job
            </a>
          </div>
        </div>
      </section>


      {/* Process steps */}
      <section className="section-alt">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="card">
              <div className="text-sm text-slate-600">Step 1</div>
              <div className="mt-1 font-semibold">Choose a tier</div>
              <p className="mt-2 text-sm text-slate-700">
                Pick Basic, Featured, or Premium. All plans run for 30 days.
              </p>
            </div>
            <div className="card">
              <div className="text-sm text-slate-600">Step 2</div>
              <div className="mt-1 font-semibold">We’ll contact you</div>
              <p className="mt-2 text-sm text-slate-700">
                A coordinator confirms details and timeline (usually same day).
              </p>
            </div>
            <div className="card">
              <div className="text-sm text-slate-600">Step 3</div>
              <div className="mt-1 font-semibold">List the job</div>
              <p className="mt-2 text-sm text-slate-700">
                Submit your role below. We review every posting before it goes live.
              </p>
            </div>
            <div className="card">
              <div className="text-sm text-slate-600">Step 4</div>
              <div className="mt-1 font-semibold">Invoice & go live</div>
              <p className="mt-2 text-sm text-slate-700">
                We send your invoice and publish the listing. Featured tiers get priority placement.
              </p>
            </div>
          </div>
          
        </div>



        
      </section>

      {/* Submit form */}
      <section id="submit" className="section-alt">
        <div className="mx-auto max-w-3xl card">
          <h2 className="text-2xl md:text-3xl font-semibold">Submit your job</h2>
          <p className="mt-2 text-slate-700 text-sm">
            We review every role before it goes live (usually same day).
          </p>
          {/* The form includes the selectable pricing radio-cards and captures the chosen plan */}
          <EmployerForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold">FAQ for employers</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card">
              <div className="font-semibold">How fast will my job go live?</div>
              <p className="mt-2 text-sm text-slate-700">
                Most roles are reviewed same day. Featured listings are prioritized.
              </p>
            </div>
            <div className="card">
              <div className="font-semibold">Can I link to my own site?</div>
              <p className="mt-2 text-sm text-slate-700">
                Yes. Add an external apply URL and candidates will go directly to your website or ATS.
              </p>
            </div>
            <div className="card">
              <div className="font-semibold">Do you screen candidates?</div>
              <p className="mt-2 text-sm text-slate-700">
                We publish the role and route applications to you. On request we can pre-filter basic criteria.
              </p>
            </div>
            <div className="card">
              <div className="font-semibold">How long does a listing run?</div>
              <p className="mt-2 text-sm text-slate-700">
                All plans run 30 days. You can request an extension anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
