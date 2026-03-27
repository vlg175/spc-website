/* ─────────────────────────────────────────────────────────────────────────
   POST /api/contact
   Receives form data → sends notification email via SMTP (nodemailer).
   Validation: name + message required, email OR phone required.
   ───────────────────────────────────────────────────────────────────────── */

import { NextRequest, NextResponse } from "next/server";

/* ── Env ──────────────────────────────────────────────────────────────── */
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // where to receive inquiries
const SMTP_HOST    = process.env.SMTP_HOST;
const SMTP_PORT    = process.env.SMTP_PORT;
const SMTP_USER    = process.env.SMTP_USER;    // sender Gmail address
const SMTP_PASS    = process.env.SMTP_PASS;    // Gmail App Password

/* ── Helper ───────────────────────────────────────────────────────────── */
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ── Route handler ────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    };

    /* ── Server-side validation ───────────────────────────────── */
    const errors: string[] = [];
    if (!name?.trim())    errors.push("Name is required");
    if (!message?.trim()) errors.push("Message is required");
    if (!email?.trim() && !phone?.trim())
      errors.push("Either email or phone number is required");
    if (email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errors.push("Invalid email format");

    if (errors.length > 0)
      return NextResponse.json({ ok: false, errors }, { status: 400 });

    /* ── Check SMTP config ────────────────────────────────────── */
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
      console.error("[contact] SMTP not configured — check .env.local");
      return NextResponse.json(
        { ok: false, errors: ["Email service not configured. Contact us directly at jv.steelpipe@gmail.com"] },
        { status: 503 }
      );
    }

    const cleanName    = name!.trim();
    const cleanEmail   = email?.trim() ?? "";
    const cleanPhone   = phone?.trim() ?? "";
    const cleanMessage = message!.trim();

    /* ── Send email ───────────────────────────────────────────── */
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const contactLine = [
      cleanEmail ? `Email: ${cleanEmail}` : null,
      cleanPhone ? `Phone: ${cleanPhone}` : null,
    ].filter(Boolean).join(" | ");

    await transporter.sendMail({
      from:    `"SPC Website" <${SMTP_USER}>`,
      to:      NOTIFY_EMAIL,
      replyTo: cleanEmail || undefined,
      subject: `New inquiry from ${cleanName} — SPC website`,
      text:    `Name: ${cleanName}\n${contactLine}\n\nMessage:\n${cleanMessage}`,
      html: [
        `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">`,
        `<h2 style="color:#2A3E72;border-bottom:2px solid #E85E22;padding-bottom:8px">`,
        `New inquiry — SPC Steel Pipe Company</h2>`,
        `<p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>`,
        cleanEmail ? `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>` : "",
        cleanPhone ? `<p><strong>Phone:</strong> <a href="tel:${escapeHtml(cleanPhone)}">${escapeHtml(cleanPhone)}</a></p>` : "",
        `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>`,
        `<p><strong>Message:</strong></p>`,
        `<p style="color:#374151;line-height:1.6">${escapeHtml(cleanMessage).replace(/\n/g, "<br/>")}</p>`,
        `</div>`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { ok: false, errors: ["Server error. Please try again or contact us directly."] },
      { status: 500 }
    );
  }
}
