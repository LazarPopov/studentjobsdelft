"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Ad = {
  id: string;
  headline: string;
  description: string;
  cta: string;
  badge: string;
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

function getCityFromHostname(): string | null {
  if (typeof window === "undefined") return null;
  const host = window.location.hostname.toLowerCase().replace(/^www\./, "");
  if (!host.startsWith("studentjobs")) return null;

  const rawCity = host.split(".")[0].replace("studentjobs", "");
  return (
    CITY_LABELS[rawCity] ||
    (rawCity ? rawCity.charAt(0).toUpperCase() + rawCity.slice(1) : null)
  );
}

const trackEvent = (eventName: string, params: Record<string, any>) => {
  if (typeof window === "undefined") return;

  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
    return;
  }

  const dataLayer = (window as any).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: eventName, ...params });
  }
};

export default function PromoAd({
  placement = "general",
}: {
  placement?: string;
}) {
  const [activeAd, setActiveAd] = useState<Ad | null>(null);
  const lastImpressionKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const cityName = getCityFromHostname();
    const adPool: Ad[] = [];

    if (cityName) {
      adPool.push({
        id: "signaal_city_students",
        headline: `Find a student room in ${cityName}, faster.`,
        description: `Stop refreshing tabs. Get instant alerts for every new student listing in ${cityName} the second it goes live.`,
        cta: `Search ${cityName} Housing`,
        badge: "STUDENT FAVORITE",
      });

      adPool.push({
        id: "signaal_city_general",
        headline: `Be first for new rentals in ${cityName}.`,
        description: `Instant alerts and one place to search matching listings in ${cityName}, so you can reply before everyone else.`,
        cta: `Find Rentals in ${cityName}`,
        badge: "FAST ALERTS",
      });

      adPool.push({
        id: "signaal_nl_students",
        headline: "Beat the Dutch housing crisis.",
        description:
          "The smartest way for students to find studios and apartments across the Netherlands. One search, all listings.",
        cta: "Find a Room in NL",
        badge: "TOP RATED",
      });
    } else {
      adPool.push({
        id: "signaal_general",
        headline: "The fastest way to find rentals in the Netherlands.",
        description:
          "Get instant alerts and be the first to respond to new listings. Do not miss out on your next home.",
        cta: "Start Your Search",
        badge: "PROMO",
      });
    }

    const randomAd = adPool[Math.floor(Math.random() * adPool.length)];
    setActiveAd(randomAd);
  }, [placement]);

  useEffect(() => {
    if (!activeAd) return;

    const locationName = getCityFromHostname() || "Netherlands";
    const impressionKey = `${placement}:${activeAd.id}:${locationName}`;
    if (lastImpressionKeyRef.current === impressionKey) return;
    lastImpressionKeyRef.current = impressionKey;

    trackEvent("view_promotion", {
      items: [
        {
          promotion_id: activeAd.id,
          promotion_name: activeAd.headline,
          creative_name: "PromoAd",
          creative_slot: placement,
          location_id: locationName,
        },
      ],
    });
  }, [activeAd, placement]);

  if (!activeAd) return null;

  const locationName = getCityFromHostname() || "Netherlands";

  return (
    <div className="my-8 flex justify-center w-full px-4">
      <a
        href="https://go.signaal.app/studentjobsnl"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-xl"
        data-gtm-event="ad_click"
        data-gtm-label={activeAd.id}
        data-gtm-placement={placement}
        onClick={() => {
          trackEvent("select_promotion", {
            items: [
              {
                promotion_id: activeAd.id,
                promotion_name: activeAd.headline,
                creative_name: "PromoAd",
                creative_slot: placement,
                location_id: locationName,
              },
            ],
          });
        }}
      >
        <div className="absolute top-0 right-0 rounded-bl-lg bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
          {activeAd.badge}
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-100 shadow-inner">
            <Image
              src="/signaal.png"
              alt="Signaal.app"
              width={56}
              height={56}
              className="object-contain transition-transform group-hover:scale-110"
            />
          </div>

          <div className="flex-1 text-left">
            <div className="text-xs font-bold uppercase tracking-tight text-blue-600 mb-1">
              Sponsored by Signaal.app
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 md:text-2xl leading-tight">
              {activeAd.headline}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
              {activeAd.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-blue-600">
                {activeAd.cta}
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 italic">
                  Use code:
                </span>
                <span className="rounded-md border-2 border-dashed border-blue-200 bg-blue-50 px-2 py-1 text-sm font-mono font-bold text-blue-700">
                  ASJOBS
                </span>
                <span className="text-sm font-bold text-blue-700">(10% off)</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}