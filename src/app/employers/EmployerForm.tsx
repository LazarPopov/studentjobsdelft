// src/app/employers/EmployerForm.tsx
"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

const CATEGORIES = [
  { key: "hospitality", label: "Hospitality" },
  { key: "retail", label: "Retail" },
  { key: "delivery", label: "Delivery" },
  { key: "logistics", label: "Logistics" },
  { key: "tutoring", label: "Tutoring" },
  { key: "events", label: "Events" },
  { key: "sales", label: "Sales" },
  { key: "fieldwork", label: "Fieldwork" },
];

const EMPLOYMENT = [
  "PART_TIME",
  "FULL_TIME",
  "CONTRACTOR",
  "TEMPORARY",
  "INTERN",
  "VOLUNTEER",
] as const;

interface FieldErrors {
  [key: string]: string;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// ✅ Pricing plans (all 30 days). Put your real numbers for X/Y when ready.
const PRICING_PLANS = [
  {
    key: "basic",
    name: "Basic",
    price: 25,
    label: "€25",
    perks: [
      "Appears in category & search",
      "External apply link (ATS/website)",
      "Company logo on card",
      "Standard moderation (within 24h)",
    ],
  },
  {
    key: "featured",
    name: "Featured",
    price: "120",
    label: "€120",
    badge: "Most Purchased",
    perks: [
      "Homepage Featured row (rotates)",
      "Pinned in category",
      "1× Newsletter inclusion",
      "Priority moderation (same-day)",
      "Performance snapshot (7 & 14 days)",
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: "",
    label: "€300",
    perks: [
      "Homepage Featured row (higher rotation)",
      "2× Newsletter inclusions (weeks 1 & 3)",
      "Social post shout-out",
      "Re-feature boost if under-performing",
      "Invoice/Bulk support (multiple roles)",
    ],
  },
] as const;

export default function EmployerForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // ✅ plan selection (defaults to Featured - most popular)
  const [selectedPlan, setSelectedPlan] =
    useState<"basic" | "featured" | "premium">("featured");

  const validateFile = (file: File): string => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`;
    }
    return "";
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogoFile(null);
      setLogoPreview(null);
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated.logo;
        return updated;
      });
      return;
    }

    const error = validateFile(file);
    if (error) {
      setFieldErrors((prev) => ({ ...prev, logo: error }));
      setLogoFile(null);
      setLogoPreview(null);
      e.target.value = ""; // Reset file input
      return;
    }

    setLogoFile(file);
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated.logo;
      return updated;
    });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "company":
        if (!value.trim()) return "Company name is required";
        if (value.trim().length < 2) return "Company name must be at least 2 characters";
        if (value.trim().length > 100) return "Company name must be less than 100 characters";
        break;
      case "name":
        if (!value.trim()) return "Contact name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        if (value.trim().length > 100) return "Name must be less than 100 characters";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        break;
      case "phone":
        if (value && value.length > 0 && value.length < 8) return "Please enter a valid phone number";
        if (value.length > 20) return "Phone number is too long";
        break;
      case "title":
        if (!value.trim()) return "Job title is required";
        if (value.trim().length < 3) return "Job title must be at least 3 characters";
        if (value.trim().length > 150) return "Job title must be less than 150 characters";
        break;
      case "description":
        if (!value.trim()) return "Job description is required";
        if (value.trim().length < 50) return "Description must be at least 50 characters";
        if (value.trim().length > 5000) return "Description must be less than 5000 characters";
        break;
      case "baseSalaryMin":
      case "baseSalaryMax":
        if (value && parseFloat(value) < 0) return "Salary cannot be negative";
        if (value && parseFloat(value) > 999) return "Please enter a valid hourly rate";
        break;
      case "externalUrl":
        if (value && !value.startsWith("http://") && !value.startsWith("https://")) {
          return "URL must start with http:// or https://";
        }
        break;
    }
    return "";
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFieldErrors((prev) => {
      const updated = { ...prev };
      if (error) {
        updated[name] = error;
      } else {
        delete updated[name];
      }
      return updated;
    });
  };

  const validateForm = (formData: FormData): boolean => {
    const errors: FieldErrors = {};

    // Validate all required fields
    const company = formData.get("company") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const baseSalaryMin = formData.get("baseSalaryMin") as string;
    const baseSalaryMax = formData.get("baseSalaryMax") as string;

    const companyError = validateField("company", company);
    if (companyError) errors.company = companyError;

    const nameError = validateField("name", name);
    if (nameError) errors.name = nameError;

    const emailError = validateField("email", email);
    if (emailError) errors.email = emailError;

    const titleError = validateField("title", title);
    if (titleError) errors.title = titleError;

    const descriptionError = validateField("description", description);
    if (descriptionError) errors.description = descriptionError;

    // Validate salary range
    if (baseSalaryMin && baseSalaryMax) {
      const min = parseFloat(baseSalaryMin);
      const max = parseFloat(baseSalaryMax);
      if (min > max) {
        errors.baseSalaryMax = "Maximum salary must be greater than minimum";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const formData = new FormData(e.currentTarget);

      // ✅ Include selected plan in submission
      formData.append("plan", selectedPlan);
      const planMeta = PRICING_PLANS.find((p) => p.key === selectedPlan);
      if (planMeta) {
        const price = planMeta.price;
        if (typeof price === "number") {
          formData.append("plan_price_eur", String(price));
        } else {
          // Keep placeholder X/Y if you haven't set numbers yet
          formData.append("plan_price_eur", String(price));
        }
      }

      // ✅ Add hardcoded region
      formData.append("region", "Maastricht");

      // Add logo file if present
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      // Client-side validation
      if (!validateForm(formData)) {
        setToast({
          type: "error",
          message: "Please fix the errors in the form before submitting",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/employer-lead", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit job. Please try again.");
      }

      // Success!
      setToast({
        type: "success",
        message: "Job submitted successfully! We'll review it shortly.",
      });
      formRef.current?.reset();
      setFieldErrors({});
      setLogoFile(null);
      setLogoPreview(null);
      setSelectedPlan("featured");
    } catch (err) {
      setToast({
        type: "error",
        message: err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="mt-6 grid gap-6">
        {/* ✅ Selectable pricing (radio-cards) */}
        <fieldset className="grid gap-4 md:grid-cols-3">
          {PRICING_PLANS.map((p) => (
            <label
              key={p.key}
              className={`relative block rounded-3xl border p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                selectedPlan === p.key
                  ? `ring-2 ${
                      p.key === "featured"
                        ? "ring-purple-500"
                        : "ring-emerald-500"
                    } shadow-lg`
                  : ""
              } ${
                p.key === "featured"
                  ? "border-purple-700 border-2 shadow-lg"
                  : ""
              }`}
            >
              {p.key === "featured" && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-700 text-white shadow-md">
                    {p.badge}
                  </span>
                </div>
              )}

              <input
                type="radio"
                name="plan_radio"
                value={p.key}
                checked={selectedPlan === p.key}
                onChange={() =>
                  setSelectedPlan(p.key as "basic" | "featured" | "premium")
                }
                className="sr-only"
              />
              <div className="text-sm text-slate-600">{p.name}</div>
              <div className="mt-1 text-2xl font-semibold">{p.label}</div>
              <div className="text-slate-500 text-sm">30-day listing</div>
              <ul className="mt-3 text-slate-700 text-sm space-y-2">
                {p.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
              <div className="mt-4">
                {selectedPlan === p.key ? (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 animate-fade-in">
                    <svg
                      className="w-4 h-4 animate-check-pop"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Selected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500 transition-opacity hover:opacity-70">
                    Click to select
                  </span>
                )}
              </div>
            </label>
          ))}
        </fieldset>

        {/* spam honeypot */}
        <input
          type="text"
          name="website"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              name="company"
              required
              disabled={isSubmitting}
              maxLength={100}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.company ? "border-red-500" : ""
              }`}
              placeholder="Your company"
            />
            {fieldErrors.company && (
              <p className="text-xs text-red-600">{fieldErrors.company}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Contact name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              required
              disabled={isSubmitting}
              maxLength={100}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.name ? "border-red-500" : ""
              }`}
              placeholder="Full name"
            />
            {fieldErrors.name && (
              <p className="text-xs text-red-600">{fieldErrors.name}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              disabled={isSubmitting}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.email ? "border-red-500" : ""
              }`}
              placeholder="you@company.com"
            />
            {fieldErrors.email && (
              <p className="text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Phone (optional)</label>
            <input
              name="phone"
              disabled={isSubmitting}
              type="tel"
              maxLength={20}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.phone ? "border-red-500" : ""
              }`}
              placeholder="+31 ..."
            />
            {fieldErrors.phone && (
              <p className="text-xs text-red-600">{fieldErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Job title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              required
              disabled={isSubmitting}
              maxLength={150}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.title ? "border-red-500" : ""
              }`}
              placeholder="e.g., Barista (Part-Time)"
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-600">{fieldErrors.title}</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Employment type <span className="text-red-500">*</span>
            </label>
            <select
              name="employmentType"
              required
              disabled={isSubmitting}
              className="border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500"
            >
              {EMPLOYMENT.map((e) => (
                <option key={e} value={e}>
                  {e.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              required
              disabled={isSubmitting}
              className="border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500"
            >
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              City <span className="text-red-500">*</span>
            </label>
            <input
              name="city"
              required
              defaultValue="Maastricht"
              disabled={isSubmitting}
              maxLength={100}
              className="border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Area / neighborhood (optional)
            </label>
            <input
              name="area"
              disabled={isSubmitting}
              maxLength={100}
              className="border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500"
              placeholder="Kralingen, Centrum, ..."
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Pay (min €/h)</label>
            <input
              name="baseSalaryMin"
              type="number"
              step="0.01"
              min="0"
              max="999"
              disabled={isSubmitting}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.baseSalaryMin ? "border-red-500" : ""
              }`}
              placeholder="e.g., 12.50"
            />
            {fieldErrors.baseSalaryMin && (
              <p className="text-xs text-red-600">
                {fieldErrors.baseSalaryMin}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Pay (max €/h)</label>
            <input
              name="baseSalaryMax"
              type="number"
              step="0.01"
              min="0"
              max="999"
              disabled={isSubmitting}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.baseSalaryMax ? "border-red-500" : ""
              }`}
              placeholder="e.g., 15.00"
            />
            {fieldErrors.baseSalaryMax && (
              <p className="text-xs text-red-600">
                {fieldErrors.baseSalaryMax}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              External apply URL (optional)
            </label>
            <input
              name="externalUrl"
              type="url"
              disabled={isSubmitting}
              onChange={handleFieldChange}
              className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
                fieldErrors.externalUrl ? "border-red-500" : ""
              }`}
              placeholder="https://…"
            />
            {fieldErrors.externalUrl && (
              <p className="text-xs text-red-600">{fieldErrors.externalUrl}</p>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Company Logo (optional)
              <span className="text-xs text-slate-500 ml-2">
                (Max 2MB, JPG/PNG/WebP)
              </span>
            </label>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept={ALLOWED_IMAGE_TYPES.join(",")}
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className={`
                    block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0
                    file:text-sm file:font-medium
                    file:bg-brand-50 file:text-brand-700
                    hover:file:bg-brand-100
                    file:cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.logo ? "text-red-600" : ""}
                  `}
                />
                {fieldErrors.logo && (
                  <p className="mt-1 text-xs text-red-600">
                    {fieldErrors.logo}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500">
                  Recommended: Square image, at least 200x200px
                </p>
              </div>
              {logoPreview && (
                <div className="relative h-20 w-20 rounded-xl border-2 border-slate-200 overflow-hidden bg-white">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Logo description (for accessibility)
            </label>
            <input
              name="logoAlt"
              disabled={isSubmitting}
              maxLength={200}
              className="border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500"
              placeholder="e.g., Acme Company logo"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">
            Job description <span className="text-red-500">*</span>
            <span className="text-xs text-slate-500 ml-2">
              (min 50 characters)
            </span>
          </label>
          <textarea
            name="description"
            required
            rows={6}
            minLength={50}
            maxLength={5000}
            disabled={isSubmitting}
            onChange={handleFieldChange}
            className={`border rounded-xl px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 ${
              fieldErrors.description ? "border-red-500" : ""
            }`}
            placeholder="Responsibilities, hours, requirements, how to apply…"
          />
          {fieldErrors.description && (
            <p className="text-xs text-red-600">{fieldErrors.description}</p>
          )}
          <p className="text-xs text-slate-500">
            You can paste plain text. We'll format it when publishing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="englishFriendly"
            type="checkbox"
            name="englishFriendly"
            disabled={isSubmitting}
            className="h-4 w-4 disabled:opacity-50"
          />
          <label htmlFor="englishFriendly" className="text-sm">
            English-friendly role
          </label>
        </div>

        <div className="mt-2">
          <button
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit job"
            )}
          </button>
          <span className="ml-3 text-xs text-slate-500">
            By submitting you agree to our publishing guidelines.
          </span>
        </div>
      </form>
    </>
  );
}
