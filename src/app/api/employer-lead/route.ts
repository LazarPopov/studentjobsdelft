// src/app/api/employer-lead/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { uploadLogo } from "@/lib/storage";
import { sendJobSubmissionNotification, sendEmployerConfirmation } from "@/lib/email";
import type { EmployerJobSubmission } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot
    if (form.get("website")) {
      return NextResponse.json(
        { success: true, message: "Job submitted successfully" },
        { status: 200 }
      );
    }

    // ✅ Read selected plan from the form
    const plan = String(form.get("plan") || "basic");
    const plan_price_eur = String(form.get("plan_price_eur") || "").trim() || undefined;

    const company = String(form.get("company") || "").trim();
    const contact_name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const job_title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const logoFile = form.get("logo") as File | null;

    if (!company || !contact_name || !email || !job_title || !description) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill out all required fields." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    let logoUrl: string | undefined;
    if (logoFile && logoFile instanceof File && logoFile.size > 0 && logoFile.name !== "undefined") {
      try {
        const arrayBuffer = await logoFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        logoUrl = await uploadLogo(buffer, logoFile.name, logoFile.type, company);
      } catch (uploadError) {
        console.error("[LOGO_UPLOAD_ERROR]", uploadError);
        return NextResponse.json(
          { error: uploadError instanceof Error ? uploadError.message : "Failed to upload logo" },
          { status: 400 }
        );
      }
    }

    // Prepare the submission data including pricing plan
    const submission: EmployerJobSubmission = {
      company,
      contact_name,
      email,
      phone: String(form.get("phone") || "").trim() || undefined,
      job_title,
      employment_type: String(form.get("employmentType") || "PART_TIME"),
      category: String(form.get("category") || "hospitality"),
      city: String(form.get("city") || "Maastricht"),
      area: String(form.get("area") || "").trim() || undefined,
      region: String(form.get("region") || "Maastricht"),
      base_salary_min: form.get("baseSalaryMin")
        ? parseFloat(String(form.get("baseSalaryMin")))
        : undefined,
      base_salary_max: form.get("baseSalaryMax")
        ? parseFloat(String(form.get("baseSalaryMax")))
        : undefined,
      description,
      english_friendly: form.get("englishFriendly") === "on",
      external_url: String(form.get("externalUrl") || "").trim() || undefined,
      logo_url: logoUrl,
      logo_alt: String(form.get("logoAlt") || "").trim() || undefined,
      plan,
      plan_price_eur,
      status: "pending",
    };

    const { data, error } = await supabase
      .from("employer_job_submissions")
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error("[EMPLOYER_LEAD_ERROR]", error);
      let errorMessage = "Failed to submit job. Please try again.";
      if (error.message?.includes("unique")) {
        errorMessage =
          "This job has already been submitted. Please contact us if you need to make changes.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    console.log("[EMPLOYER_LEAD_SUCCESS]", { id: data.id, company, job_title, plan, plan_price_eur });

    // Include plan info in notifications
    sendJobSubmissionNotification({ submission: { ...submission }, submissionId: data.id }).catch(
      (error) => console.error("[EMAIL_NOTIFICATION_ERROR]", error)
    );

    sendEmployerConfirmation({ submission: { ...submission }, submissionId: data.id }).catch(
      (error) => console.error("[EMAIL_CONFIRMATION_ERROR]", error)
    );

    return NextResponse.json(
      { success: true, message: "Job submitted successfully", id: data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[EMPLOYER_LEAD_EXCEPTION]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
