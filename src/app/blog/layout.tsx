// src/app/blog/layout.tsx
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

const CANONICAL = "https://studentjobsmaastricht.nl/blog";
const OG_IMAGE_URL = "https://studentjobsmaastricht.nl/blog/maastricht-bridge.jpg";

export const metadata: Metadata = {
  title: {
    default: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
    template: "%s | Student Jobs Maastricht",
  },
  description:
    "Maastricht student job guides for 2026: English-friendly part-time jobs, pay, contracts, permits, CV tips, and where to apply fast.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
    description:
      "Guides on Maastricht student jobs: English-speaking roles, wages, contracts, permits, and quick application tactics.",
    url: CANONICAL,
    type: "website",
    locale: "en_NL",
    siteName: "Student Jobs Maastricht",
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: "Maastricht bridge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maastricht Student Jobs Blog (2026) | Student Jobs Maastricht",
    description:
      "Find English-friendly student jobs in Maastricht: pay, contracts, permits, and fast apply tips.",
    images: [OG_IMAGE_URL],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 border-b flex items-center justify-between">
        <BackButton />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Blog</h1>
          <p className="text-xs text-slate-600">
            Maastricht student jobs, pay, contracts, and English-friendly work.
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
