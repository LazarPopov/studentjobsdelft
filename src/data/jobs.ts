// src/data/jobs.ts
// Central job data + helpers (Delft). Auto-builds `shortDescrition` to include per-gig/per-sale amount + a concise text from `descriptionHtml`.
// Also adds a place for a per-listing logo (logoUrl/logoAlt).

// src/data/jobs.ts â€” add an external URL for outbound clicks
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
  return text.length > maxLen ? text.slice(0, maxLen - 1) + "â€¦" : text;
}

function money(n?: number) {
  return typeof n === "number" && n > 0 ? `â‚¬${n.toString()}` : null;
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

  return parts.join(" â€” ");
}

// ---- Define raw jobs (without shortDescrition), then map to final JOBS with computed shortDescrition ----
type RawJob = Omit<JobRecord, "shortDescrition">;

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
    "<li><strong>Per viewing</strong>: typically <strong>â‚¬20 to â‚¬40</strong>, and most viewings take <strong>up to 30 minutes</strong> on site (plus travel).</li>" +
    "<li><strong>Per room result</strong>: <strong>â‚¬200</strong> flat per room listing or match, with opportunities <strong>up to â‚¬300</strong> for a successful takeover, depending on the deal.</li>" +
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
  perGigAmountText: "â‚¬20 to â‚¬40 per remote viewing (avg. up to 30 min on site)",
  perSaleAmount: 300,
  perSaleAmountText: "â‚¬200 per room listing or match, up to â‚¬300 for a successful takeover",

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
  workHours: "1â€“20 h/week",
  datePosted: "2026/02/14",
  validThrough: "2026-12-31",
  categories: ["tutoring"],
  featured: true,
  perSaleAmountText: "High hourly pay depending on subject and experience",
  logoUrl: "/logos/academiaAI.png",
  logoAlt: "AcademiaAI logo",
},
  //   {
  //   slug: "pepperminds-door-to-door-sales-delft",
  //   title: "Door-to-Door Sales",
  //   orgName: "Pepperminds",
  
  //   descriptionHtml:
  //    "<p><strong>DUTCH REUQIRED! Earn â‚¬150 per shift</strong> as part of <a href=\"https://www.pepperminds.nl/makeithappen/?mkt=4930&recruitmentsource=Through_pepper\" target=\"_blank\" rel=\"noopener noreferrer\">Peppermindsâ€™ door-to-door team</a> door-to-door team in Delft. We mix the <em>personal touch in a digital era</em> with energy, coaching, and paid training so you can grow fast and earn even faster.</p><ul><li><strong> Dutch is not required</strong>, and you can even receive DUOâ€¦ if you work enough hours of course ðŸ˜‰</li><li><strong>The better you are, the more you earn!</strong> You start as a rookie, grow into a promoter, and can become a captain â€” with performance bonuses reaching up to <strong>â‚¬500 a day!</strong></li><li><strong>Learn real sales</strong> â€” your colleagues are students from all kinds of backgrounds, and together youâ€™ll master the most versatile skill out there: sales!</li><li><strong>Challenge yourself</strong> â€” every day is different, full of teamwork, laughter, and growth.</li><li><strong>After work culture</strong> â€” we even have our own bar where the team celebrates wins and unwinds together!</li></ul><p>Ready to test your limits, make friends, and earn like a pro? <strong>Join the crew and start this week!</strong></p>",    baseSalaryMin: 12,
  //   employmentType: "PART_TIME",
  //   baseSalaryMax: 20,
  //   DUO: true,
  //   currency: "EUR",
  //   payUnit: "HOUR",
  //   addressLocality: "Delft",
  //   area: "Various districts",
  //   englishFriendly: false,
  //   workHours: "10â€“20 h/week",
  //   datePosted: "2026/02/14",
  //   validThrough: "2026-12-31",
  //   categories: ["sales", "fieldwork"],
  //   featured: false,
  //   // unknown numeric commission -> use text fallback
  //   perSaleAmountText: "150 Ðµuros per shift",
  //   logoUrl: "/logos/pepperminds.jpeg",
  //   logoAlt: "Pepperminds logo",
  //   // externalUrl: "https://www.pepperminds.nl/makeithappen/?mkt=LZ&utm_source=viavia&utm_medium=crewapp&utm_campaign=makeithappen",
  // },

      {
  slug: "pepperminds-door-to-door-sales-delft-nl",
  title: "Door-to-Door Sales",
  orgName: "Pepperminds",

  descriptionHtml:
   "<p><strong>Verdien â‚¬150 per shift</strong> als onderdeel van het <a href=\"https://www.pepperminds.nl/makeithappen/?mkt=4930&recruitmentsource=Through_pepper\" target=\"_blank\" rel=\"noopener noreferrer\">Pepperminds door-to-door team</a> in Delft. Wij combineren de <em>persoonlijke touch in een digitaal tijdperk</em> met energie, coaching en betaalde trainingen zodat jij snel kunt groeien Ã©n snel kunt verdienen.</p><ul><li>, en je kunt zelfs DUO ontvangen als je genoeg uren werkt ðŸ˜‰</li><li><strong>Hoe beter je presteert, hoe meer je verdient!</strong> Je start als rookie, groeit door tot promoter en kunt captain worden met bonussen tot <strong>â‚¬500 per dag!</strong></li><li><strong>Leer echte sales</strong> samen met ambitieuze studenten uit allerlei achtergronden.</li><li><strong>Daag jezelf uit</strong> elke werkdag is anders, vol teamwork en groei.</li><li><strong>After work cultuur</strong> we hebben zelfs een eigen bar om successen te vieren.</li></ul><p>Klaar om je grenzen te verleggen, vrienden te maken en goed te verdienen? <strong>Start deze week nog!</strong></p>",
  baseSalaryMin: 12,
  employmentType: "PART_TIME",
  baseSalaryMax: 20,
  DUO: true,
  currency: "EUR",
  payUnit: "HOUR",
  addressLocality: "Delft",
  area: "Verschillende wijken",
  englishFriendly: false,
  workHours: "10â€“20 uur per week",
  datePosted: "2026/02/14",
  validThrough: "2026-12-31",
  categories: ["sales", "fieldwork"],
  featured: true,
  perSaleAmountText: "â‚¬150 per shift",
  logoUrl: "/logos/pepperminds.jpeg",
  logoAlt: "Pepperminds logo",
},

  

   {
  slug: "thuisbezorgd-takeaway-courier-netherlands",
  title: "Food Delivery",
  orgName: "Thuisbezorgd.nl",
descriptionHtml: "<p><strong>Are you tired of endless study sessions and sitting behind your laptop all day?</strong> This job is your perfect excuse to get outside, stay active, and earn solid money while exploring your city! Join <strong>Thuisbezorgd.nl</strong> as a Food Delivery Courier â€” hop on your bike, scooter, or car, and deliver happiness (and food) straight to hungry customers.</p><ul><li><strong>Flexible schedule</strong> â€” choose your own working hours so you can balance lectures, gym time, and parties ðŸ•ðŸš´â€â™‚ï¸</li><li><strong>Reliable income</strong> â€” hourly pay + tips + bonuses (and yes, rainy-day deliveries pay even better ðŸ˜‰)</li><li><strong>DUO-friendly</strong> â€” work enough hours and you can qualify for <strong>study financing (DUO)</strong> while keeping your freedom!</li><li><strong>Requirements</strong> â€” smartphone with data and your own bike, scooter, or car</li><li><strong>Perfect for students</strong> â€” stay fit, meet people, and make money on your own schedule</li></ul><p>Ready to swap your desk for the open road? <strong>Join Thuisbezorgd.nl and start earning this week!</strong></p>",  employmentType: "PART_TIME",
  baseSalaryMin: 12,
  baseSalaryMax: 15,
  DUO: true,
  currency: "EUR",
  payUnit: "HOUR",
  addressLocality: "Delft",
  area: "Citywide / Multiple cities",
  englishFriendly: true,
  workHours: "Flexible shifts, 6â€“30 h/week",
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
"<p><strong>Earn on your own schedule</strong> delivering with the Uber app in Delft. Be your own boss, choose when you work, and track your earnings in real time.</p><p><strong>Limited-time promo:</strong> <strong>Receive an extra â‚¬750</strong> after you sign up and complete <strong>50 trips within 90 days</strong>. *Eligibility applies; see additional terms on Uberâ€™s site.</p><ul><li><strong>Flexible hours</strong> â€” ride when it suits you (great alongside studies or another job).</li><li><strong>Fast onboarding</strong> â€” easy sign-up and start delivering once youâ€™re approved.</li><li><strong>Real-time earnings</strong> â€” see trip totals live and cash out with available payout options.</li><li><strong>Multiple modes</strong> â€” deliver by bike, scooter, or car (requirements vary by city).</li><li><strong>Refer & earn</strong> â€” invite friends to drive or deliver and earn once they complete trips.</li></ul><p><strong>Join today</strong> and start delivering in Delft â€” the cityâ€™s always moving.</p>",
baseSalaryMin: 12,
employmentType: "PART_TIME",
baseSalaryMax: 25,
DUO: true,
currency: "EUR",
payUnit: "HOUR",
addressLocality: "Delft",
area: "Delft & nearby districts",
englishFriendly: true,
workHours: "Flexible â€” you choose",
datePosted: "2026/02/14",
validThrough: "2026-12-31",
categories: ["delivery"],
featured: false,
perSaleAmountText: "â‚¬750 sign-up reward after 50 trips (within 90 days; terms apply)",
logoUrl: "/logos/uber.png",
logoAlt: "Uber logo",
// externalUrl: "https://www.uber.com/signup/drive/deliver/?invite_code=a6cpc37",
}
]
// Paste into src/data/jobs.ts (after RAW_JOBS is defined)
// Add these external jobs (none featured), then push into RAW_JOBS.

const NEW_JOBS: RawJob[] = [
  {
    slug: "picnic-delivery-driver-Delft",
    title: "Picnic Delivery Driver (Delft area)",
    orgName: "Picnic",
    descriptionHtml:
      "<p>Deliver groceries from a Picnic hub, tips on top, weekly pay, and flexible scheduling.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 9.88,
    baseSalaryMax: 15.96,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Delft",
    workHours: "16 to 40 h/week",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["delivery"],
    externalUrl: "https://jobs.picnic.app/en/vacancies/delivery-driver-nl",
  },

  {
    slug: "albert-heijn-medewerker-allround-Delft",
    title: "Albert Heijn Medewerker Allround (Store shifts)",
    orgName: "Albert Heijn",
    descriptionHtml:
      "<p>Allround supermarket role: shelves, self scan area, produce, and service. Varied store shifts and lots of teamwork.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Flexible store shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://werk.ah.nl/vacature/12051/medewerker-allround-5",
  },
  {
    slug: "albert-heijn-stock-associate-Delft",
    title: "Albert Heijn Stock Associate (Delft)",
    orgName: "Albert Heijn",
    descriptionHtml:
      "<p>Stock and shelf replenishment in store. Flexible hours and a classic student friendly retail job.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Flexible",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://werk.ah.nl/en/vacancy/38370/stock-associate-60",
  },
  {
    slug: "primark-verkoopmedewerker-damrak-Delft",
    title: "Primark Verkoopmedewerker (Delft Damrak)",
    orgName: "Primark",
    descriptionHtml:
      "<p>Retail assistant role in the Delft store, customer help, stock, and keeping the shop floor tidy. Part time roles listed on Primark careers.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Part time",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://careers.primark.com/en/location/delft-jobs/8171/2750405-2749879-2759794/4",
  },
  {
    slug: "decathlon-verkoopmedewerker-Delft",
    title: "Decathlon Verkoopmedewerker (Delft)",
    orgName: "Decathlon",
    descriptionHtml:
      "<p>Help customers with sport advice, keep shelves stocked, support inventory and freight flow. Retail job in Delft.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Store shifts, typically evenings and weekends",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijdecathlon.nl/vacatures/verkoopmedewerker-delft-5654553",
  },
  {
    slug: "coffeecompany-barista-delft-oost-Delft",
    title: "Barista Coffeecompany Delft Oost",
    orgName: "Coffeecompany (via Albron)",
    descriptionHtml:
      "<p>Flexible barista job that pairs well with studying. Learn coffee skills and work in a fast paced team.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Flexible",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl: "https://www.werkenbijalbron.nl/vacatures/barista-coffeecompany-delft-oost-delft-1129740",
  },
  {
    slug: "bagels-beans-allround-medewerker-Delft",
    title: "Bagels and Beans Allround Medewerker (Delft)",
    orgName: "Bagels and Beans",
    descriptionHtml:
      "<p>Daytime hospitality role: service, prep, coffee, and team support. Multiple Delft locations recruit via the Bagels and Beans job site.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Day shifts, usually no late evenings",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl: "https://www.werkenbijbagelsbeans.nl/",
  },
  {
    slug: "starbucks-barista-delft-zuid-cs-Delft",
    title: "Barista Starbucks Delft Zuid CS",
    orgName: "SSP (Starbucks store)",
    descriptionHtml:
      "<p>Barista role at a Starbucks location in Delft. Customer focused work, training, and shift flexibility.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 14.91,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Delft",
    workHours: "Shifts, weekend availability commonly requested",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl: "https://nl.indeed.com/q-barista-starbucks-l-delft-vacatures.html",
  },
  {
    slug: "sales-promotor-rai-Delft",
    title: "Sales Promotor at RAI (Delft)",
    orgName: "YoungCapital (RAI assignment)",
    descriptionHtml:
      "<p>Demonstrate products on the RAI floor and engage visitors. Listed pay is â‚¬15 per hour.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 15.0,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Delft",
    workHours: "32 to 40 h/week",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["sales", "events"],
    externalUrl: "https://www.youngcapital.nl/vacatures/5701070-fulltime-sales-promotor-in-delft-15-p-u",
  },
  {
    slug: "johan-cruijff-arena-steward-host-Delft",
    title: "Johan Cruijff ArenA Event Crew (Steward, Host, Bar)",
    orgName: "Randstad (Johan Cruijff ArenA)",
    descriptionHtml:
      "<p>Work matches and concerts as event crew. Typical student setup with a few events per month and short shifts per event.</p>",
    employmentType: "TEMPORARY",
    addressLocality: "Delft",
    workHours: "2 to 5 events per month, about 4.5 hours per event",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["events"],
    externalUrl: "https://www.randstad.nl/werknemers/vacatures/topwerkgevers/johan-cruijff-arena",
  },
  {
    slug: "pal-voor-de-klas-teaching-assistant-Delft",
    title: "PAL voor de Klas (Teaching Assistant) via UvA and VU",
    orgName: "PAL voor de Klas",
    descriptionHtml:
      "<p>Support teachers at a secondary school: assist in class, help with tutoring and materials. About 8 hours per week, pay mentioned as at least â‚¬11 per hour.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 11.0,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Delft",
    workHours: "About 8 h/week (minimum availability typically 4 h/week)",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["tutoring"],
    externalUrl: "https://student.uva.nl/informatie/assisteren-bij-onderwijs",
  },
  {
    slug: "rai-flexpool-event-crew-Delft",
    title: "RAI Flexpool (Event crew, hospitality, floor support)",
    orgName: "RAI Delft",
    descriptionHtml:
      "<p>Work flexible event shifts at RAI Delft via their flex routes. Roles vary per event and department.</p>",
    employmentType: "TEMPORARY",
    addressLocality: "Delft",
    workHours: "Event based shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["events", "hospitality"],
    externalUrl: "https://careers.rai.nl/departments/flex",
  },
  {
    slug: "lidl-verkoopmedewerker-delft-herculeshof-16-32-Delft",
    title: "Lidl Verkoopmedewerker Delft Herculeshof (16 to 32 h/week)",
    orgName: "Lidl",
    descriptionHtml:
      "<p>Allround supermarket role: fill shelves, keep the store tidy, help customers, and work the register. Flexible shifts, including evenings and weekends.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    area: "Herculeshof",
    workHours: "16 to 32 h/week",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl:
      "https://www.werkenbijlidl.nl/jobs/verkoopmedewerker-delft-herculeshof-16-32-uur-delft-596909",
  },

  {
    slug: "gamma-bijbaan-verkoopmedewerker-delft-belvedere-Delft",
    title: "GAMMA Bijbaan Verkoopmedewerker (Delft BelvÃ©dÃ¨re, 3 to 12 h/week)",
    orgName: "GAMMA",
    descriptionHtml:
      "<p>DIY store assistant job: help customers, learn products, keep aisles tidy, and support the team. Flexible availability, evenings and weekends. Dutch required.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    area: "Delft BelvÃ©dÃ¨re",
    workHours: "3 to 12 h/week",
    datePosted: "2026/02/14",
    validThrough: "2026-04-07",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijgamma.nl/vacature/14961/bijbaan-verkoopmedewerker-116",
  },

  {
    slug: "lidl-bijbaan-weekendhulp-vakkenvuller-kassamedewerker-kies-winkel-Delft",
    title: "Lidl Bijbaan (Weekendhulp, Vakkenvuller, Kassamedewerker) choose Delft store",
    orgName: "Lidl",
    descriptionHtml:
      "<p>Student job at Lidl. Apply once and select one or more Delft stores during the application. Roles include shelf stacking, cashier, and general store support. Hourly pay depends on age and hours.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 6.06,
    baseSalaryMax: 19.08,
    currency: "EUR",
    payUnit: "HOUR",
    addressLocality: "Delft",
    workHours: "Flexible",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijlidl.nl/supermarkt/bijbaan",
  },

  {
    slug: "hema-winkelmedewerker-kies-delft-Delft",
    title: "HEMA Store roles (choose Delft in the vacancy search)",
    orgName: "HEMA",
    descriptionHtml:
      "<p>HEMA store jobs like winkelmedewerker or horecamedewerker. Use the vacancy search and filter for Delft to see the current open roles.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Varies by store",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijhema.nl/",
  },

  {
    slug: "primark-retail-assistant-zoek-delft-Delft",
    title: "Primark Retail Assistant (search Delft on the Primark job site)",
    orgName: "Primark",
    descriptionHtml:
      "<p>Retail Assistant roles at Primark. Use the Primark vacancies search and select Delft to see the currently open positions.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Store shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://careers.primark.com/nl",
  },
];

RAW_JOBS.push(...NEW_JOBS);

const NEW_JOBS2: RawJob[] = [
  {
    slug: "kfc-horecamedewerker-delft-parttime-Delft",
    title: "KFC Horecamedewerker (Delft, part time)",
    orgName: "KFC",
    descriptionHtml:
      "<p>Fast paced hospitality job: help guests, prepare orders, keep the restaurant clean, and work in a team. Shifts typically include evenings and weekends.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Shifts (part time)",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl: "https://careers.kfc.nl/vacatures/horecamedewerker/kfc-delft/80574",
  },

  {
    slug: "bastion-supervisor-housekeeping-delft-30-38-Delft",
    title: "Bastion Hotels Supervisor Housekeeping (Delft, 30 to 38 h/week)",
    orgName: "Bastion Hotels",
    descriptionHtml:
      "<p>Lead the housekeeping team, plan daily operations, and quality-check rooms and public areas. Listed starting salary is â‚¬2364.04 gross per month based on a 38 hour week, plus allowances.</p>",
    employmentType: "PART_TIME",
    baseSalaryMin: 2364.04,
    baseSalaryMax: 2364.04,
    currency: "EUR",
    payUnit: "MONTH",
    addressLocality: "Delft",
    workHours: "30 to 38 h/week",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality"],
    externalUrl:
      "https://www.werkenbijbastionhotels.nl/delft/shiftleader-housekeeping",
  },
];

RAW_JOBS.push(...NEW_JOBS2);

const NEW_JOBS3: RawJob[] = [
  {
    slug: "jumbo-vakkenvuller-delft-avond-weekend-Delft",
    title: "Jumbo Vakkenvuller (Evening and Weekend shifts)",
    orgName: "Jumbo",
    descriptionHtml:
      "<p>Stock shelves, assist customers, and keep the supermarket organized. Typical student job with evening and weekend shifts.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Flexible evening and weekend shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijjumbo.nl/vacatures",
  },
  {
    slug: "thuisbezorgd-bezorger-delft-Delft",
    title: "Thuisbezorgd Delivery Driver (Delft)",
    orgName: "Thuisbezorgd.nl",
    descriptionHtml:
      "<p>Deliver meals by bike or scooter in Delft. Flexible hours, contract based employment, and paid per hour.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    englishFriendly: true,
    workHours: "Flexible shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["delivery"],
    externalUrl: "https://www.justeattakeaway.com/careers/jobs",
  },
  {
    slug: "dominos-pizza-bezorger-delft-Delft",
    title: "Domino's Pizza Delivery Driver (Delft)",
    orgName: "Domino's Pizza",
    descriptionHtml:
      "<p>Deliver pizzas and assist in store during quieter hours. Evening focused shifts, suitable for students.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Evenings and weekends",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["delivery", "hospitality"],
    externalUrl: "https://www.werkenbijdominos.nl/vacatures",
  },
  {
    slug: "action-winkelmedewerker-delft-Delft",
    title: "Action Winkelmedewerker (Delft)",
    orgName: "Action",
    descriptionHtml:
      "<p>Retail assistant role: cashier, shelf restocking, and helping customers. Fast paced discount retail environment.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Flexible store shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://werkenbij.action.com/nl/vacatures",
  },

];

RAW_JOBS.push(...NEW_JOBS3);

const NEW_JOBS4: RawJob[] = [
  {
    slug: "vue-bioscoop-medewerker-delft-Delft",
    title: "Vue Cinema Employee (Delft)",
    orgName: "Vue Cinemas",
    descriptionHtml:
      "<p>Work at the cinema: ticket scanning, bar service, and customer assistance. Flexible shifts including evenings.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Evening and weekend shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["hospitality", "events"],
    externalUrl: "https://www.werkenbijvue.nl/vacatures",
  },
  {
    slug: "sacha-verkoopmedewerker-delft-Delft",
    title: "Sacha Verkoopmedewerker (Delft)",
    orgName: "Sacha",
    descriptionHtml:
      "<p>Fashion retail job: help customers, manage stock, and support visual merchandising in store.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "Part time retail shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["retail"],
    externalUrl: "https://www.werkenbijsacha.nl/vacatures",
  },
  {
    slug: "studentchauffeur-delft-ubiway-Delft",
    title: "Student Driver (Delft region)",
    orgName: "Student Chauffeurs",
    descriptionHtml:
      "<p>Drive clients in their own cars to meetings or airports. Flexible scheduling, ideal for students with a driving license.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    workHours: "On call, flexible",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["fieldwork"],
    externalUrl: "https://www.studentchauffeurs.nl/vacatures",
  },
  {
    slug: "asa-talent-warehouse-worker-delft-Delft",
    title: "Warehouse Worker (via ASA Talent, Delft)",
    orgName: "ASA Talent",
    descriptionHtml:
      "<p>Warehouse and fieldwork roles in Delft. Order picking, packing, and distribution center support.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    englishFriendly: true,
    workHours: "Shifts",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["fieldwork"],
    externalUrl: "https://www.asatalent.nl/vacatures",
  },
  {
    slug: "redbull-wings-team-delft-Delft",
    title: "Red Bull Wings Team Member (Delft)",
    orgName: "Red Bull",
    descriptionHtml:
      "<p>Promotional student role: represent Red Bull on campus and at events. Brand activation, sampling, and social engagement.</p>",
    employmentType: "PART_TIME",
    addressLocality: "Delft",
    englishFriendly: true,
    workHours: "Flexible student schedule",
    datePosted: "2026/02/14",
    validThrough: "2026-12-31",
    categories: ["sales", "events"],
    externalUrl: "https://jobs.redbull.com/nl-nl",
  },
];

RAW_JOBS.push(...NEW_JOBS4);



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



