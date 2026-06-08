import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildNotificationEmail,
  type ContactSubmission,
} from "@/lib/emails";

// Contact form handler. Receives the JSON payload from ContactForm, validates
// it, and fires two emails through Resend:
//   1. an auto-reply confirmation to the person who wrote in, and
//   2. an internal notification to the studio inbox.
//
// Required env:
//   RESEND_API_KEY     — server-side Resend key (never exposed to the client).
//   CONTACT_TO_EMAIL   — studio inbox (defaults to info@lade.digital).
//   CONTACT_FROM_EMAIL — verified sender on the lade.digital domain
//                        (defaults to "Lade Studio <hello@lade.digital>").

export const runtime = "nodejs";

const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Lade Studio <hello@lade.digital>";
const TO = process.env.CONTACT_TO_EMAIL ?? "info@lade.digital";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 200, company: 160, message: 5000 };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — bots fill the hidden field. Pretend success and send nothing.
  if (clean(payload._gotcha, 200)) {
    return NextResponse.json({ ok: true });
  }

  const data: ContactSubmission = {
    name: clean(payload.name, MAX.name),
    email: clean(payload.email, MAX.email),
    company: clean(payload.company, MAX.company) || undefined,
    message: clean(payload.message, MAX.message),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (!data.message) errors.message = "Please include a message.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Please check the form.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email isn’t configured yet. Please email info@lade.digital directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const notification = buildNotificationEmail(data);
  const confirmation = buildConfirmationEmail(data);

  try {
    // Notify the studio first — this is the email that must not be lost. Set
    // replyTo to the submitter so a reply goes straight back to them.
    const { error: notifyError } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (notifyError) {
      console.error("[contact] notification send failed:", notifyError);
      return NextResponse.json(
        { error: "Couldn’t send your message. Please try again or email info@lade.digital." },
        { status: 502 },
      );
    }

    // Auto-reply to the submitter. If this one fails we don't fail the request —
    // the studio already has the message — but we do log it.
    const { error: confirmError } = await resend.emails.send({
      from: FROM,
      to: data.email,
      replyTo: TO,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (confirmError) {
      console.error("[contact] confirmation send failed:", confirmError);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
