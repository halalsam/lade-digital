"use client";

import { useState, type FormEvent } from "react";

// Contact form for the light page (ink on paper). Submits to a Formspree
// endpoint (NEXT_PUBLIC_FORMSPREE_ENDPOINT) via fetch, so there's no backend
// to maintain — Formspree collects and emails the entries. Styled to match the
// editorial layout: underlined inputs, generous spacing, a pill submit.

type Status = "idle" | "submitting" | "success" | "error";

const ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const FIELDS = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company (optional)", type: "text", autoComplete: "organization", optional: true },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) {
      setStatus("error");
      setError("Form isn’t configured yet — set NEXT_PUBLIC_FORMSPREE_ENDPOINT.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill hidden fields. If filled, pretend success silently.
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        const msg = body?.errors?.map((err: { message: string }) => err.message).join(", ");
        setStatus("error");
        setError(msg || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Couldn’t reach the server. Check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <section className="px-6 pb-28 md:px-12 lg:px-30">
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="border-t border-ink/10 pt-16">
            <p className="display-xl max-w-3xl">Thanks — we’ll be in touch shortly.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 rounded-full border border-ink/20 px-5 py-3 text-lg transition-colors hover:bg-ink hover:text-paper"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-28 md:px-12 lg:px-30">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid gap-16 border-t border-ink/10 pt-16 lg:grid-cols-[0.6fr_1fr]">
          <div>
            <span className="eyebrow block opacity-50">Start a conversation</span>
            <h2 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
              Tell us about your project
            </h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {/* Honeypot — hidden from real users, visible to bots. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {FIELDS.map((field) => (
              <Field key={field.name} {...field} />
            ))}

            <label className="group block">
              <span className="mb-3 block text-base uppercase opacity-50">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="What are you looking to build?"
                className="w-full resize-none border-b border-ink/20 bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
              />
            </label>

            {status === "error" && (
              <p role="alert" className="text-base text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="self-start rounded-full border border-ink px-12 py-5 text-xl transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type,
  autoComplete,
  optional,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete: string;
  optional?: boolean;
}) {
  return (
    <label className="group block">
      <span className="mb-3 block text-base uppercase opacity-50">{label}</span>
      <input
        type={type}
        name={name}
        required={!optional}
        autoComplete={autoComplete}
        className="w-full border-b border-ink/20 bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
      />
    </label>
  );
}
