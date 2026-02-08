// src/components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="text-lg sm:text-xl font-semibold">Student Jobs Delft</div>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Student jobs, bijbaan tips, and city guides for Delft. Find English friendly roles, compare pay, and apply
            fast.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Some links may be partner links. This helps support the site at no extra cost to you.
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Explore Student Jobs Delft">
          <div className="font-semibold">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="underline underline-offset-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/jobs" className="underline underline-offset-2">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/categories" className="underline underline-offset-2">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/blog" className="underline underline-offset-2">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/employers" className="underline underline-offset-2">
                Employers (Post a job)
              </Link>
            </li>
            <li>
              <Link href="/contact" className="underline underline-offset-2">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Popular reads */}
        <nav aria-label="Popular student job guides">
          <div className="font-semibold">Popular reads</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/blog/english-speaking-student-jobs-delft" className="underline underline-offset-2">
                English Speaking Student Jobs in Delft
              </Link>
            </li>
            <li>
              <Link href="/blog/best-paying-student-jobs-delft-2026" className="underline underline-offset-2">
                Best Paying Student Jobs in Delft (2026)
              </Link>
            </li>
            <li>
              <Link href="/blog/student-jobs-delft-complete-guide-2026" className="underline underline-offset-2">
                Student Jobs Delft Complete Guide (2026)
              </Link>
            </li>
          </ul>
        </nav>

 {/* City network */}
    <nav aria-label="Student Jobs city network">
      <div className="font-semibold">More cities</div>
      <ul className="mt-3 space-y-2 text-sm">
        <li>
          <a
            href="https://www.studentjobsamsterdam.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Amsterdam
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobsgroningen.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Groningen
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobsrotterdam.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Rotterdam
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobseindhoven.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Eindhoven
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobsdelft.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Delft
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobsenchede.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Jobs Enschede
          </a>
        </li>

        <li>
          <a
            href="https://www.studentjobmaastricht.nl/"
            className="underline underline-offset-2"
            rel="noopener"
          >
            Student Job Maastricht
          </a>
        </li>
      </ul>

      <p className="mt-3 text-xs text-slate-500">
        Looking for a bijbaan in another city? Browse our local job boards and guides.
      </p>
    </nav>
  </div>

      {/* Bottom bar */}
      <div className="bg-white border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {year} Student Jobs Delft. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy
            </Link>
            <Link href="/terms" className="underline underline-offset-2">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="underline underline-offset-2">
              Sitemap
            </Link>
            <a href="#main" className="underline underline-offset-2">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
