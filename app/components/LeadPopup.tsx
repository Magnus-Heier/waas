"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "lead-popup-shown";
const DELAY_MS = 4000;

export function LeadPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [mounted]);

  const close = () => {
    setSuccessOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl ring-1 ring-white/5">
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 rounded p-1 text-gray-400 hover:text-white"
          aria-label="Lukk"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {successOpen ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f5a623]">
              Mottatt
            </p>
            <h2 className="mt-2 text-2xl font-bold">Takk for henvendelsen!</h2>
            <p className="mt-2 text-gray-400">Vi tar kontakt innen 1 virkedag.</p>
            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-lg bg-[#f5a623] py-3 font-semibold text-[#1a1a1a] transition hover:bg-[#e0951f]"
            >
              Ok, jeg skjønner
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#f5a623]">
              Vent! Før du går...
            </p>
            <h2 id="popup-title" className="mt-2 text-2xl font-bold">
              Få forsiden din designet GRATIS
            </h2>
            <p className="mt-2 text-gray-400">
              Se ditt skreddersydde design før du betaler noe
            </p>
            <p className="mt-4 inline-block rounded-full bg-[#f5a623] px-5 py-2 text-base font-bold text-[#0a0a0a] shadow-[0_0_20px_rgba(245,166,35,0.3)]">
              Bli en av våre 5 første kunder med halv pris på bygging og de 3
              første månedene
            </p>

            <form
              action="#"
              method="post"
              className="mt-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;

                setSubmitting(true);
                try {
                  const formEl = e.currentTarget;
                  const formData = new FormData(e.currentTarget);
                  const email = String(formData.get("email") ?? "");
                  const business = String(formData.get("business") ?? "");
                  const details = String(formData.get("details") ?? "");

                  const res = await fetch(
                    "https://x8ki-letl-twmt.n7.xano.io/api:Cm6IdgwM/send_mail",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: business || "Ukjent",
                        email,
                        product: "Liten, CRM-berikelse",
                        message: details
                          ? `Hei! Jeg ønsker tilbud.\n\nDetaljer: ${details}`
                          : "Hei! Jeg ønsker tilbud.",
                      }),
                    }
                  );

                  if (res.status === 200) {
                    setSuccessOpen(true);
                    formEl.reset();
                  }
                } catch (err) {
                  console.error("LeadPopup send failed:", err);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div>
                <label htmlFor="popup-email" className="sr-only">E-post *</label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  required
                  placeholder="E-post *"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label htmlFor="popup-phone" className="sr-only">Telefonnummer *</label>
                <input
                  id="popup-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Telefonnummer *"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label htmlFor="popup-business" className="sr-only">Bedriftsnavn (valgfritt)</label>
                <input
                  id="popup-business"
                  name="business"
                  type="text"
                  placeholder="Bedriftsnavn (valgfritt)"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                />
              </div>
              <div>
                <label htmlFor="popup-details" className="sr-only">Detaljer (valgfritt)</label>
                <input
                  id="popup-details"
                  name="details"
                  type="text"
                  placeholder="Detaljer (valgfritt)"
                  className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#f5a623] focus:outline-none focus:ring-1 focus:ring-[#f5a623]"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#f5a623] py-3 font-semibold text-[#1a1a1a] transition hover:bg-[#e0951f]"
                disabled={submitting}
              >
                {submitting ? "Sender..." : "Få mitt gratis design"}
              </button>
            </form>

            <ul className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
              <li className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Ingen kredittkort
              </li>
              <li className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-[#f5a623]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Levering innen 24 timer
              </li>
            </ul>

            <p className="mt-6 text-center">
              <button
                type="button"
                onClick={close}
                className="text-sm text-gray-500 underline hover:text-gray-400"
              >
                Nei takk, jeg trenger ikke en nettside
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
