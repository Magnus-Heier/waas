import Link from "next/link";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { ContactForm } from "./components/ContactForm";
import { Header } from "./components/Header";
import { cities } from "@/data/cities";
import { industries } from "@/data/industries";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnnouncementBar />
      <Header />

      <main>
        {/* 3. Hero */}
        <section
          id="hjem"
          className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center md:px-6"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]"
            aria-hidden
          />
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-4 py-1.5 text-sm text-[#3b82f6]">
            <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
            Tar nå imot nye kunder
          </span>
          <h1 className="relative max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Rimelig Webdesign for Små og Mellomstore bedrifter
          </h1>
          <p className="relative mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Skreddersydde nettsider som gjør besøkende til kunder. Fra kr 5 500.
            Nettsiden er live på 3–7 dager. Betjener småbedrifter over hele
            Norge.
          </p>
          <p className="relative mt-6 inline-block rounded-full bg-[#3b82f6] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
            månedene
          </p>
          <div className="relative mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-[#3b82f6] px-6 py-3.5 font-semibold text-[#1a1a1a] transition hover:bg-[#2563eb]"
            >
              Få Gratis Hjemmesidedesign →
            </a>
            <a
              href="tel:+4748660715"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 font-semibold transition hover:border-[#3b82f6] hover:bg-white/5"
            >
              Ring Nå: +47 48 66 07 15
            </a>
          </div>
          <div className="relative mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#3b82f6]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Betrodd over hele Norge
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Rask 3–7 dagers levering
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Basert i Oslo
            </span>
          </div>
        </section>

        {/* 4. Stats */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Kundene dine søker etter deg på nett
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Og hvis de ikke finner deg, finner de konkurrentene dine.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]">
              <p className="text-4xl font-bold text-[#3b82f6] md:text-5xl">80%</p>
              <p className="mt-4 text-gray-300">
                av forbrukere søker på nett før de besøker en lokal bedrift
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]">
              <p className="text-4xl font-bold text-[#3b82f6] md:text-5xl">46%</p>
              <p className="mt-4 text-gray-300">
                av alle Google-søk er etter lokal informasjon
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]">
              <p className="text-4xl font-bold text-[#3b82f6] md:text-5xl">75%</p>
              <p className="mt-4 text-gray-300">
                av brukere vurderer en bedrifts troverdighet basert på nettsiden
              </p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-gray-400">
            Hver dag uten en profesjonell nettside er en dag med tapte inntekter.
          </p>
        </section>

        {/* 5. Services */}
        <section id="tjenester" className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Hva Vi Gjør</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
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
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Industries */}
        <section id="bransjer" className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Nettsider Bygget for Din Bransje
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Salonger", desc: "Booking og portefølje for salonger og frisører." },
              { name: "Restauranter", desc: "Meny, åpningstider og bordbestilling." },
              { name: "Håndverkere", desc: "Tjenester, referanser og enkel kontaktside." },
              { name: "Tannleger", desc: "Trygg og profesjonell nettside for tannklinikker." },
              { name: "Advokater", desc: "Tjenester, team og kontaktskjema for advokatkontor." },
              { name: "Eiendomsmeglere", desc: "Listinger og lead-generering for meglerne." },
            ].map((i) => (
              <div
                key={i.name}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9a9 9 0 009 9m-9-9a9 9 0 009-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">{i.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{i.desc}</p>
                <a
                  href="#"
                  className="mt-3 inline-block text-sm font-medium text-[#3b82f6] hover:underline"
                >
                  Les mer
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Locations */}
        <section id="lokasjoner" className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Betjener Små bedrifter Over Hele Norge
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
            <ul className="space-y-2 text-gray-300">
              {["Oslo", "Bergen", "Trondheim", "Stavanger", "Kristiansand", "Tromsø"].map(
                (city) => (
                  <li key={city} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                    {city}
                  </li>
                )
              )}
            </ul>
            <ul className="space-y-2 text-gray-300">
              {["Drammen", "Fredrikstad", "Sandnes", "Bodø", "Ålesund", "Haugesund"].map(
                (city) => (
                  <li key={city} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
                    {city}
                  </li>
                )
              )}
            </ul>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-gray-400">
            Vi jobber med bedrifter eksternt og leverer høy kvalitet uansett
            lokasjon.
          </p>
        </section>

        {/* 8. How It Works */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Slik Fungerer Det</h2>
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
                className="rounded-xl border border-white/10 bg-white/5 p-8 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <span className="text-3xl font-bold text-[#3b82f6]">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Pricing */}
        <section id="priser" className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Enkel, Transparent Prising
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
            {/* Starter */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="mt-2 text-3xl font-bold">kr 5 500</p>
              <p className="text-gray-400">+ kr 490/mnd</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li>Opptil 5 sider</li>
                <li>Mobilvennlig, Grunnleggende SEO, Kontaktskjema</li>
                <li>Hosting & SSL, Månedlig vedlikehold</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">Best for: Salonger, restauranter, frisører</p>
              <a
                href="#kontakt"
                className="mt-6 block w-full rounded-lg border border-white/30 py-2.5 text-center font-semibold transition hover:border-[#3b82f6] hover:bg-[#3b82f6]/10"
              >
                Kom i Gang
              </a>
            </div>

            {/* Profesjonell - highlighted */}
            <div className="relative rounded-xl border-2 border-[#3b82f6] bg-[#3b82f6]/5 p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] transition hover:bg-[#3b82f6]/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#3b82f6] px-3 py-0.5 text-xs font-semibold text-[#1a1a1a]">
                Mest Populær
              </span>
              <h3 className="text-lg font-semibold">Profesjonell</h3>
              <p className="mt-2 text-3xl font-bold">kr 14 000</p>
              <p className="text-gray-400">+ kr 790/mnd</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li>Opptil 10 sider</li>
                <li>Alt i Starter + Innholdsskrivning, Avansert SEO</li>
                <li>Google Bedriftsprofil, Bookingintegrasjon, Blogg-oppsett</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">Best for: Tannleger, advokater, eiendom</p>
              <a
                href="#kontakt"
                className="mt-6 block w-full rounded-lg bg-[#3b82f6] py-2.5 text-center font-semibold text-[#1a1a1a] transition hover:bg-[#2563eb]"
              >
                Kom i Gang
              </a>
            </div>

            {/* Profesjonell Pluss */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
              <h3 className="text-lg font-semibold">Profesjonell Pluss</h3>
              <p className="mt-2 text-3xl font-bold">kr 23 000</p>
              <p className="text-gray-400">+ kr 990/mnd</p>
              <ul className="mt-6 space-y-2 text-sm text-gray-300">
                <li>Opptil 15 sider</li>
                <li>Alt i Profesjonell + E-handel med Stripe</li>
                <li>Admin-dashboard, Medlemsportal, Løpende SEO & rapportering</li>
              </ul>
              <p className="mt-4 text-sm text-gray-400">Best for: Skalerende bedrifter, nettbutikker</p>
              <a
                href="#kontakt"
                className="mt-6 block w-full rounded-lg border border-white/30 py-2.5 text-center font-semibold transition hover:border-[#3b82f6] hover:bg-[#3b82f6]/10"
              >
                Kom i Gang
              </a>
            </div>
          </div>
        </section>

        {/* 10. Portfolio */}
        <section id="arbeid" className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Vårt Nylige Arbeid</h2>
            <p className="mt-4 inline-block rounded-full bg-[#3b82f6] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
              månedene
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <div className="aspect-video bg-white/10 flex items-center justify-center text-gray-500 text-sm">
                  Bilde kommer
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-gray-500">Kategori (placeholder)</span>
                  <h3 className="mt-1 font-semibold text-gray-400">Prosjekttittel {n}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Beskrivelse kommer
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            <a
              href="#"
              className="font-medium text-[#3b82f6] hover:underline"
            >
              Se hele porteføljen
            </a>
          </p>
        </section>

        {/* 11. Results / Case Studies */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ekte Resultater for Ekte Bedrifter
            </h2>
            <p className="mt-4 inline-block rounded-full bg-[#3b82f6] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
              månedene
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <h3 className="font-semibold text-gray-400">Bedriftsnavn (placeholder)</h3>
                <p className="mt-1 text-sm text-gray-500">Kort historie kommer</p>
                <div className="mt-4 flex gap-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-500">—</p>
                    <p className="text-xs text-gray-500">måler 1</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-500">—</p>
                    <p className="text-xs text-gray-500">måler 2</p>
                  </div>
                </div>
                <span className="mt-4 inline-block text-sm text-gray-500">
                  Les casestudie (kommer)
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Testimonials */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Hva Våre Kunder Sier</h2>
            <p className="mt-4 inline-block rounded-full bg-[#3b82f6] px-6 py-2.5 text-xl font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3 første
              månedene
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
              >
                <p className="text-gray-500">&ldquo;Anmeldelsestekst kommer&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-gray-500">
                    —
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Navn (placeholder)</p>
                    <p className="text-sm text-gray-500">Bedrift, By</p>
                  </div>
                </div>
                <span className="mt-2 inline-block text-xs text-gray-500">
                  Verifisert kunde · Google-anmeldelse (placeholder)
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 13. FAQ */}
        <section className="border-t border-white/10 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Vanlige Spørsmål</h2>
          </div>
          <div className="mx-auto mt-12 max-w-2xl space-y-2">
            {[
              { q: "Hvor mye koster en nettside?", a: "Våre pakker starter fra kr 5 500 engangsbelastning, pluss månedlig hosting og vedlikehold fra kr 490/mnd. Du får en skreddersydd, mobilvennlig nettside med grunnleggende SEO." },
              { q: "Hvor lang tid tar det å bygge en nettside?", a: "Vi leverer ofte nettsider på 3–7 dager. Tidsbruken avhenger av omfanget og hvor raskt vi mottar innhold og tilbakemeldinger fra deg." },
              { q: "Vil nettsiden min rangere på Google?", a: "Ja. Alle våre nettsider er SEO-optimalisert fra starten. Vi bygger inn gode titler, beskrivelser og struktur slik at Google og brukere finner deg." },
              { q: "Jobber dere med bedrifter utenfor Oslo?", a: "Absolutt. Vi jobber med småbedrifter over hele Norge eksternt. Du trenger ikke å møte oss fysisk – vi kommuniserer via telefon, e-post og videomøter." },
              { q: "Hva skiller dere fra andre webyråer?", a: "Vi fokuserer på småbedrifter, transparent prising i NOK, rask levering og løpende support. Du får en dedikert kontakt og ingen skjulte kostnader." },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/10 bg-white/5 transition hover:border-white/20 [&[open]]:border-[#3b82f6]/40"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {faq.q}
                    <svg className="h-5 w-5 shrink-0 text-[#3b82f6] transition group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="border-t border-white/10 px-5 py-4 text-gray-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal links for SEO */}
        <section className="border-t border-white/10 px-4 py-16 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-400">
                  Nettsider per by
                </h2>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                  {cities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/nettside/${c.slug}`}
                        className="text-sm text-gray-400 hover:text-[#3b82f6]"
                      >
                        Nettside {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-400">
                  Nettsider per bransje
                </h2>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                  {industries.map((i) => (
                    <li key={i.slug}>
                      <Link
                        href={`/nettsider-for/${i.slug}`}
                        className="text-sm text-gray-400 hover:text-[#3b82f6]"
                      >
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Footer CTA */}
        <section
          id="kontakt"
          className="border-t border-white/10 bg-[#0a0a0a] px-4 py-20 md:px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Klar til å Løfte Din Tilstedeværelse på Nett?
            </h2>
            <p className="mt-4 text-gray-400">
              Små bedrifter over hele Norge stoler på oss. La oss bygge noe bra
              sammen.
            </p>
            <ContactForm
              ctaLabel="Be om Gratis Design"
              formId="kontakt-form"
            />
            <p className="mt-4 text-xs text-gray-500">
              Informasjonen din er sikker. Ingen spam, det lover vi.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Weboki. Alle rettigheter reservert.
      </footer>
    </div>
  );
}
