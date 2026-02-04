// src/app/api/job-apply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function toBool(v: FormDataEntryValue | null) {
  return String(v || "").toLowerCase() === "true";
}

const CV_BUCKET = "job-applications";

export async function POST(req: NextRequest) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const jobSlug = String(form.get("jobSlug") || "").trim();
  const jobTitle = String(form.get("jobTitle") || "").trim() || null;
  const orgName = String(form.get("orgName") || "").trim() || null;
  const city = String(form.get("city") || "amsterdam").trim().toLowerCase();

  const firstName = String(form.get("firstName") || "").trim();
  const lastName = String(form.get("familyName") || "").trim();
  const email = String(form.get("email") || "").trim();
  const phone = String(form.get("phone") || "").trim() || null;
  const message = String(form.get("message") || "").trim() || null;

  const consentThisAd = toBool(form.get("consentThisAd"));
  const consentSimilarAds = toBool(form.get("consentSimilarAds"));

  if (!jobSlug) return NextResponse.json({ error: "Missing jobSlug" }, { status: 400 });
  if (!firstName) return NextResponse.json({ error: "Missing first name" }, { status: 400 });
  if (!lastName) return NextResponse.json({ error: "Missing family name" }, { status: 400 });
  if (!email || !isEmail(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (!consentThisAd)
    return NextResponse.json({ error: "Consent for this job is required" }, { status: 400 });

  const cv = form.get("cv");
  let cvPath: string | null = null;
  let cvFilename: string | null = null;
  let cvMime: string | null = null;

  if (cv && typeof cv !== "string") {
    const file = cv as File;

    const maxBytes = 8 * 1024 * 1024; // 8MB
    if (file.size > maxBytes) {
      return NextResponse.json({ error: "CV too large (max 8MB)" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^\w.\-() ]+/g, "_");
    const ts = new Date().toISOString().replace(/[:.]/g, "");
    const random = Math.random().toString(16).slice(2);
    cvPath = `${jobSlug}/${ts}_${random}_${safeName}`;
    cvFilename = safeName;
    cvMime = file.type || "application/octet-stream";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await supabaseAdmin.storage
      .from(CV_BUCKET)
      .upload(cvPath, buffer, {
        contentType: cvMime,
        upsert: false,
      });

    if (upload.error) {
      return NextResponse.json({ error: upload.error.message }, { status: 500 });
    }
  }

  const fullName = `${firstName} ${lastName}`.trim();

  const insertRow = {
    job_slug: jobSlug,
    job_title: jobTitle,
    org_name: orgName,
    city,

    first_name: firstName,
    last_name: lastName,
    name: fullName, // keeps your old column useful
    email,
    phone,
    message,

    consent: consentThisAd, // keeps your old column useful
    consent_this_ad: consentThisAd,
    consent_similar_ads: consentSimilarAds,

    cv_path: cvPath,
    cv_filename: cvFilename,
    cv_mime: cvMime,

    source_url: req.headers.get("referer") || null,
  };

  const { error } = await supabaseAdmin.from("job_applications").insert(insertRow);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
