// src/components/JobApplyForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type JobApplyFormProps = {
  jobSlug: string;
  jobTitle?: string;
  orgName?: string;
  city: string; // not shown, only sent
  redirectTo?: string;
};

export default function JobApplyForm({
  jobSlug,
  jobTitle,
  orgName,
  city,
  redirectTo,
}: JobApplyFormProps) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [consentThisAd, setConsentThisAd] = useState(false);
  const [consentSimilarAds, setConsentSimilarAds] = useState(false);

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (!consentThisAd) {
      setErr("Please give consent to process your application for this job.");
      return;
    }

    if (!phone.trim()) {
      setErr("Please enter your phone number.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("jobSlug", jobSlug);
      if (jobTitle) form.append("jobTitle", jobTitle);
      if (orgName) form.append("orgName", orgName);
      form.append("city", (city || "maastricht").toLowerCase());

      form.append("firstName", firstName);
      form.append("familyName", familyName);
      form.append("email", email);
      form.append("phone", phone.trim());
      if (message) form.append("message", message);

      form.append("consentThisAd", String(consentThisAd));
      form.append("consentSimilarAds", String(consentSimilarAds));

      if (cvFile) {
        form.append("cv", cvFile, cvFile.name);
      }

      const res = await fetch("/api/job-apply", {
        method: "POST",
        body: form,
      });

      const data = (await res.json().catch(() => null)) as any;

      if (!res.ok) {
        setErr(data?.error || "Something went wrong. Please try again.");
        return;
      }

      setOk("Application received. We will contact you soon.");
      setFirstName("");
      setFamilyName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCvFile(null);
      setConsentThisAd(false);
      setConsentSimilarAds(false);

      if (redirectTo) router.push(redirectTo);
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 card p-5 max-w-full overflow-hidden">
      <h2 className="text-xl font-semibold">Apply</h2>
      <p className="mt-1 text-sm text-slate-700">
        Your application will be saved with the job and city automatically.
      </p>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3 max-w-full">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">First name</span>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="First name"
              autoComplete="given-name"
            />
          </label>

          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Family name</span>
            <input
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
              className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Family name"
              autoComplete="family-name"
            />
          </label>
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 min-w-0">
          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="you@email.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <label className="grid gap-1 min-w-0">
            <span className="text-sm font-medium">Phone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="+31 6..."
              autoComplete="tel"
              inputMode="tel"
            />
          </label>
        </div>

        <label className="grid gap-1 min-w-0">
          <span className="text-sm font-medium">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Availability, experience, languages, etc."
          />
        </label>

        <label className="grid gap-1 min-w-0">
          <span className="text-sm font-medium">CV (optional)</span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            className="w-full min-w-0 rounded-xl border border-slate-300 px-3 py-2 bg-white"
          />
          <span className="text-xs text-slate-500">PDF, DOC, DOCX</span>
        </label>

        <div className="grid gap-2 min-w-0">
          <label className="flex items-start gap-2 text-sm text-slate-700 min-w-0">
            <input
              type="checkbox"
              checked={consentThisAd}
              onChange={(e) => setConsentThisAd(e.target.checked)}
              className="mt-1 shrink-0"
            />
            <span className="min-w-0">
              I consent to processing my details for this job application and sharing them with the employer.
            </span>
          </label>

          <label className="flex items-start gap-2 text-sm text-slate-700 min-w-0">
            <input
              type="checkbox"
              checked={consentSimilarAds}
              onChange={(e) => setConsentSimilarAds(e.target.checked)}
              className="mt-1 shrink-0"
            />
            <span className="min-w-0">I consent to being contacted about similar job ads.</span>
          </label>
        </div>

        {err && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {err}
          </div>
        )}
        {ok && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
            {ok}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send application"}
        </button>
      </form>
    </section>
  );
}
