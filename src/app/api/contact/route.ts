import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = "umamitechnologies@gmail.com";
const FROM = "Umami Landing <noreply@umami.com.ph>";

export async function POST(req: NextRequest) {
  const { name, email, message, kind, restaurant } = await req.json().catch(
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
        ${restaurant ? `<tr><td style="padding:6px 0;color:#666">Restaurant</td><td>${restaurant}</td></tr>` : ""}
        ${name ? `<tr><td style="padding:6px 0;color:#666">Name</td><td>${name}</td></tr>` : ""}
      </table>
      ${
        message
          ? `<div style="margin-top:18px;padding:14px;background:#f6f6f6;border-radius:8px;white-space:pre-wrap;font-size:14px;line-height:1.5">${message.replace(/</g, "&lt;")}</div>`
          : ""
      }
      <div style="margin-top:24px;font-size:11px;color:#999">Sent from umami.com.ph · ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}</div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Contact route exception:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
