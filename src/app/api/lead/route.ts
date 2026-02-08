// src/app/api/lead/route.ts  (newsletter/signup endpoint to match your style)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  // Honeypot
  if (form.get("website")) {
    return NextResponse.redirect(new URL("/thank-you?type=newsletter", req.url), { status: 303 });
  }

  const payload = {
    name: String(form.get("name") || ""),
    email: String(form.get("email") || ""),
    city: String(form.get("city") || "Maastricht"),
    submittedAt: new Date().toISOString(),
  };

  // TODO: send to CRM/email/DB
  console.log("[NEWSLETTER_LEAD]", payload);

  return NextResponse.redirect(new URL("/thank-you?type=newsletter", req.url), { status: 303 });
}
