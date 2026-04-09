"use client";

import { cities } from "@/data/cities";
import { industries } from "@/data/industries";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/#hjem", label: "Hjem" },
  { href: "/#tjenester", label: "Tjenester", dropdown: "industries" as const },
  { href: "/#bransjer", label: "Bransjer" },
  { href: "/#lokasjoner", label: "Lokasjoner", dropdown: "cities" as const },
  { href: "/#arbeid", label: "Vårt Arbeid" },
  { href: "/#priser", label: "Priser" },
  { href: "/#blogg", label: "Blogg" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLElement>(null);

  const closeDropdowns = useCallback(() => {
    setLocationsOpen(false);
    setServicesOpen(false);
  }, []);

  useEffect(() => {
    if (!locationsOpen && !servicesOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeDropdowns();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [locationsOpen, servicesOpen, closeDropdowns]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          weboki
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => {
            if (item.dropdown === "cities") {
              return (
                <li key={item.href} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setServicesOpen(false);
                      setLocationsOpen((v) => !v);
                    }}
                    className="flex items-center gap-1 text-gray-300 hover:text-white"
                    aria-expanded={locationsOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition ${locationsOpen ? "rotate-180" : ""}`}
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
                  </button>
                  {locationsOpen && (
                    <div className="absolute left-0 top-full mt-1 max-h-[70vh] min-w-[220px] overflow-y-auto rounded-lg border border-white/10 bg-[#0a0a0a] py-2 shadow-xl">
                      {cities.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/nettside/${c.slug}`}
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                          Nettside {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            }
            if (item.dropdown === "industries") {
              return (
                <li key={item.href} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setLocationsOpen(false);
                      setServicesOpen((v) => !v);
                    }}
                    className="flex items-center gap-1 text-gray-300 hover:text-white"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <svg
                      className={`h-4 w-4 transition ${servicesOpen ? "rotate-180" : ""}`}
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
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full mt-1 max-h-[70vh] min-w-[260px] overflow-y-auto rounded-lg border border-white/10 bg-[#0a0a0a] py-2 shadow-xl">
                      {industries.map((i) => (
                        <Link
                          key={i.slug}
                          href={`/nettsider-for/${i.slug}`}
                          onClick={closeDropdowns}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                        >
                      Nettside til {i.keyword}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={isHome ? item.href.replace("/#", "#") : item.href}
                  className="text-gray-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href={isHome ? "#kontakt" : "/#kontakt"}
            className="rounded-lg bg-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#2563eb]"
          >
            Kontakt
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white md:hidden"
            aria-expanded={open}
            aria-label="Åpne meny"
          >
            {open ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => {
              if (item.dropdown === "cities") {
                return (
                  <li key={item.href}>
                    <div className="py-2">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Lokasjoner
                      </span>
                      <ul className="mt-2 flex flex-col gap-0.5 pl-2">
                        {cities.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/nettside/${c.slug}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg py-2 text-gray-300 hover:text-white"
                            >
                              Nettside {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }
              if (item.dropdown === "industries") {
                return (
                  <li key={item.href}>
                    <div className="py-2">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Tjenester (bransjer)
                      </span>
                      <ul className="mt-2 flex flex-col gap-0.5 pl-2">
                        {industries.map((i) => (
                          <li key={i.slug}>
                            <Link
                              href={`/nettsider-for/${i.slug}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg py-2 text-gray-300 hover:text-white"
                            >
                              Nettside til {i.keyword}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={isHome ? item.href.replace("/#", "#") : item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg py-2 text-gray-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
