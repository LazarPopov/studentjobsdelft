// src/data/jobs.ts
// Central job data + helpers (Amsterdam). Auto-builds `shortDescrition` to include per-gig/per-sale amount + a concise text from `descriptionHtml`.
// Also adds a place for a per-listing logo (logoUrl/logoAlt).

// src/data/jobs.ts — add an external URL for outbound clicks
export type Employment =
  | "PART_TIME"
  | "FULL_TIME"
  | "CONTRACTOR"
  | "TEMPORARY"
  | "INTERN"
  | "VOLUNTEER";

export type JobRecord = {
  slug: string;
  title: string;
  orgName: string;
  descriptionHtml: string;
  shortDescrition: string;
  employmentType: Employment;
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  currency?: "EUR";
  payUnit?: "HOUR" | "MONTH";
  addressLocality: "Amsterdam";
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
  area?: string;
  englishFriendly?: boolean;
  DUO?: boolean;
  workHours?: string;
  datePosted: string;
  validThrough?: string;
  categories: ("delivery" | "sales" | "hospitality" | "retail" | "tutoring" | "events" | "fieldwork")[];
  featured?: boolean;

  // NEW: clicking the card can go to this website if provided
  externalUrl?: string;

  // existing logo fields (already added earlier)
  perGigAmount?: number;
  perSaleAmount?: number;
  perGigAmountText?: string;
  perSaleAmountText?: string;
  logoUrl?: string;
  logoAlt?: string;
  heroImageUrl?: string; // example: "/blog/some-image.jpg" or "/jobs/pepperminds.jpg"
  heroImageAlt?: string;
  brandColor?: string; // example: "#E11D48" (remove it and the site uses default styling)
};

// ---- helpers to build shortDescrition from descriptionHtml + amounts ----
function stripHtml(html: string): string {
  // quick HTML -> text (collapse whitespace)
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstSentence(text: string, maxLen = 180): string {
  const dot = text.indexOf(".");
  if (dot !== -1 && dot < maxLen) return text.slice(0, dot + 1);
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;
}

function money(n?: number) {
  return typeof n === "number" && n > 0 ? `€${n.toString()}` : null;
}

function makeShortDescription(job: Partial<JobRecord>): string {
  const parts: string[] = [];

  // Prefer numeric amounts; fall back to text labels if provided.
  if (typeof job.perGigAmount === "number" && job.perGigAmount > 0) {
    parts.push(`${money(job.perGigAmount)} per gig`);
  } else if (job.perGigAmountText) {
    parts.push(`${job.perGigAmountText}`);
  }

  if (typeof job.perSaleAmount === "number" && job.perSaleAmount > 0) {
    parts.push(`${money(job.perSaleAmount)} per sale`);
  } else if (job.perSaleAmountText) {
    parts.push(`${job.perSaleAmountText}`);
  }

  const desc = firstSentence(stripHtml(job.descriptionHtml || ""));
  if (desc) parts.push(desc);

  return parts.join(" — ");
}

// ---- Define raw jobs (without shortDescrition), then map to final JOBS with computed shortDescrition ----
type RawJob = Omit<JobRecord, "shortDescrition">;

const RAW_JOBS: RawJob[] = [
  {
  slug: "thuisbezorgd-takeaway-courier-netherlands",
  title: "Food Delivery",
  orgName: "Thuisbezorgd.nl",
descriptionHtml: "<p><strong>Are you tired of endless study sessions and sitting behind your laptop all day?</strong> This job is your perfect excuse to get outside, stay active, and earn solid money while exploring your city! Join <strong>Thuisbezorgd.nl</strong> as a Food Delivery Courier — hop on your bike, scooter, or car, and deliver happiness (and food) straight to hungry customers.</p><ul><li><strong>Flexible schedule</strong> — choose your own working hours so you can balance lectures, gym time, and parties 🍕🚴‍♂️</li><li><strong>Reliable income</strong> — hourly pay + tips + bonuses (and yes, rainy-day deliveries pay even better 😉)</li><li><strong>DUO-friendly</strong> — work enough hours and you can qualify for <strong>study financing (DUO)</strong> while keeping your freedom!</li><li><strong>Requirements</strong> — smartphone with data and your own bike, scooter, or car</li><li><strong>Perfect for students</strong> — stay fit, meet people, and make money on your own schedule</li></ul><p>Ready to swap your desk for the open road? <strong>Join Thuisbezorgd.nl and start earning this week!</strong></p>",  employmentType: "PART_TIME",
  baseSalaryMin: 12,
  baseSalaryMax: 15,
  DUO: true,
  currency: "EUR",
  payUnit: "HOUR",
  addressLocality: "Amsterdam",
  area: "Citywide / Multiple cities",
  englishFriendly: true,
  workHours: "Flexible shifts, 6–30 h/week",
  datePosted: new Date().toISOString().slice(0, 10),
  validThrough: "2026-12-31",
  categories: ["delivery", "fieldwork"],
  featured: true,
  perSaleAmountText: "14 euros per hour",
  logoUrl: "/logos/thuisbezorgd.png",
  logoAlt: "Thuisbezorgd.nl logo",
  externalUrl: "http://short.takeaway.com/nl355999758"
},
    {
    slug: "pepperminds-door-to-door-sales-Amsterdam",
    title: "Door-to-Door Sales",
    orgName: "Pepperminds",
  
    descriptionHtml:
     "<p><strong>Earn €150 per shift</strong> as part of Pepperminds’ door-to-door team in Amsterdam. We mix the <em>personal touch in a digital era</em> with energy, coaching, and paid training so you can grow fast and earn even faster.</p><ul><li><strong> Dutch is not required</strong>, and you can even receive DUO… if you work enough hours of course 😉</li><li><strong>The better you are, the more you earn!</strong> You start as a rookie, grow into a promoter, and can become a captain — with performance bonuses reaching up to <strong>€500 a day!</strong></li><li><strong>Learn real sales</strong> — your colleagues are students from all kinds of backgrounds, and together you’ll master the most versatile skill out there: sales!</li><li><strong>Challenge yourself</strong> — every day is different, full of teamwork, laughter, and growth.</li><li><strong>After work culture</strong> — we even have our own bar where the team celebrates wins and unwinds together!</li></ul><p>Ready to test your limits, make friends, and earn like a pro? <strong>Join the crew and start this week!</strong></p>",    baseSalaryMin: 12,
    employmentType: "PART_TIME",
    baseSalaryMax: 20,
    DUO: true,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    area: "Various districts",
    englishFriendly: true,
    workHours: "10–20 h/week",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["sales", "fieldwork"],
    featured: true,
    // unknown numeric commission -> use text fallback
    perSaleAmountText: "150 еuros per shift",
    logoUrl: "/logos/pepperminds.jpeg",
    logoAlt: "Pepperminds logo",
    // externalUrl: "https://www.pepperminds.nl/makeithappen/?mkt=LZ&utm_source=viavia&utm_medium=crewapp&utm_campaign=makeithappen",
  },
  {
slug: "uber-eats-courier-Amsterdam",
title: "Uber Eats Courier",
orgName: "Uber",
descriptionHtml:
"<p><strong>Earn on your own schedule</strong> delivering with the Uber app in Amsterdam. Be your own boss, choose when you work, and track your earnings in real time.</p><p><strong>Limited-time promo:</strong> <strong>Receive an extra €750</strong> after you sign up and complete <strong>50 trips within 90 days</strong>. *Eligibility applies; see additional terms on Uber’s site.</p><ul><li><strong>Flexible hours</strong> — ride when it suits you (great alongside studies or another job).</li><li><strong>Fast onboarding</strong> — easy sign-up and start delivering once you’re approved.</li><li><strong>Real-time earnings</strong> — see trip totals live and cash out with available payout options.</li><li><strong>Multiple modes</strong> — deliver by bike, scooter, or car (requirements vary by city).</li><li><strong>Refer & earn</strong> — invite friends to drive or deliver and earn once they complete trips.</li></ul><p><strong>Join today</strong> and start delivering in Amsterdam — the city’s always moving.</p>",
baseSalaryMin: 12,
employmentType: "PART_TIME",
baseSalaryMax: 25,
DUO: true,
currency: "EUR",
payUnit: "HOUR",
addressLocality: "Amsterdam",
area: "Amsterdam & nearby districts",
englishFriendly: true,
workHours: "Flexible — you choose",
datePosted: new Date().toISOString().slice(0, 10),
validThrough: "2026-12-31",
categories: ["delivery"],
featured: true,
perSaleAmountText: "€750 sign-up reward after 50 trips (within 90 days; terms apply)",
logoUrl: "/logos/uber.png",
logoAlt: "Uber logo",
externalUrl: "https://www.uber.com/signup/drive/deliver/?invite_code=a6cpc37",
},
  {
    slug: "domakin-viewing-agent-Amsterdam",
    title: "Domakin Viewing Agent (Remote Viewings)",
    orgName: "Domakin",
    descriptionHtml:
      "<p>Visit properties on behalf of students, stream live video, and complete a short checklist (condition, noise, registration, landlord details). Flexible shifts; training provided.</p><ul><li>Equipment: smartphone with data</li><li>Each viewing ~30–45 minutes</li><li>Bonus for fast response times</li></ul>",
    employmentType: "PART_TIME",
    baseSalaryMin: 15,
    baseSalaryMax: 22,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    area: "Citywide",
    englishFriendly: true,
    workHours: "4–16 h/week, flexible",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["fieldwork", "events"],
    featured: false,
    // amounts for short description
    perGigAmount: 20,                              // €20 per gig
    // logo
    logoUrl: "/logos/domakin.png",
    logoAlt: "Domakin logo",
    externalUrl: "https://www.domakin.nl/careers"
  },
  {
    slug: "domakin-room-finder-Amsterdam",
    title: "Room Finder",
    orgName: "Domakin",
    descriptionHtml: "<p><strong>Do you want to help students who are struggling to find a place to live?</strong> Do you want to work in a growing startup that actually makes a difference — and looks amazing on your CV? Do you want to earn money, build connections, and have a real impact on how things operate? Then <strong>join the Domakin ‘for the win’ team!</strong></p><p>As a <strong>Room Finder</strong> at Domakin, you’ll help international students settle in the Netherlands by sourcing rooms and apartments that allow registration, verifying details with landlords, and uploading them to our platform. Every successful match helps another student find a home — and earns you <strong>€200 per sale!</strong></p><ul><li><strong>Citywide work</strong> — explore your city and connect with landlords</li><li><strong>English-friendly</strong> — perfect for international students</li><li><strong>Learn by doing</strong> — get startup experience that builds your business and communication skills</li><li><strong>Tasks</strong> — outbound calls & messages, quality checks (registration, price, location)</li><li><strong>Great for proactive, social, and persistent students</strong></li></ul><p><strong>How to apply:</strong> Shoot us a message through the contact form on our website — write <strong>“Domakin for the win</strong> along with your email, and we’ll reach out to schedule an interview. Type it with confidence — we’ll know it’s you 😉</p><p>Make an impact, grow your skills, and earn along the way — <strong>Domakin is waiting for you!</strong></p>", 
    employmentType: "PART_TIME",
    baseSalaryMin: 12,
    baseSalaryMax: 18,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    area: "Citywide",
    englishFriendly: true,
    workHours: "6–20 h/week, flexible",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["sales"],
    featured: true,
    // amounts for short description
    perSaleAmount: 200,                            // €200 per successful listing/placement
    logoUrl: "/logos/domakin.png",
    logoAlt: "Domakin logo",
    externalUrl: "https://www.domakin.nl/careers",
  },
  {
    slug: "rentswap-room-finder-Amsterdam",
    title: "Room Finder",
    orgName: "RentSwap",
    descriptionHtml: "<p><strong>Do you already know someone who’s moving out — or maybe you’re leaving your own place soon?</strong> Then this is the perfect opportunity for you! Join <strong>RentSwap</strong>, a Amsterdam-based startup helping students and young professionals find rooms before they even hit the market.</p><p>As a <strong>Room Finder</strong>, you’ll work directly with leaving tenants to identify upcoming rooms, organize one-candidate viewings, and make sure everything is verified — from registration to rent and location. Each successful handover earns you <strong>€200</strong> and helps someone secure their new home.</p><ul><li><strong>Citywide work</strong> — explore Amsterdam while connecting with landlords and tenants</li><li><strong>Flexible hours</strong> — plan your work around your studies or other commitments</li><li><strong>English-friendly</strong> — ideal for international students and expats</li><li><strong>Training included</strong> — learn scripts, communication, and verification skills</li><li><strong>Great for social, proactive, and organized students</strong></li></ul><p><strong>How to apply:</strong> Go to our website and send a short message through the contact form with your email — we’ll reach out to plan your interview.</p><p>Help others find their next home and be part of a fast-growing Amsterdam startup — <strong>join RentSwap today!</strong></p>",    baseSalaryMin: 12,
    employmentType: "PART_TIME",
    baseSalaryMax: 18,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    area: "Citywide",
    englishFriendly: true,
    workHours: "8–16 h/week",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["sales"],
    featured: false,
    // amounts for short description
    perSaleAmount: 200,                            // €200 per successful handover
    logoUrl: "/logos/rentswap.png",
    logoAlt: "RentSwap logo",
    externalUrl:"https://www.rentswap.nl/",
  },
];
// Paste into src/data/jobs.ts (after RAW_JOBS is defined)
// Add these external jobs (none featured), then push into RAW_JOBS.

const NEW_JOBS: RawJob[] = [
  {
    slug: "hellofresh-delivery-driver-Amsterdam",
    title: "HelloFresh Delivery Driver (Amsterdam)",
    orgName: "HelloFresh",
    descriptionHtml:
      "<p>Deliver meal boxes in Amsterdam; fixed shifts, paid mileage; uniform & equipment provided.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 14.5,
    baseSalaryMax: 15.5,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Fixed shifts",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["delivery"],
    externalUrl: "https://www.studentjob.nl/vacatures/2964353-hello-fresh-bezorger-Amsterdam",
  },
  {
    slug: "coolblue-bezorger-delivery-driver-Amsterdam",
    title: "Coolblue Bezorger (Delivery Driver)",
    orgName: "Coolblue",
    descriptionHtml:
      "<p>Deliver large/small electronics in the Amsterdam region; employee contract with benefits.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 17.64,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Amsterdam region",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["delivery"],
    externalUrl: "https://nl.indeed.com/q-coolblue-l-Amsterdam-vacatures.html",
  },
  {
    slug: "postnl-night-postsorteerder-Amsterdam",
    title: "PostNL Night Postsorteerder (Amsterdam)",
    orgName: "PostNL",
    descriptionHtml:
      "<p>Night mail sorting in Amsterdam; shift allowances increase evening/night pay.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 13.68,
    baseSalaryMax: 19.15,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Evenings/Nights",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["fieldwork"],
    externalUrl:
      "https://www.studentjob.nl/vacatures/3399225-parttime-postsorteerder-in-de-avond-bij-postnl-in-Amsterdam",
  },
  {
    slug: "lidl-store-assistant-zuidplein",
    title: "Lidl Store Assistant – Zuidplein",
    orgName: "Lidl",
    descriptionHtml:
      "<p>Supermarket retail shifts (2–12 hrs/week); flexible scheduling; age-based all-in pay.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 14.94,
    baseSalaryMax: 20.0,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    area: "Zuidplein",
    workHours: "2–12 h/week, flexible",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://nl.indeed.com/q-vakkenvuller-l-Amsterdam-vacatures.html",
  },
  {
    slug: "catering-medewerker-hogeschool-Amsterdam-spot-on",
    title: "Catering Medewerker – Hogeschool Amsterdam (Spot On)",
    orgName: "Spot On",
    descriptionHtml:
      "<p>On-campus catering service; daytime Mon–Fri; flexible hours.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 14.5,
    baseSalaryMax: 16.5,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Daytime (Mon–Fri)",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl:
      "https://nl.indeed.com/q-catering-medewerker-bij-l-Amsterdam-vacatures.html",
  },
  {
    slug: "festival-horeca-crew-local-heroes-Amsterdam",
    title: "Festival/Horeca Crew – Local Heroes (Amsterdam)",
    orgName: "Local Heroes",
    descriptionHtml:
      "<p>Events & festival shifts; English-friendly; pay varies by age/experience.</p>",
    employmentType: "TEMPORARY",
    baseSalaryMin: 14.39,
    baseSalaryMax: 15.41,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    englishFriendly: true,
    workHours: "Event-based shifts",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["events", "hospitality"],
    externalUrl:
      "https://thelocalheroes.nl/horeca-vacatures/festival-medewerker-indeed-Amsterdam/",
  },
  {
    slug: "erasmus-university-tutor-academy-tutor-student-assistant",
    title: "Erasmus University Tutor Academy – Tutor/Student Assistant",
    orgName: "Erasmus University Amsterdam",
    descriptionHtml:
      "<p>Paid tutoring/assisting for EUR courses; on-campus roles for students.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 15.87,
    baseSalaryMax: 17.28,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "On-campus; variable",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["tutoring"],
    externalUrl: "https://www.eur.nl/en/education/tutor-academy",
  },
  {
    slug: "studentsplus-bijlesdocent-Amsterdam",
    title: "StudentsPlus – Bijlesdocent (Amsterdam)",
    orgName: "StudentsPlus",
    descriptionHtml:
      "<p>1-on-1 tutoring; you set your schedule; CV-friendly student job.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 15.0,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Flexible",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["tutoring"],
    externalUrl: "https://www.studentsplus.nl/bijles-geven/Amsterdam",
  },
  {
    slug: "studyworks-bijlescoach",
    title: "StudyWorks – Bijlescoach",
    orgName: "StudyWorks",
    descriptionHtml:
      "<p>In-person or online tutoring; training provided; age-based rate.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 13.0,
    baseSalaryMax: 14.4,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Flexible",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["tutoring"],
    externalUrl: "https://werkenbijstudyworks.nl/bijles-geven/",
  },
  {
    slug: "call-center-agent-we-say-so",
    title: "Call Center Agent (We Say So)",
    orgName: "We Say So",
    descriptionHtml:
      "<p>Phone outreach/support; base pay + bonuses; on-site/remote mix.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 15.0,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "Varies",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["sales"],
    externalUrl:
      "https://www.studentjob.nl/vacatures/3626861-callcenter-medewerkers-gezocht-met-een-uurloon-van-15-excl-bonussen-ongeacht-jouw-leeftijd-fulltime-maar-ook-als-bijbaan-in-Amsterdam",
  },
  // {
  //   slug: "coolblue-klantenservice-Amsterdam",
  //   title: "Coolblue Klantenservice – Amsterdam",
  //   orgName: "Coolblue",
  //   descriptionHtml:
  //     "<p>Phone/chat support for orders & deliveries; training included.</p>",
  //   employmentType: "PART_TIME",
  //   baseSalaryMin: 14.45,
  //   currency: "EUR",
  //   payUnit: "HOUR",
  //   addressLocality: "Amsterdam",
  //   workHours: "24–40 h (varies)",
  //   datePosted: new Date().toISOString().slice(0, 10),
  //   validThrough: "2026-12-31",
  //   categories: ["sales"],
  //   externalUrl: "https://www.coolblue.nl/vacatures/klantenservice-medewerker",
  // },
  {
    slug: "enqueteur-Amsterdam-jobbird",
    title: "Enquêteur (Amsterdam) – Jobbird",
    orgName: "Jobbird",
    descriptionHtml:
      "<p>Street/phone surveying; flexible 6–24 hrs/week; no sales.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 13.16,
    baseSalaryMax: 16.45,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Amsterdam",
    workHours: "6–24 h/week",
    datePosted: new Date().toISOString().slice(0, 10),
    validThrough: "2026-12-31",
    categories: ["fieldwork"],
    externalUrl:
      "https://www.jobbird.com/nl/vacature/23005421-flexibele-bijbaan-callcenter-medewerker-als-enqueteur-in-Amsterdam",
  },
  // src/data/jobs.ts (add this one job object to your jobs array)
  // {
  //   slug: "test-job-application-amsterdam",
  //   title: "Test Job Application",
  //   orgName: "StudentJobsAmsterdam Test",
  //   descriptionHtml:
  //     "<p>This is a test job to verify the apply form and Supabase insert.</p><ul><li>Fill the form below</li><li>Submit</li><li>Check Supabase table <strong>job_applications</strong></li></ul></p>",
  //   baseSalaryMin: 12,
  //   baseSalaryMax: 18,
  //   currency: "EUR",
  //   payUnit: "HOUR",
  //   addressLocality: "Amsterdam",
  //   employmentType: "PART_TIME",
  //   area: "Test area",
  //   englishFriendly: true,
  //   workHours: "8–16 h/week",
  //   datePosted: new Date().toISOString().slice(0, 10),
  //   validThrough: "2026-12-31",
  //   categories: ["events"],
  //   featured: false,
  //   logoUrl: "/logos/pepperminds.jpeg",
  //   logoAlt: "Test logo",
  //   // IMPORTANT: leave externalUrl undefined so your list page links to /jobs/[slug]
  //   // externalUrl: "https://example.com",
  //   // optional styling
  //   // brandColor: "#E11D48",
  //   // heroImageUrl: "/blog/erasmus-experience-in-amsterdam-netherlands-by-chloe-834a8299ded61706deeddf619a213f68.jpg",
  //   // heroImageAlt: "Test hero image",
  // },

];

RAW_JOBS.push(...NEW_JOBS);


export const JOBS: JobRecord[] = RAW_JOBS.map((j) => ({
  ...j,
  shortDescrition: makeShortDescription(j),
}));

// helper lookups
export function getJobBySlug(slug: string) {
  return JOBS.find((j) => j.slug === slug) || null;
}
export function listJobs() {
  return JOBS;
}
export function listFeaturedJobs() {
  return JOBS.filter((j) => j.featured);
}


