import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "umamitechnologies@gmail.com";
const FROM = "Umami Landing <noreply@umami.com.ph>";

const esc = (s: unknown) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Ping Telegram with a new enquiry so it can be answered from a phone without
 * opening the inbox.
 *
 * Strictly additive and never awaited into the response path: if the chat isn't
 * configured, the token is missing, or Telegram is down, the enquiry still goes
 * out by email. Losing a lead because a notification failed would be far worse
 * than not having the notification.
 *
 * Needs TELEGRAM_BOT_TOKEN and TELEGRAM_LEAD_CHAT_ID on Vercel. The chat id is
 * deliberately its OWN variable, not the shared ops group — that group contains
 * restaurant owners and staff, and a prospect's phone number is not theirs to read.
 */
async function notifyTelegram(fields: {
  kind?: string;
  name?: string;
  email: string;
  phone?: string;
  restaurant?: string;
  message?: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_LEAD_CHAT_ID;
  if (!token || !chatId) return; // not configured — stay silent, never throw

  const heading = fields.kind === "trial" ? "🚀 New trial signup" : "💬 New enquiry";
  const text = [
    `<b>${heading}</b> · umami.com.ph`,
    "",
    fields.name ? `👤 ${esc(fields.name)}` : null,
    fields.restaurant ? `🏪 ${esc(fields.restaurant)}` : null,
    `✉️ ${esc(fields.email)}`,
    // The whole point of the new field — surfaced prominently so it can be
    // acted on straight from the notification.
    fields.phone ? `📱 <b>${esc(fields.phone)}</b>` : "📱 (no mobile given)",
    fields.message ? `\n💬 ${esc(fields.message)}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    if (!res.ok) console.error("Telegram lead notify failed:", res.status, await res.text());
  } catch (err) {
    console.error("Telegram lead notify exception:", err);
  }
}

export async function POST(req: NextRequest) {
  const { name, email, phone, message, kind, restaurant } = await req.json().catch(
    () => ({}),
  );

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing on Vercel");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const subject =
    kind === "trial"
      ? `New trial signup — ${restaurant || email}`
      : `New contact form — ${name || email}`;

  const lines = [
    `From: ${name || "(no name)"} <${email}>`,
    phone ? `Mobile: ${phone}` : null,
    restaurant ? `Restaurant: ${restaurant}` : null,
    "",
    message || "(no message — just trial signup)",
    "",
    "—",
    `Kind: ${kind || "contact"}`,
    `Source: umami.com.ph`,
    `Timestamp: ${new Date().toISOString()}`,
  ].filter(Boolean) as string[];

  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a">
      <div style="border-left:3px solid #e87a1e;padding-left:14px;margin-bottom:18px">
        <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.15em">${kind === "trial" ? "Trial Signup" : "Contact Form"}</div>
        <div style="font-size:18px;font-weight:600;margin-top:4px">${name || email}</div>
      </div>
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#666;width:90px">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 0;color:#666">Mobile</td><td><a href="tel:${esc(phone)}">${esc(phone)}</a></td></tr>` : ""}
        ${restaurant ? `<tr><td style="padding:6px 0;color:#666">Restaurant</td><td>${esc(restaurant)}</td></tr>` : ""}
        ${name ? `<tr><td style="padding:6px 0;color:#666">Name</td><td>${esc(name)}</td></tr>` : ""}
      </table>
      ${
        message
          ? `<div style="margin-top:18px;padding:14px;background:#f6f6f6;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.5">${message.replace(/</g, "&lt;")}</div>`
          : ""
      }
      <div style="margin-top:24px;font-size:11px;color:#999">Sent from umami.com.ph · ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}</div>
    </div>
  `;

  // Fire the Telegram ping alongside the email, not after it: if Resend is slow
  // or failing, the enquiry should still reach a phone.
  const telegram = notifyTelegram({ kind, name, email, phone, restaurant, message });

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html,
    });

    // Serverless functions can be frozen the moment the response returns, so the
    // Telegram call has to be settled before we reply or it may never be sent.
    await telegram;

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Contact route exception:", err);
    await telegram.catch(() => {});
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
