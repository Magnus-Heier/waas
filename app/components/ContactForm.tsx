"use client";

import { useState } from "react";

type ContactFormProps = {
  ctaLabel: string;
  formId?: string;
};

const XANO_SEND_MAIL_URL =
  "https://x8ki-letl-twmt.n7.xano.io/api:Cm6IdgwM/send_mail";

export function ContactForm({
  ctaLabel,
  formId = "kontakt",
}: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <>
      <form
        id={formId}
        action="#"
        method="post"
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
        onSubmit={async (e) => {
          e.preventDefault();
          if (submitting) return;

          setSubmitting(true);
          try {
            // React may null-out event fields after async awaits.
            // Capture the form element immediately.
            const formEl = e.currentTarget;
            const formData = new FormData(formEl);
            const name = String(formData.get("name") ?? "");
            const email = String(formData.get("email") ?? "");
            const detaljer = String(formData.get("details") ?? "");

            const res = await fetch(XANO_SEND_MAIL_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                detaljer,
              }),
            });

            if (res.status === 200) {
              formEl.reset();
              setSuccessOpen(true);
            }
          } catch (err) {
            // Keep the UX minimal; Xano failures shouldn't crash the page.
            console.error("ContactForm send failed:", err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div className="flex-1">
          <label htmlFor="contact-name" className="sr-only">
            Navn
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Navn *"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="contact-email" className="sr-only">
            E-post
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="E-post *"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
        </div>
        <div className="flex-1 sm:basis-full">
          <label htmlFor="contact-details" className="sr-only">
            Detaljer
          </label>
          <input
            id="contact-details"
            name="details"
            type="text"
            placeholder="Detaljer (valgfritt)"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-[#3b82f6] px-6 py-3 font-semibold text-[#1a1a1a] transition hover:bg-[#2563eb] disabled:opacity-70"
        >
          {submitting ? "Sender..." : ctaLabel}
        </button>
      </form>

      {successOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSuccessOpen(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl ring-1 ring-white/5">
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="absolute right-4 top-4 rounded p-1 text-gray-400 hover:text-white"
              aria-label="Lukk"
            >
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
            </button>

            <p className="text-sm font-semibold uppercase tracking-wide text-[#3b82f6]">
              Mottatt
            </p>
            <h2 className="mt-2 text-2xl font-bold">Takk for henvendelsen!</h2>
            <p className="mt-2 text-gray-400">
              Vi tar kontakt innen 1 virkedag.
            </p>
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="mt-6 w-full rounded-lg bg-[#3b82f6] py-3 font-semibold text-[#1a1a1a] transition hover:bg-[#2563eb]"
            >
              Ok, takk
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
