// src/app/contact/thank-you/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message sent | Student Jobs Maastricht",
  description: "Thanks for your message — we’ll get back to you shortly.",
  alternates: { canonical: "https://studentjobsMaastricht.nl/contact/thank-you" },
};

export default function ContactThankYou() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl card">
        <h1 className="text-2xl md:text-3xl font-semibold">Thanks — message sent!</h1>
        <p className="mt-2 text-slate-700">
          We’ve received your message and will reply as soon as we can.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="/" className="btn btn-ghost">← Back to home</a>
          <a href="/jobs" className="btn btn-primary">Browse jobs</a>
        </div>
      </div>
    </section>
  );
}
