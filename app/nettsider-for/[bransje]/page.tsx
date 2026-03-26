import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/app/components/AnnouncementBar";
import { ContactForm } from "@/app/components/ContactForm";
import { Header } from "@/app/components/Header";
import JsonLd from "@/app/components/JsonLd";
import { PortfolioGrid } from "@/app/components/PortfolioGrid";
import { PricingSection } from "@/app/components/PricingSection";
import { cities } from "@/data/cities";
import { industries } from "@/data/industries";
import { SITE_URL } from "@/lib/site";

const topCitySlugs = [
  "oslo",
  "bergen",
  "trondheim",
  "stavanger",
  "kristiansand",
];

type Props = { params: Promise<{ bransje: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ bransje: i.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { bransje } = await params;
  const industry = industries.find((i) => i.slug === bransje);
  if (!industry) return { title: "Nettside | Fra kr 5 500" };
  const title = `Nettside til ${industry.keyword} | Generer Flere Leads`;
  const description = `Profesjonell nettside til ${industry.keyword} i Norge. Vis tjenester, bygg tillit og generer leads. Fra kr 5 500.`;
  const url = `${SITE_URL}/nettsider-for/${bransje}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Nettside til ${industry.keyword} | weboki Norge`,
      description: `Profesjonell nettside til ${industry.keyword} i Norge.`,
      url,
      siteName: "weboki Norge",
      locale: "nb_NO",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og/bransje/${bransje}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { bransje } = await params;
  const industry = industries.find((i) => i.slug === bransje);
  if (!industry) notFound();

  const related = industry.relatedIndustries
    .map((slug) => industries.find((i) => i.slug === slug))
    .filter((i): i is (typeof industries)[number] => Boolean(i));

  const topCities = topCitySlugs
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is (typeof cities)[number] => Boolean(c));

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Nettside til ${industry.keyword}`,
    provider: { "@type": "Organization", name: "weboki Norge" },
    description: industry.heroHeadline,
    url: `${SITE_URL}/nettsider-for/${industry.slug}`,
    areaServed: "Norge",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <JsonLd data={serviceSchema} />
      <AnnouncementBar />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,166,35,0.15),transparent)]"
            aria-hidden
          />
          <h1 className="relative text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Nettside til {industry.keyword}
          </h1>
          <p className="relative mt-6 max-w-2xl text-lg text-[#f5a623] font-medium md:text-xl">
            {industry.heroHeadline}
          </p>
          <p className="relative mt-6 inline-block rounded-full bg-[#f5a623] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(245,166,35,0.3)]">
            Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
            månedene
          </p>
          <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-[#f5a623] px-6 py-3.5 font-semibold text-[#1a1a1a] transition hover:bg-[#e0951f]"
            >
              Få Gratis Design →
            </Link>
            <a
              href="tel:+4748660715"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 font-semibold transition hover:border-[#f5a623] hover:bg-white/5"
            >
              Ring Nå: +47 48 66 07 15
            </a>
          </div>
        </section>

        {/* Problem block */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Uten nettside skjer dette
            </h2>
          </div>
          <ul className="mx-auto mt-12 max-w-2xl space-y-4">
            {industry.painPoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-300"
              >
                <span className="text-[#f5a623]">✕</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Features */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Hva nettsiden din får
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industry.features.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5a623]/20 text-[#f5a623]">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <h3 className="font-semibold">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Slik Fungerer Det
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Ta kontakt",
                desc: "Ring oss eller fyll ut skjemaet. Fortell oss om bedriften din.",
              },
              {
                step: "02",
                title: "Vi designer og bygger",
                desc: "Vi lager din skreddersydde nettside med SEO innebygd fra dag én.",
              },
              {
                step: "03",
                title: "Gå live på under en uke",
                desc: "Din profesjonelle nettside lanseres og begynner å tiltrekke kunder.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
              >
                <span className="text-3xl font-bold text-[#f5a623]">
                  {item.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <PricingSection />

        {/* Portfolio */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Relevant arbeid for {industry.name}
            </h2>
            <p className="mt-4 inline-block rounded-full bg-[#f5a623] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(245,166,35,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
              månedene
            </p>
          </div>
          <PortfolioGrid count={2} />
          <p className="mt-8 text-center">
            <Link href="/#arbeid" className="font-medium text-[#f5a623] hover:underline">
              Se hele porteføljen
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Vanlige Spørsmål
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-2xl space-y-2">
            {industry.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 [&[open]]:border-[#f5a623]/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {faq.q}
                    <svg
                      className="h-5 w-5 shrink-0 text-[#f5a623] transition group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="border-t border-white/10 px-5 py-4 text-gray-400">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related industries */}
        <section className="border-t border-white/10 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold text-gray-400">
              Også nettsider for
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {related.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/nettsider-for/${ind.slug}`}
                  className="rounded-lg border border-white/20 px-4 py-2 text-gray-300 transition hover:border-[#f5a623] hover:text-[#f5a623]"
                >
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Top cities */}
        <section className="border-t border-white/10 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold text-gray-400">
              Vi betjener {industry.name.toLowerCase()} i hele Norge
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {topCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/nettside/${c.slug}`}
                  className="rounded-lg border border-white/20 px-4 py-2 text-gray-300 transition hover:border-[#f5a623] hover:text-[#f5a623]"
                >
                  Nettside {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Få en nettside for {industry.name}
            </h2>
            <p className="mt-4 text-gray-400">
              Fortell oss om bedriften din — vi kommer tilbake med et uforpliktende tilbud.
            </p>
            <ContactForm ctaLabel={`Be om gratis design for ${industry.name}`} />
            <p className="mt-4 text-xs text-gray-500">
              Informasjonen din er sikker. Ingen spam.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-gray-500">
        <Link href="/" className="text-[#f5a623] hover:underline">
          Til forsiden
        </Link>
        {" · "}
        © {new Date().getFullYear()} weboki
      </footer>
    </div>
  );
}

