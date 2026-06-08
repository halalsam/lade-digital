// Email templates for the contact form, rendered as inline-styled HTML so they
// survive every email client (Gmail, Outlook, Apple Mail). The look mirrors the
// site: editorial, ink-on-paper, generous whitespace, a thin-rule masthead.
//
// Two emails are produced here:
//   • buildConfirmationEmail — the auto-reply sent to the person who wrote in.
//   • buildNotificationEmail — the internal alert sent to the studio inbox.
//
// Keep everything table-based and inline-styled; <style> blocks and modern CSS
// are unreliable in mail clients.

export type ContactSubmission = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

// Brand palette — softened a touch from pure #000/#fff so it reads well on the
// off-white canvases mail clients render against.
const INK = "#0a0a0a";
const PAPER = "#ffffff";
const CANVAS = "#f5f4f2";
const BORDER = "#e7e4df";
const MUTED = "#6b6864";

const SERIF =
  "'Georgia', 'Times New Roman', Times, serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lade.digital";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/ladedesign/" },
  { name: "GitHub", href: "https://github.com/Lade" },
  { name: "Facebook", href: "https://www.facebook.com/Lade.design/" },
];

/** Escape user-supplied text before it lands in HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Turn newlines in a message into <br> for HTML, after escaping. */
function paragraphs(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br />");
}

/**
 * Shared shell: centered 600px card on a warm canvas, with the LADE masthead
 * and a studio footer. `body` is the inner HTML for each specific email.
 */
function shell(opts: { preheader: string; body: string }): string {
  const socials = SOCIALS.map(
    (s) =>
      `<a href="${s.href}" style="color:${MUTED};text-decoration:none;font-family:${SANS};font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">${s.name}</a>`,
  ).join(
    `<span style="color:${BORDER};padding:0 10px;">/</span>`,
  );

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light only" />
    <title>Lade</title>
  </head>
  <body style="margin:0;padding:0;background-color:${CANVAS};-webkit-text-size-adjust:100%;">
    <!-- preheader: shown in inbox previews, hidden in the body -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${CANVAS};">${esc(
      opts.preheader,
    )}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${CANVAS};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background-color:${PAPER};border:1px solid ${BORDER};">

            <!-- masthead -->
            <tr>
              <td style="padding:28px 40px;border-bottom:1px solid ${BORDER};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="font-family:${SANS};font-size:20px;font-weight:700;letter-spacing:0.18em;color:${INK};">
                      LADE
                    </td>
                    <td align="right" style="font-family:${SANS};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
                      Design &amp; Development Studio
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- body -->
            <tr>
              <td style="padding:48px 40px;">
                ${opts.body}
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="padding:28px 40px 32px;border-top:1px solid ${BORDER};background-color:${CANVAS};">
                <p style="margin:0 0 6px;font-family:${SANS};font-size:13px;line-height:1.6;color:${MUTED};">
                  Lade Studio — Alexandria, VA &amp; Prague
                </p>
                <p style="margin:0 0 18px;font-family:${SANS};font-size:13px;line-height:1.6;color:${MUTED};">
                  <a href="mailto:info@lade.digital" style="color:${INK};text-decoration:none;">info@lade.digital</a>
                  <span style="color:${BORDER};padding:0 8px;">/</span>
                  <a href="${SITE_URL}" style="color:${INK};text-decoration:none;">lade.digital</a>
                </p>
                <p style="margin:0;">${socials}</p>
              </td>
            </tr>

          </table>

          <p style="margin:20px 0 0;font-family:${SANS};font-size:11px;line-height:1.5;color:${MUTED};opacity:0.75;">
            You're receiving this because you contacted Lade through lade.digital.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Auto-reply to the person who filled out the form. Warm, editorial, with a
 * quoted recap of what they sent so they have a record of it.
 */
export function buildConfirmationEmail(data: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = data.name.trim().split(/\s+/)[0] || "there";

  const body = `
    <p style="margin:0 0 24px;font-family:${SANS};font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
      Message received
    </p>
    <h1 style="margin:0 0 24px;font-family:${SERIF};font-size:34px;line-height:1.15;font-weight:400;color:${INK};">
      Thanks, ${esc(firstName)} — we've got your note.
    </h1>
    <p style="margin:0 0 18px;font-family:${SANS};font-size:16px;line-height:1.7;color:${INK};">
      We read every message that comes through, and yours just landed with the
      studio. Someone from our team will get back to you within one to two
      business days.
    </p>
    <p style="margin:0 0 32px;font-family:${SANS};font-size:16px;line-height:1.7;color:${INK};">
      In the meantime, here's a copy of what you sent us:
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;border-left:2px solid ${INK};background-color:${CANVAS};">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0;font-family:${SERIF};font-size:16px;line-height:1.7;font-style:italic;color:${INK};">
            ${paragraphs(data.message)}
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-family:${SANS};font-size:16px;line-height:1.7;color:${INK};">
      Talk soon,
    </p>
    <p style="margin:0;font-family:${SERIF};font-size:18px;line-height:1.4;color:${INK};">
      The Lade Studio
    </p>
  `;

  const text = `Message received

Thanks, ${firstName} — we've got your note.

We read every message that comes through, and yours just landed with the studio. Someone from our team will get back to you within one to two business days.

Here's a copy of what you sent us:

"${data.message}"

Talk soon,
The Lade Studio

—
Lade Studio — Alexandria, VA & Prague
info@lade.digital / ${SITE_URL}`;

  return {
    subject: "We received your message — Lade Studio",
    html: shell({
      preheader: "Thanks for reaching out — we'll be in touch within 1–2 business days.",
      body,
    }),
    text,
  };
}

/**
 * Internal notification to the studio inbox. Dense and scannable — every field
 * the form captured, plus a one-click mailto reply.
 */
export function buildNotificationEmail(data: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const rows: Array<[string, string]> = [
    ["Name", esc(data.name)],
    [
      "Email",
      `<a href="mailto:${esc(data.email)}" style="color:${INK};text-decoration:underline;">${esc(
        data.email,
      )}</a>`,
    ],
  ];
  if (data.company?.trim()) rows.push(["Company", esc(data.company)]);

  const fieldRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid ${BORDER};font-family:${SANS};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};width:120px;vertical-align:top;">
          ${label}
        </td>
        <td style="padding:14px 0;border-bottom:1px solid ${BORDER};font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};">
          ${value}
        </td>
      </tr>`,
    )
    .join("");

  const body = `
    <p style="margin:0 0 24px;font-family:${SANS};font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTED};">
      New enquiry
    </p>
    <h1 style="margin:0 0 32px;font-family:${SERIF};font-size:30px;line-height:1.2;font-weight:400;color:${INK};">
      ${esc(data.name)} wants to talk.
    </h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 28px;border-top:1px solid ${BORDER};">
      ${fieldRows}
    </table>

    <p style="margin:0 0 10px;font-family:${SANS};font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${MUTED};">
      Message
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 32px;background-color:${CANVAS};border:1px solid ${BORDER};">
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0;font-family:${SANS};font-size:16px;line-height:1.7;color:${INK};">
            ${paragraphs(data.message)}
          </p>
        </td>
      </tr>
    </table>

    <a href="mailto:${esc(data.email)}?subject=${encodeURIComponent(
      "Re: your message to Lade",
    )}" style="display:inline-block;background-color:${INK};color:${PAPER};font-family:${SANS};font-size:15px;text-decoration:none;padding:14px 32px;border-radius:999px;">
      Reply to ${esc(data.name.split(/\s+/)[0] || data.name)}
    </a>
  `;

  const text = `New enquiry — ${data.name}

Name:    ${data.name}
Email:   ${data.email}${data.company?.trim() ? `\nCompany: ${data.company}` : ""}

Message:
${data.message}

Reply: mailto:${data.email}`;

  return {
    subject: `New enquiry from ${data.name}`,
    html: shell({
      preheader: `${data.name} (${data.email}) sent a message through the contact form.`,
      body,
    }),
    text,
  };
}
