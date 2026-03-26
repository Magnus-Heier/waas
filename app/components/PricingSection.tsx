import Link from "next/link";

type PricingSectionProps = {
  highlightCity?: string;
};

const contactHref = "/#kontakt";

export function PricingSection({
  highlightCity,
}: PricingSectionProps) {
  return (
    <section className="border-t border-white/10 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Enkel, Transparent Prising
        </h2>
        {highlightCity && (
          <p className="mt-3 text-lg text-[#f5a623] font-medium">
            Samme priser for småbedrifter i {highlightCity}
          </p>
        )}
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
          <h3 className="text-lg font-semibold">Starter</h3>
          <p className="mt-2 text-3xl font-bold">kr 5 500</p>
          <p className="text-gray-400">+ kr 490/mnd</p>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>Opptil 5 sider</li>
            <li>Mobilvennlig, Grunnleggende SEO, Kontaktskjema</li>
            <li>Hosting & SSL, Månedlig vedlikehold</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            Best for: Salonger, restauranter, frisører
          </p>
          <Link
            href={contactHref}
            className="mt-6 block w-full rounded-lg border border-white/30 py-2.5 text-center font-semibold transition hover:border-[#f5a623] hover:bg-[#f5a623]/10"
          >
            Kom i Gang
          </Link>
        </div>
        <div className="relative rounded-xl border-2 border-[#f5a623] bg-[#f5a623]/5 p-6 shadow-[0_0_30px_rgba(245,166,35,0.15)] transition hover:bg-[#f5a623]/10">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f5a623] px-3 py-0.5 text-xs font-semibold text-[#1a1a1a]">
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
          <p className="mt-4 text-sm text-gray-400">
            Best for: Tannleger, advokater, eiendom
          </p>
          <Link
            href={contactHref}
            className="mt-6 block w-full rounded-lg bg-[#f5a623] py-2.5 text-center font-semibold text-[#1a1a1a] transition hover:bg-[#e0951f]"
          >
            Kom i Gang
          </Link>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/[0.07]">
          <h3 className="text-lg font-semibold">Profesjonell Pluss</h3>
          <p className="mt-2 text-3xl font-bold">kr 23 000</p>
          <p className="text-gray-400">+ kr 990/mnd</p>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            <li>Opptil 15 sider</li>
            <li>Alt i Profesjonell + E-handel med Stripe</li>
            <li>Admin-dashboard, Medlemsportal, Løpende SEO & rapportering</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400">
            Best for: Skalerende bedrifter, nettbutikker
          </p>
          <Link
            href={contactHref}
            className="mt-6 block w-full rounded-lg border border-white/30 py-2.5 text-center font-semibold transition hover:border-[#f5a623] hover:bg-[#f5a623]/10"
          >
            Kom i Gang
          </Link>
        </div>
      </div>
    </section>
  );
}
