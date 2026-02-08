// src/app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Student Jobs Delft",
  description:
    "Questions about listings or partnerships? Send us a message and we'll get back to you.",
  alternates: { canonical: "https://studentjobsDelft.nl/contact" },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-semibold">Contact us</h1>
        <p className="mt-3 text-slate-700">
          Students, employers, partners — drop us a note. We usually reply within 1–2 business days.
        </p>

        <form
          action="/api/contact"
          method="POST"
          className="mt-6 card grid gap-4"
        >
          {/* spam honeypot (keep empty) */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Your name</label>
              <input
                id="name"
                name="name"
                required
                className="border rounded-xl px-4 py-3"
                placeholder="Jane Doe"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border rounded-xl px-4 py-3"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input
              id="subject"
              name="subject"
              className="border rounded-xl px-4 py-3"
              placeholder="Partnership / Job listing / Support"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              className="border rounded-xl px-4 py-3"
              placeholder="Tell us a bit more…"
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="/" className="btn btn-ghost">← Back</a>
            <button type="submit" className="btn btn-primary">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
}
