type PortfolioGridProps = {
  count?: 2 | 3 | 4;
};

export function PortfolioGrid({ count = 4 }: PortfolioGridProps) {
  const items = Array.from({ length: count }, (_, i) => i + 1);
  return (
    <div className={`mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 ${count === 4 ? "lg:grid-cols-4" : count === 3 ? "lg:grid-cols-3" : ""}`}>
      {items.map((n) => (
        <div
          key={n}
          className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
        >
          <div className="aspect-video flex items-center justify-center bg-white/10 text-sm text-gray-500">
            Bilde kommer
          </div>
          <div className="p-4">
            <span className="text-xs font-medium text-gray-500">
              Kategori (placeholder)
            </span>
            <h3 className="mt-1 font-semibold text-gray-400">
              Prosjekttittel {n}
            </h3>
            <p className="mt-1 text-sm text-gray-500">Beskrivelse kommer</p>
          </div>
        </div>
      ))}
    </div>
  );
}
