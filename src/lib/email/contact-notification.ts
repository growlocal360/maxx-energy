import { Resend } from "resend";

const DEFAULT_TO = "information@maxxenergysvcs.com";
const DEFAULT_FROM = "MAXX Energy Services Website <website@maxxenergysvcs.com>";

export interface ContactNotificationInput {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Emails the office about a new contact-form submission via Resend.
 *
 * Env:
 *   RESEND_API_KEY        - required; when missing the email is skipped (logged).
 *   CONTACT_NOTIFY_EMAIL  - recipient(s), comma-separated. Default: information@.
 *   CONTACT_FROM_EMAIL    - verified sender. Default: website@maxxenergysvcs.com.
 *
 * Never throws: a mail failure must not turn a saved submission into a user-facing error.
 */
export async function sendContactNotification(
  input: ContactNotificationInput
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set; skipping notification email");
    return { sent: false, error: "RESEND_API_KEY not set" };
  }

  const to = (process.env.CONTACT_NOTIFY_EMAIL || DEFAULT_TO)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Company", input.company || "—"],
  ];

  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/admin/messages`
    : null;

  const html = `
    <div style="font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#0b1f3a;max-width:600px">
      <h2 style="margin:0 0 16px;color:#0b1f3a">New website contact message</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:6px 10px 6px 0;color:#5b6b82;white-space:nowrap;vertical-align:top">${k}</td>
            <td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="padding:14px 16px;background:#f2f6fa;border-left:4px solid #1fb59a;white-space:pre-wrap;line-height:1.5">${escapeHtml(input.message)}</div>
      <p style="margin-top:20px;color:#5b6b82;font-size:13px">
        Reply to this email to respond directly to ${escapeHtml(input.name)}.
        ${adminUrl ? `<br/>View all messages: <a href="${adminUrl}">${adminUrl}</a>` : ""}
      </p>
    </div>`;

  const text = [
    "New website contact message",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    input.message,
    "",
    adminUrl ? `View all messages: ${adminUrl}` : "",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `Website contact: ${input.name}${input.company ? ` (${input.company})` : ""}`,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    console.error("[contact] Failed to send notification:", err);
    return { sent: false, error: err instanceof Error ? err.message : String(err) };
  }
}
