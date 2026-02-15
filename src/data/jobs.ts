// src/data/jobs.ts
// Central job data + helpers (Delft). Auto-builds `shortDescrition` to include per-gig/per-sale amount + a concise text from `descriptionHtml`.
// Also adds a place for a per-listing logo (logoUrl/logoAlt).

// src/data/jobs.ts - add an external URL for outbound clicks
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
 addressLocality: "Delft";
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
 return text.length > maxLen ? text.slice(0, maxLen - 1) + "..." : text;
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

 return parts.join(" - ");
}

// ---- Define raw jobs (without shortDescrition), then map to final JOBS with computed shortDescrition ----
export type RawJob = Omit<JobRecord, "shortDescrition">;

const RAW_JOBS: RawJob[] = [
 {
 slug: "domakin-agent-delft",
 title: "Domakin Student Agent",
 orgName: "Domakin",
 descriptionHtml:
 "<p><strong>Domakin helps students in the Netherlands find housing.</strong> If you want a flexible role that makes a visible impact, and teaches you real communication and sales skills, this is it.</p>" +
 "<p>As a <strong>Domakin Agent</strong>, you combine two core missions:</p>" +
 "<ul>" +
 "<li><strong>Viewing Agent</strong>: attend property viewings on behalf of students who cannot be present, and report back with clear notes and photos.</li>" +
 "<li><strong>Property Seeker</strong>: help students find accommodation by sourcing rooms and studios, verifying the details, and guiding them through the process.</li>" +
 "</ul>" +
 "<h3>What you will do</h3>" +
 "<ul>" +
 "<li><strong>Remote viewings</strong>: go to properties in your area, take photos, check key points (registration, condition, neighborhood), and send a structured summary to the student.</li>" +
 "<li><strong>Property sourcing</strong>: find rooms and apartments, message or call landlords, confirm registration possibility, price, availability, and upload verified options to our system.</li>" +
 "<li><strong>Student support</strong>: help students move fast, make informed decisions, and avoid scams.</li>" +
 "<li><strong>Sales training</strong>: we train you to confidently pitch our process to landlords and students, including how we handle room listings and successful takeovers.</li>" +
 "</ul>" +
 "<h3>Time and compensation</h3>" +
 "<ul>" +
 "<li><strong>Per viewing</strong>: typically <strong>€20 to €40</strong>, and most viewings take <strong>up to 30 minutes</strong> on site (plus travel).</li>" +
 "<li><strong>Per room result</strong>: <strong>€200</strong> flat per room listing or match, with opportunities <strong>up to €300</strong> for a successful takeover, depending on the deal.</li>" +
 "<li><strong>Flexible schedule</strong>: take tasks when you want, scale up during busy periods.</li>" +
 "</ul>" +
 "<h3>Who this is for</h3>" +
 "<ul>" +
 "<li>Proactive and social people who can follow up consistently</li>" +
 "<li>Comfortable walking into viewings and asking direct questions</li>" +
 "<li>English friendly, international students welcome</li>" +
 "</ul>" +
 "<p><strong>How to apply:</strong> Send a message via the contact form on our website. Write <strong>â€œDomakin for the winâ€</strong> and include your email. We will reach out to schedule a short interview.</p>" +
 "<p><strong>Do work that matters.</strong> Every viewing and every verified room can be the difference between a student having a home, or being stuck for months.</p>",
 employmentType: "PART_TIME",
 currency: "EUR",
 addressLocality: "Delft",
 area: "All around the Netherlands",
 englishFriendly: true,
 workHours: "6 to 20 h/week, flexible",
 datePosted: "2026/02/14",
 validThrough: "2026-12-31",
 categories: ["sales", "fieldwork"],
 featured: true,

 // Commission style fields (clearer than hourly for this role)
 perGigAmount: 30,
 perGigAmountText: "€20 to €40 per remote viewing (avg. up to 30 min on site)",
 perSaleAmount: 300,
 perSaleAmountText: "€200 per room listing or match, up to €300 for a successful takeover",

 logoUrl: "/logos/domakin.png",
 logoAlt: "Domakin logo",
 // externalUrl: "https://www.domakin.nl/careers",
},
{
 slug: "ib-tutor",
 title: "IB Tutor (Online)",
 orgName: "AcademiaAI",

 descriptionHtml:
 "<p><strong>Earn well per hour</strong> while working flexibly as an IB tutor with AcademiaAI. You can start with as little as <strong>1 hour per week</strong>, or scale up and earn a substantial monthly income.</p>" +
 "<br>"+
 "<p>At AcademiaAI, you tutor only within your <strong>area of expertise</strong>. For example, an IB graduate who scored a 6 or 7 in Math AA HL and is studying or has completed a related university degree can tutor DP Math, but not DP Biology. This ensures <strong>high-quality lessons</strong>, which our students truly value.</p>" +
 "<br>"+
 "<p>We hire IB graduate tutors throughout the year. Once accepted, you can start tutoring quickly.</p>" + 
 "<br>"+
 "<p>When you apply please let us know: </p>"+
 "<p><strong>City of residence</strong></p>" +
 "<p><strong>Country of residence</strong></p>" +
 "<p><strong>Did you graduate from IB?</strong></p>" +
 "<p><strong>Have you graduated from the International Baccalaureate Diploma Programme (IB DP)?</strong></p>" +
 "<p><strong>Current and completed university studies</strong></p>" +
 "<br>"+
 "<p>Interested? Apply now and start tutoring with AcademiaAI!</p>",



 baseSalaryMin: 20,
 baseSalaryMax: 40,
 employmentType: "PART_TIME",
 DUO: true,
 currency: "EUR",
 payUnit: "HOUR",
 addressLocality: "Delft",
 area: "Online tutoring",
 englishFriendly: true,
 workHours: "1-20 h/week",
 datePosted: "2026/02/14",
 validThrough: "2026-12-31",
 categories: ["tutoring"],
 featured: true,
 perSaleAmountText: "High hourly pay depending on subject and experience",
 logoUrl: "/logos/academiaAI.png",
 logoAlt: "AcademiaAI logo",
},
 // {
 // slug: "pepperminds-door-to-door-sales-delft",
 // title: "Door-to-Door Sales",
 // orgName: "Pepperminds",
 
 // descriptionHtml:
 // "<p><strong>DUTCH REUQIRED! Earn €150 per shift</strong> as part of <a href=\"https://www.pepperminds.nl/makeithappen/?mkt=4930&recruitmentsource=Through_pepper\" target=\"_blank\" rel=\"noopener noreferrer\">Peppermindsâ€™ door-to-door team</a> door-to-door team in Delft. We mix the <em>personal touch in a digital era</em> with energy, coaching, and paid training so you can grow fast and earn even faster.</p><ul><li><strong> Dutch is not required</strong>, and you can even receive DUO... if you work enough hours of course ðŸ˜‰</li><li><strong>The better you are, the more you earn!</strong> You start as a rookie, grow into a promoter, and can become a captain - with performance bonuses reaching up to <strong>€500 a day!</strong></li><li><strong>Learn real sales</strong> - your colleagues are students from all kinds of backgrounds, and together youâ€™ll master the most versatile skill out there: sales!</li><li><strong>Challenge yourself</strong> - every day is different, full of teamwork, laughter, and growth.</li><li><strong>After work culture</strong> - we even have our own bar where the team celebrates wins and unwinds together!</li></ul><p>Ready to test your limits, make friends, and earn like a pro? <strong>Join the crew and start this week!</strong></p>", baseSalaryMin: 12,
 // employmentType: "PART_TIME",
 // baseSalaryMax: 20,
 // DUO: true,
 // currency: "EUR",
 // payUnit: "HOUR",
 // addressLocality: "Delft",
 // area: "Various districts",
 // englishFriendly: false,
 // workHours: "10-20 h/week",
 // datePosted: "2026/02/14",
 // validThrough: "2026-12-31",
 // categories: ["sales", "fieldwork"],
 // featured: false,
 // // unknown numeric commission -> use text fallback
 // perSaleAmountText: "150 Ðµuros per shift",
 // logoUrl: "/logos/pepperminds.jpeg",
 // logoAlt: "Pepperminds logo",
 // // externalUrl: "https://www.pepperminds.nl/makeithappen/?mkt=LZ&utm_source=viavia&utm_medium=crewapp&utm_campaign=makeithappen",
 // },

  {
 slug: "pepperminds-door-to-door-sales-delft-nl",
 title: "Door-to-Door Sales",
 orgName: "Pepperminds",

 descriptionHtml:
 "<p><strong>Verdien €150 per shift</strong> als onderdeel van het <a href=\"https://www.pepperminds.nl/makeithappen/?mkt=4930&recruitmentsource=Through_pepper\" target=\"_blank\" rel=\"noopener noreferrer\">Pepperminds door-to-door team</a> in Delft. Wij combineren de <em>persoonlijke touch in een digitaal tijdperk</em> met energie, coaching en betaalde trainingen zodat jij snel kunt groeien Ã©n snel kunt verdienen.</p><ul><li>, en je kunt zelfs DUO ontvangen als je genoeg uren werkt ðŸ˜‰</li><li><strong>Hoe beter je presteert, hoe meer je verdient!</strong> Je start als rookie, groeit door tot promoter en kunt captain worden met bonussen tot <strong>€500 per dag!</strong></li><li><strong>Leer echte sales</strong> samen met ambitieuze studenten uit allerlei achtergronden.</li><li><strong>Daag jezelf uit</strong> elke werkdag is anders, vol teamwork en groei.</li><li><strong>After work cultuur</strong> we hebben zelfs een eigen bar om successen te vieren.</li></ul><p>Klaar om je grenzen te verleggen, vrienden te maken en goed te verdienen? <strong>Start deze week nog!</strong></p>",
 baseSalaryMin: 12,
 employmentType: "PART_TIME",
 baseSalaryMax: 20,
 DUO: true,
 currency: "EUR",
 payUnit: "HOUR",
 addressLocality: "Delft",
 area: "Verschillende wijken",
 englishFriendly: false,
 workHours: "10-20 uur per week",
 datePosted: "2026/02/14",
 validThrough: "2026-12-31",
 categories: ["sales", "fieldwork"],
 featured: true,
 perSaleAmountText: "€150 per shift",
 logoUrl: "/logos/pepperminds.jpeg",
 logoAlt: "Pepperminds logo",
},

 

 {
 slug: "thuisbezorgd-takeaway-courier-netherlands",
 title: "Food Delivery",
 orgName: "Thuisbezorgd.nl",
descriptionHtml: "<p><strong>Are you tired of endless study sessions and sitting behind your laptop all day?</strong> This job is your perfect excuse to get outside, stay active, and earn solid money while exploring your city! Join <strong>Thuisbezorgd.nl</strong> as a Food Delivery Courier - hop on your bike, scooter, or car, and deliver happiness (and food) straight to hungry customers.</p><ul><li><strong>Flexible schedule</strong> - choose your own working hours so you can balance lectures, gym time, and parties ðŸ•ðŸš´â€â™‚ï¸</li><li><strong>Reliable income</strong> - hourly pay + tips + bonuses (and yes, rainy-day deliveries pay even better ðŸ˜‰)</li><li><strong>DUO-friendly</strong> - work enough hours and you can qualify for <strong>study financing (DUO)</strong> while keeping your freedom!</li><li><strong>Requirements</strong> - smartphone with data and your own bike, scooter, or car</li><li><strong>Perfect for students</strong> - stay fit, meet people, and make money on your own schedule</li></ul><p>Ready to swap your desk for the open road? <strong>Join Thuisbezorgd.nl and start earning this week!</strong></p>", employmentType: "PART_TIME",
 baseSalaryMin: 12,
 baseSalaryMax: 15,
 DUO: true,
 currency: "EUR",
 payUnit: "HOUR",
 addressLocality: "Delft",
 area: "Citywide / Multiple cities",
 englishFriendly: true,
 workHours: "Flexible shifts, 6-30 h/week",
 datePosted: "2026/02/14",
 validThrough: "2026-12-31",
 categories: ["delivery", "fieldwork"],
 featured: true,
 perSaleAmountText: "14 euros per hour",
 logoUrl: "/logos/thuisbezorgd.png",
 logoAlt: "Thuisbezorgd.nl logo",
 externalUrl: "http://short.takeaway.com/nl355999758"
},

 {
slug: "uber-eats-courier-delft",
title: "Uber Eats Courier",
orgName: "Uber",
descriptionHtml:
"<p><strong>Earn on your own schedule</strong> delivering with the Uber app in Delft. Be your own boss, choose when you work, and track your earnings in real time.</p><p><strong>Limited-time promo:</strong> <strong>Receive an extra €750</strong> after you sign up and complete <strong>50 trips within 90 days</strong>. *Eligibility applies; see additional terms on Uberâ€™s site.</p><ul><li><strong>Flexible hours</strong> - ride when it suits you (great alongside studies or another job).</li><li><strong>Fast onboarding</strong> - easy sign-up and start delivering once youâ€™re approved.</li><li><strong>Real-time earnings</strong> - see trip totals live and cash out with available payout options.</li><li><strong>Multiple modes</strong> - deliver by bike, scooter, or car (requirements vary by city).</li><li><strong>Refer & earn</strong> - invite friends to drive or deliver and earn once they complete trips.</li></ul><p><strong>Join today</strong> and start delivering in Delft - the cityâ€™s always moving.</p>",
baseSalaryMin: 12,
employmentType: "PART_TIME",
baseSalaryMax: 25,
DUO: true,
currency: "EUR",
payUnit: "HOUR",
addressLocality: "Delft",
area: "Delft & nearby districts",
englishFriendly: true,
workHours: "Flexible - you choose",
datePosted: "2026/02/14",
validThrough: "2026-12-31",
categories: ["delivery"],
featured: false,
perSaleAmountText: "€750 sign-up reward after 50 trips (within 90 days; terms apply)",
logoUrl: "/logos/uber.png",
logoAlt: "Uber logo",
// externalUrl: "https://www.uber.com/signup/drive/deliver/?invite_code=a6cpc37",
}
]
// Paste into src/data/jobs.ts (after RAW_JOBS is defined)
// Add these external jobs (none featured), then push into RAW_JOBS.


import { NEW_JOBS } from "./newjobs_delft";

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



