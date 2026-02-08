// src/middleware.ts — optional: force canonical apex domain (no-www) & HTTPS
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CANONICAL_HOST = "studentjobsdelft.nl";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const isProd = process.env.NODE_ENV === "production";
  const needsHostFix = url.hostname === `www.${CANONICAL_HOST}`;
  const needsHttps = isProd && url.protocol !== "https:";

  if (needsHostFix || needsHttps) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/health|favicon\\.ico).*)"],
};
