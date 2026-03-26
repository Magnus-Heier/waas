import { slugify } from "@/lib/slugify";

export const cities = [
  {
    slug: "oslo",
    name: "Oslo",
    population: "700 000",
    localBlurb:
      "Oslo er Norges største by med intens konkurranse på tvers av alle bransjer. Enten du er i Grünerløkka, Majorstuen eller Aker Brygge — kundene dine søker på nett før de tar kontakt.",
    nearbyCities: ["drammen", "fredrikstad", "moss"],
  },
  {
    slug: "bergen",
    name: "Bergen",
    population: "285 000",
    localBlurb:
      "Bergen er Vestlandets handelssentrum. Lokale bedrifter i Bergenhus, Fana og Åsane konkurrerer om synlighet på Google hver eneste dag.",
    nearbyCities: ["alesund", "haugesund", "stavanger"],
  },
  {
    slug: "trondheim",
    name: "Trondheim",
    population: "205 000",
    localBlurb:
      "I Trondheim søker både studenter og etablerte familier etter lokale tjenester på nett. En profesjonell nettside skiller deg fra konkurrentene i Midt-Norge.",
    nearbyCities: ["molde", "alesund", "lillehammer"],
  },
  {
    slug: "stavanger",
    name: "Stavanger",
    population: "—",
    localBlurb:
      "Stavanger og regionen har mange småbedrifter som konkurrerer om synlighet. Vi hjelper deg å bli funnet på Google og få flere henvendelser.",
    nearbyCities: ["bergen", "haugesund", "kristiansand"],
  },
  {
    slug: "kristiansand",
    name: "Kristiansand",
    population: "115 000",
    localBlurb:
      "Sørlandets største by har et aktivt næringsliv. Kunder i Kristiansand søker ofte etter «nær meg» — uten en nettside havner du ikke i søkeresultatene.",
    nearbyCities: ["arendal", "stavanger", "tonsberg"],
  },
  {
    slug: "tromso",
    name: "Tromsø",
    population: "78 000",
    localBlurb:
      "Tromsø er Nord-Norges viktigste by. Lokale bedrifter som investerer i nettside og SEO får en tydelig fordel i et mindre, men voksende marked.",
    nearbyCities: ["bodo", "lillehammer"],
  },
  {
    slug: "drammen",
    name: "Drammen",
    population: "100 000",
    localBlurb:
      "Drammen ligger i hjertet av Buskerud med stor pendlertrafikk til Oslo. En nettside som rangerer lokalt fanger kunder som søker i Drammen og omegn.",
    nearbyCities: ["oslo", "tonsberg", "skien"],
  },
  {
    slug: "fredrikstad",
    name: "Fredrikstad",
    population: "84 000",
    localBlurb:
      "Østfold har et sterkt lokalt næringsliv. I Fredrikstad og Sarpsborg konkurrerer bedrifter om de samme søkeordene — en god nettside gir deg fordelen.",
    nearbyCities: ["oslo", "sarpsborg", "moss"],
  },
  {
    slug: "sandnes",
    name: "Sandnes",
    population: "82 000",
    localBlurb:
      "Sandnes vokser raskt og er tett knyttet til Stavanger. Småbedrifter som ønsker kunder fra hele Stavanger-regionen trenger synlighet på nett.",
    nearbyCities: ["stavanger", "haugesund", "bergen"],
  },
  {
    slug: "bodo",
    name: "Bodø",
    population: "52 000",
    localBlurb:
      "Bodø er Nordland fylkes sentrum. Lokale søk etter tjenester er høye — en profesjonell nettside hjelper kunder i Bodø og omegn å finne deg før konkurrenten.",
    nearbyCities: ["tromso", "alesund", "trondheim"],
  },
  {
    slug: "alesund",
    name: "Ålesund",
    population: "67 000",
    localBlurb:
      "Ålesund og Sunnmøre har et mangfoldig næringsliv. Fra fiske til turisme — kunder søker på nett. En nettside som rangerer lokalt gir flere henvendelser.",
    nearbyCities: ["bergen", "molde", "trondheim"],
  },
  {
    slug: "haugesund",
    name: "Haugesund",
    population: "37 000",
    localBlurb:
      "Haugesund og Haugalandet har mange småbedrifter. De som investerer i nettside og lokalt SEO får flere søk og flere kunder fra regionen.",
    nearbyCities: ["stavanger", "bergen", "sandnes"],
  },
  {
    slug: "tonsberg",
    name: "Tønsberg",
    population: "59 000",
    localBlurb:
      "Tønsberg er Norges eldste by og et viktig handelssentrum i Vestfold. Kundene søker «nettside Tønsberg» og lignende — vi hjelper deg å bli funnet.",
    nearbyCities: ["drammen", "oslo", "moss", "kristiansand"],
  },
  {
    slug: "moss",
    name: "Moss",
    population: "50 000",
    localBlurb:
      "Moss og Østfold har et aktivt næringsliv. Lokale forbrukere søker ofte på mobil — en mobilvennlig nettside med god SEO er nøkkelen til flere kunder.",
    nearbyCities: ["oslo", "fredrikstad", "sarpsborg"],
  },
  {
    slug: "sarpsborg",
    name: "Sarpsborg",
    population: "58 000",
    localBlurb:
      "Sarpsborg er en av Østfolds største byer. Bedrifter som vil nå kunder i Sarpsborg, Fredrikstad og Halden trenger en nettside som rangerer i lokale søk.",
    nearbyCities: ["fredrikstad", "moss", "oslo"],
  },
  {
    slug: "skien",
    name: "Skien",
    population: "55 000",
    localBlurb:
      "Skien er Telemarks største by. Enten du er i Skien, Porsgrunn eller Bø — kundene søker på nett. En profesjonell nettside bygger tillit og generer leads.",
    nearbyCities: ["drammen", "porsgrunn", "arendal"],
  },
  {
    slug: "arendal",
    name: "Arendal",
    population: "44 000",
    localBlurb:
      "Arendal og Agder har et sterkt lokalt næringsliv. Søk etter «nettside Arendal» og bransjespesifikke termer er vanlige — vi hjelper deg å rangere.",
    nearbyCities: ["kristiansand", "skien", "tonsberg"],
  },
  {
    slug: "porsgrunn",
    name: "Porsgrunn",
    population: "36 000",
    localBlurb:
      "Porsgrunn ligger i Telemark med nær tilknytning til Skien og Grenland. Småbedrifter som vil vokse trenger synlighet på Google for lokale søk.",
    nearbyCities: ["skien", "arendal", "drammen"],
  },
  {
    slug: "molde",
    name: "Molde",
    population: "32 000",
    localBlurb:
      "Molde er kjent for jazz og natur. Lokale bedrifter i Romsdal konkurrerer om turister og innbyggere — en nettside som rangerer lokalt gir flere henvendelser.",
    nearbyCities: ["alesund", "trondheim", "lillehammer"],
  },
  {
    slug: "lillehammer",
    name: "Lillehammer",
    population: "29 000",
    localBlurb:
      "Lillehammer og Gudbrandsdalen trekker både turister og fastboende. En nettside med god lokalt SEO hjelper bedrifter i regionen å bli funnet først.",
    nearbyCities: ["oslo", "trondheim", "drammen"],
  },
  {
    slug: "larvik",
    name: "Larvik",
    population: "47 000",
    localBlurb:
      "Larvik i Vestfold har et mangfoldig næringsliv. Fra havna til handel og tjenester — kunder søker på nett. Vi hjelper bedrifter i Larvik å bli synlige.",
    nearbyCities: ["tonsberg", "skien", "drammen"],
  },
  {
    slug: "kristiansund",
    name: "Kristiansund",
    population: "24 000",
    localBlurb:
      "Kristiansund på Nordmøre er en viktig kystby. Lokale bedrifter som investerer i nettside og søkemotoroptimalisering får fordelen i lokale søk.",
    nearbyCities: ["molde", "alesund", "trondheim"],
  },
] as const;

export type CitySlug = (typeof cities)[number]["slug"];

// Build-time guard: every city must have unique localBlurb (min 100 chars) to avoid thin/duplicate content
cities.forEach((city) => {
  if (!city.localBlurb || city.localBlurb.length < 100) {
    throw new Error(
      `Missing or too-short localBlurb for city: ${city.name} (min 100 characters)`
    );
  }
  if (city.slug !== slugify(city.name)) {
    throw new Error(
      `City slug must match slugify(name). ${city.name} has slug "${city.slug}", expected "${slugify(city.name)}"`
    );
  }
});
