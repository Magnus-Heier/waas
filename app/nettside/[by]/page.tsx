import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnnouncementBar } from "@/app/components/AnnouncementBar";
import { ContactForm } from "@/app/components/ContactForm";
import { Header } from "@/app/components/Header";
import { PortfolioGrid } from "@/app/components/PortfolioGrid";
import JsonLd from "@/app/components/JsonLd";
import { PricingSection } from "@/app/components/PricingSection";
import { cities } from "@/data/cities";
import { industries } from "@/data/industries";
import { SITE_URL } from "@/lib/site";

const services = [
  {
    title: "Skreddersydd Webdesign",
    desc: "Profesjonelle nettsider tilpasset din merkevare og dine mål.",
  },
  {
    title: "SEO-optimalisering",
    desc: "Innebygd søkemotoroptimalisering så kunder finner deg på Google.",
  },
  {
    title: "Nettside-redesign",
    desc: "Moderniser din utdaterte nettside med en frisk design som konverterer.",
  },
  {
    title: "Hosting og vedlikehold",
    desc: "Pålitelig hosting og løpende support for kr 490/mnd.",
  },
];

const cityFaqs = [
  {
    q: "Hvor mye koster en nettside?",
    a: (city: string) =>
      `Våre pakker starter fra kr 5 500 engangsbelastning, pluss månedlig hosting og vedlikehold fra kr 490/mnd. Samme priser gjelder for småbedrifter i ${city}.`,
  },
  {
    q: "Hvor lang tid tar det å bygge en nettside?",
    a: () =>
      "Vi leverer ofte nettsider på 3–7 dager. Tidsbruken avhenger av omfanget og hvor raskt vi mottar innhold og tilbakemeldinger fra deg.",
  },
  {
    q: "Vil nettsiden min rangere på Google?",
    a: () =>
      "Ja. Alle våre nettsider er SEO-optimalisert fra starten, inkludert for lokale søk i ditt område.",
  },
  {
    q: "Jobber dere med bedrifter utenfor min lokasjon?",
    a: (city: string) =>
      `Ja, vi jobber med bedrifter over hele Norge — inkludert i ${city}. Vi leverer eksternt med samme kvalitet.`,
  },
  {
    q: "Hva skiller dere fra andre webyråer?",
    a: () =>
      "Vi fokuserer på småbedrifter, transparent prising i NOK, rask levering og løpende support. Du får en dedikert kontakt og ingen skjulte kostnader.",
  },
];

type Props = {
  params: Promise<{ by: string }>;
  searchParams?: { bransjer?: string };
};

export async function generateStaticParams() {
  return cities.map((c) => ({ by: c.slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { by } = await params;
  const city = cities.find((c) => c.slug === by);
  if (!city) return { title: "Nettside | Fra kr 5 500" };
  const title = `Nettside ${city.name} | Fra kr 5 500`;
  const description = `Profesjonell nettside ${city.name} for småbedrifter. Fra kr 5 500, live på 3–7 dager. Design og SEO som treffer søk som "nettside ${city.name}". Gratis hjemmesidedesign.`;
  const url = `${SITE_URL}/nettside/${by}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Nettside ${city.name} | weboki Norge`,
      description: `Profesjonell nettside ${city.name} for småbedrifter.`,
      url,
      siteName: "weboki Norge",
      locale: "nb_NO",
      type: "website",
      images: [{ url: `${SITE_URL}/og/by/${by}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params, searchParams }: Props) {
  const { by } = await params;
  const city = cities.find((c) => c.slug === by);
  if (!city) notFound();

  const showAllBransjer = searchParams?.bransjer === "all";
  const shownIndustries = showAllBransjer ? industries : industries.slice(0, 8);
  const showMoreCard = industries.length > 8 && !showAllBransjer;

  const nearby = city.nearbyCities
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is (typeof cities)[number] => Boolean(c));

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "weboki",
    description: `Profesjonell nettside for småbedrifter i ${city.name}`,
    url: `${SITE_URL}/nettside/${city.slug}`,
    areaServed: city.name,
    priceRange: "kr 5 500 – kr 23 000",
    telephone: "+4748660715",
    address: { "@type": "PostalAddress", addressCountry: "NO" },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <JsonLd data={localBusinessSchema} />
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
            Nettside {city.name} for Småbedrifter
          </h1>
          <p className="relative mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Skreddersydde nettsider for bedrifter i {city.name}. Fra kr 5 500.
            Live på 3–7 dager. La kundene i {city.name} finne deg på Google.
            
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

        {/* Local hook */}
        <section className="border-t border-white/10 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg text-gray-300 leading-relaxed">{city.localBlurb}</p>
          </div>
        </section>

        {/* What we offer */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Hva Vi Tilbyr</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why [city] businesses need a website */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Hvorfor bedrifter i {city.name} trenger en nettside
            </h2>
          </div>
          <ul className="mx-auto mt-12 max-w-2xl space-y-4">
            {[
              `Kunder i ${city.name} søker på Google etter lokale tjenester — uten nettside finner de deg ikke.`,
              `Konkurrentene dine i ${city.name} med nettside får flere henvendelser og oppdrag.`,
              `En profesjonell nettside bygger tillit og viser at du er etablert i ${city.name}.`,
              `Lokalt SEO gjør at du vises når noen søker etter din bransje i ${city.name}.`,
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-gray-300"
              >
                <span className="mt-1 text-[#f5a623]">✓</span>
                {text}
              </li>
            ))}
          </ul>
        </section>

        <PricingSection highlightCity={city.name} />

        {/* Industries we serve in [city] */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Bransjer vi betjener i {city.name}
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {shownIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/nettsider-for/${ind.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-semibold">{ind.name}</h3>
                <p className="mt-2 text-sm text-[#f5a623]">Les mer →</p>
              </Link>
            ))}
            {showMoreCard && (
              <Link
                href={`/nettside/${city.slug}?bransjer=all`}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-semibold">Og mer</h3>
                <p className="mt-2 text-sm text-[#f5a623]">
                  Se alle bransjer →
                </p>
              </Link>
            )}
          </div>
        </section>

        {/* Portfolio */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Vårt Nylige Arbeid</h2>
            <p className="mt-4 inline-block rounded-full bg-[#f5a623] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(245,166,35,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
              månedene
            </p>
          </div>
          <PortfolioGrid count={4} />
          <p className="mt-8 text-center">
            <Link href="/#arbeid" className="font-medium text-[#f5a623] hover:underline">
              Se hele porteføljen
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Vanlige Spørsmål</h2>
          </div>
          <div className="mx-auto mt-12 max-w-2xl space-y-2">
            {cityFaqs.map((faq) => (
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
                  {typeof faq.a === "function" ? faq.a(city.name) : faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Nearby cities */}
        <section className="border-t border-white/10 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-xl font-bold text-gray-400">
              Også aktive i nærliggende byer
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {nearby.map((c) => (
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
            <h2 className="text-3xl font-bold md:text-4xl">Få gratis tilbud i {city.name}</h2>
            <p className="mt-4 text-gray-400">
              Fortell oss om bedriften din — vi kommer tilbake med et uforpliktende tilbud.
            </p>
            <ContactForm ctaLabel={`Få gratis tilbud i ${city.name}`} />
            <p className="mt-4 text-xs text-gray-500">Informasjonen din er sikker. Ingen spam.</p>
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

