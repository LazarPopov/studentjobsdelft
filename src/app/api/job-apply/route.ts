// src/app/api/job-apply/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { uploadCV } from "@/lib/storage";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function toBool(v: FormDataEntryValue | null) {
  return String(v || "").toLowerCase() === "true";
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot (optional)
    if (form.get("website")) return NextResponse.json({ ok: true }, { status: 200 });

    const job_slug = String(form.get("jobSlug") || "").trim();
    const job_title = String(form.get("jobTitle") || "").trim() || undefined;
    const org_name = String(form.get("orgName") || "").trim() || undefined;
    const city = String(form.get("city") || "delft").trim().toLowerCase();

    const first_name = String(form.get("firstName") || "").trim();
    const last_name = String(form.get("familyName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim() || undefined;
    const message = String(form.get("message") || "").trim() || undefined;

    const consent_this_ad = toBool(form.get("consentThisAd"));
    const consent_similar_ads = toBool(form.get("consentSimilarAds"));

    if (!job_slug) return NextResponse.json({ error: "Missing job slug." }, { status: 400 });
    if (!first_name) return NextResponse.json({ error: "Missing first name." }, { status: 400 });
    if (!last_name) return NextResponse.json({ error: "Missing family name." }, { status: 400 });
    if (!email || !isEmail(email))
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    if (!consent_this_ad)
      return NextResponse.json(
        { error: "Consent for this job application is required." },
        { status: 400 }
      );

    const cvFile = form.get("cv") as File | null;

    let cv_path: string | undefined;
    let cv_filename: string | undefined;
    let cv_mime: string | undefined;

    if (cvFile && cvFile instanceof File && cvFile.size > 0 && cvFile.name !== "undefined") {
      try {
        const arrayBuffer = await cvFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploaded = await uploadCV(
          buffer,
          cvFile.name,
          cvFile.type,
          job_slug,
          first_name,
          last_name
        );

        cv_path = uploaded.path;
        cv_filename = uploaded.filename;
        cv_mime = uploaded.mime;
      } catch (uploadError) {
        console.error("[CV_UPLOAD_ERROR]", uploadError);
        return NextResponse.json(
          { error: uploadError instanceof Error ? uploadError.message : "Failed to upload CV" },
          { status: 400 }
        );
      }
    }

    const name = `${first_name} ${last_name}`.trim();
    const consent = consent_this_ad;

    const insertRow = {
      job_slug,
      job_title,
      org_name,
      city,
      first_name,
      last_name,
      name,
      email,
      phone,
      message,
      consent,
      consent_this_ad,
      consent_similar_ads,
      cv_path,
      cv_filename,
      cv_mime,
      source_url: req.headers.get("referer") || undefined,
    };

    // IMPORTANT: do NOT .select().single() unless you also create a SELECT RLS policy.
    const { error } = await supabase.from("job_applications").insert([insertRow]);

    if (error) {
      console.error("[JOB_APPLY_ERROR]", error);
      return NextResponse.json(
        { error: error.message || "Failed to submit application. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[JOB_APPLY_EXCEPTION]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
