import Link from "next/link";

export function AnnouncementBar() {
  return (
    <Link
      href="/#kontakt"
      className="block w-full bg-[#3b82f6] py-2.5 text-center text-sm font-medium text-[#1a1a1a] transition hover:bg-[#2563eb]"
    >
      ✦ Se din skreddersydde hjemmeside GRATIS før du betaler — Krev Din Nå →
    </Link>
  );
}
