"use client";
import { useState, useEffect } from "react";

const ING_LINKS = [
  "https://www.ing.nl/en/personal/payments/you-are-invited?invitationId=6ddbcc01-2661-436c-b532-b1a8b470eac9",
  "https://www.ing.nl/en/personal/payments/you-are-invited?invitationId=6ddbcc01-2661-436c-b532-b1a8b470eac9",
  "https://www.ing.nl/en/personal/payments/you-are-invited?invitationId=f101fd07-7c9f-4a10-88f5-a036e929ac44",
  "https://www.ing.nl/en/personal/payments/you-are-invited?invitationId=5f917555-8878-490d-87c5-83b07d5c2833",
  "https://www.ing.nl/en/personal/payments/you-are-invited?invitationId=c9d4f238-081c-4d60-bd4d-d5789e2d5fb0"
];

export default function IngButton({ city }: { city: string }) {
  const [url, setUrl] = useState(ING_LINKS[0]);

  useEffect(() => {
    setUrl(ING_LINKS[Math.floor(Math.random() * ING_LINKS.length)]);
  }, []);

  const handleTrackClick = () => {
    console.log(`ING Referral Clicked | City: ${city} | URL: ${url}`);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "ing_referral_click", {
        event_category: "Affiliate",
        event_label: city,
        value: 50
      });
    }
  };

  return (
    <a
      href={url}
      onClick={handleTrackClick}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-orange-500 px-10 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600 active:scale-95"
    >
      Click the link to register for ING
    </a>
  );
}
