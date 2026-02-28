// src/components/PromoAd.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Ad = {
  id: string;
  url: string;
  imgSrc: string;
  sponsorText: string;
  headline: string;
  description: string;
  discountText: string;
  altText: string;
};

const CITY_LABELS: Record<string, string> = {
  groningen: "Groningen",
  amsterdam: "Amsterdam",
  rotterdam: "Rotterdam",
  eindhoven: "Eindhoven",
  delft: "Delft",
  enschede: "Enschede",
  maastricht: "Maastricht",
  leeuwarden: "Leeuwarden",
  breda: "Breda",
  utrecht: "Utrecht",
  leiden: "Leiden",
  tilburg: "Tilburg",
};

function titleCaseCity(raw: string): string {
  if (!raw) return "";
  if (CITY_LABELS[raw.toLowerCase()]) return CITY_LABELS[raw.toLowerCase()];
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function getCityFromHostname(hostname: string): string | null {
  // Examples:
  // studentjobsgroningen.nl
  // www.studentjobsamsterdam.nl
  // studentjobsmaastricht.vercel.app (fallback: null)
  const host = (hostname || "").toLowerCase().replace(/^www\./, "");

  if (!host.startsWith("studentjobs")) return null;

  const firstPart = host.split(".")[0]; // studentjobsgroningen
  const rawCity = firstPart.replace(/^studentjobs/, "").trim();

  if (!rawCity) return null;

  // If you ever use hyphenated cities later (studentjobs-thehague.nl), support it
  const cleaned = rawCity.replace(/[^a-z-]/g, "");
  if (!cleaned) return null;

  return titleCaseCity(cleaned.replace(/-/g, " "));
}

function buildAds(cityName: string | null): Ad[] {
  const base: Omit<Ad, "id" | "headline" | "altText"> = {
    url: "https://go.signaal.app/studentjobsnl",
    imgSrc: "/signaal.png",
    sponsorText: "Sponsored by Signaal.app",
    description:
      "Find your next rental in the Netherlands with instant alerts and one place to search all matching listings.",
    discountText: "Use code ASJOBS for a 10% discount",
  };

  const generalAd: Ad = {
    id: "signaal_ad_general_v1",
    headline: "Fastest way to find rentals in the Netherlands.",
    altText: "Signaal App, find rentals in the Netherlands",
    ...base,
  };

  if (!cityName) return [generalAd];

  const cityAd: Ad = {
    id: "signaal_ad_city_v1",
    headline: `Fastest way to find rentals in ${cityName}.`,
    altText: `Signaal App, find rentals in ${cityName}`,
    ...base,
  };

  return [generalAd, cityAd];
}

export default function PromoAd({ placement = "general" }: { placement?: string }) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const cityName = getCityFromHostname(window.location.hostname);
    const ADS = buildAds(cityName);

    const randomAd = ADS[Math.floor(Math.random() * ADS.length)];
    setAd(randomAd);
    setMounted(true);
  }, []);

  if (!mounted || !ad) return null;

  return (
    <div className="my-6 flex justify-center w-full">
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-2xl rounded-2xl border bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow group"
        data-gtm-event="ad_click"
        data-gtm-label={ad.id}
        data-gtm-placement={placement}
      >
        <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          {ad.sponsorText}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
            <Image src={ad.imgSrc} alt={ad.altText} fill className="object-contain p-2" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <h4 className="font-bold text-slate-900 text-lg md:text-xl group-hover:text-blue-600 transition-colors">
              {ad.headline}
            </h4>
            <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
              {ad.description}
            </p>

            <div className="mt-4 inline-block bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold px-4 py-2 rounded-lg">
              {ad.discountText}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}