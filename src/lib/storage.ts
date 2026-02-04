// src/lib/storage.ts
import { supabase } from "./supabase";

const LOGO_BUCKET = "employer-logos";
const CV_BUCKET = "job_applications";

const LOGO_ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const LOGO_MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const CV_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const CV_MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

function safeSlug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 60);
}

function safeFilename(name: string) {
  const cleaned = name.replace(/[^\w.\-() ]+/g, "_");
  return cleaned.length > 120 ? cleaned.slice(-120) : cleaned;
}

export async function uploadLogo(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  companyName: string
): Promise<string> {
  if (!LOGO_ALLOWED_TYPES.includes(mimeType)) {
    throw new Error(`Invalid file type. Allowed: ${LOGO_ALLOWED_TYPES.join(", ")}`);
  }

  if (fileBuffer.length > LOGO_MAX_FILE_SIZE) {
    throw new Error(`File size must be less than ${LOGO_MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const timestamp = Date.now();
  const sanitizedCompanyName = safeSlug(companyName).substring(0, 30) || "company";
  const fileExt = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${sanitizedCompanyName}-${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage.from(LOGO_BUCKET).upload(fileName, fileBuffer, {
    contentType: mimeType,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("[STORAGE_UPLOAD_ERROR]", error);
    throw new Error("Failed to upload logo. Please try again.");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(data.path);

  return publicUrl;
}

export async function uploadCV(
  fileBuffer: Buffer,
  originalName: string,
  mimeType: string,
  jobSlug: string,
  firstName: string,
  lastName: string
): Promise<{ path: string; filename: string; mime: string }> {
  if (!CV_ALLOWED_TYPES.includes(mimeType)) {
    throw new Error("Invalid CV type. Allowed: PDF, DOC, DOCX.");
  }

  if (fileBuffer.length > CV_MAX_FILE_SIZE) {
    throw new Error(`CV must be less than ${CV_MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const ts = new Date().toISOString().replace(/[:.]/g, "");
  const rand = Math.random().toString(16).slice(2);
  const safeJob = safeSlug(jobSlug) || "job";
  const safePerson = safeSlug(`${firstName}-${lastName}`) || "candidate";

  const fileExt = originalName.split(".").pop()?.toLowerCase() || "pdf";
  const filename = safeFilename(originalName);
  const path = `${safeJob}/${ts}_${rand}_${safePerson}_${fileExt}_${filename}`;

  const { error } = await supabase.storage.from(CV_BUCKET).upload(path, fileBuffer, {
    contentType: mimeType || "application/octet-stream",
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("[CV_UPLOAD_ERROR]", error);
    throw new Error(error.message || "Failed to upload CV.");
  }

  return { path, filename, mime: mimeType || "application/octet-stream" };
}

export async function deleteLogo(url: string): Promise<void> {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];

    const { error } = await supabase.storage.from(LOGO_BUCKET).remove([fileName]);

    if (error) console.error("[STORAGE_DELETE_ERROR]", error);
  } catch (err) {
    console.error("[STORAGE_DELETE_ERROR]", err);
  }
}
