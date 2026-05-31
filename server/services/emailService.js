// server/services/emailService.js
// SETUP — add to server/.env:
//   GMAIL_USER=yourapp@gmail.com
//   GMAIL_APP_PASSWORD=xxxxxxxxxxxx   (16-char App Password from Google Account → Security → App passwords)
//   FRONTEND_URL=https://nestfind.vercel.app
// INSTALL: cd server && npm install nodemailer

const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[Email] GMAIL_USER or GMAIL_APP_PASSWORD not set — emails disabled'); return null;
  }
  transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD } });
  transporter.verify(err => { if (err) console.error('[Email] Gmail connection failed:', err.message); else console.log('[Email] Gmail ready ✅'); });
  return transporter;
}

async function sendEmail({ to, subject, html }) {
  const t = getTransporter();
  if (!t) return;
  try {
    const info = await t.sendMail({ from: `"NestFind" <${process.env.GMAIL_USER}>`, to, subject, html });
    console.log(`[Email] Sent to ${to} — ${subject} (${info.messageId})`);
  } catch (err) { console.error(`[Email] Failed to send to ${to}:`, err.message); }
}

function wrap(content) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>NestFind</title>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Segoe UI',Arial,sans-serif;background:#f0faf4;padding:32px 16px;color:#0f2d1a;}.outer{max-width:580px;margin:0 auto;}.header{background:linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%);border-radius:16px 16px 0 0;padding:28px 32px;}.brand{font-size:22px;font-weight:800;color:#fff;}.brand span{color:#6ee7b7;}.body{background:#fff;padding:32px;border:1px solid #d1fae5;border-top:none;}.footer{background:#f9fafb;border:1px solid #d1fae5;border-top:none;border-radius:0 0 16px 16px;padding:18px 32px;text-align:center;font-size:11px;color:#9ca3af;line-height:1.7;}.footer a{color:#6b7280;text-decoration:none;}</style>
</head><body><div class="outer"><div class="header"><div class="brand">Nest<span>Find</span></div></div><div class="body">${content}</div>
<div class="footer">You received this because you have a NestFind account.<br/><a href="${url}">Visit NestFind</a></div></div></body></html>`;
}

function propertyBlock(property, booking) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  const img = property.images?.[0] || property.image;
  return `
<div style="background:#f0fdf4;border:1.5px solid #a7f3d0;border-radius:12px;padding:18px 20px;margin:20px 0;">
  ${img ? `<img src="${img}" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block;margin-bottom:16px;" onerror="this.style.display='none'"/>` : ''}
  <div style="font-size:17px;font-weight:800;color:#0f2d1a;margin-bottom:8px;">${property.title || 'Property'}</div>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
    <span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:600;">📍 ${property.city || ''}</span>
    ${property.propertyType ? `<span style="background:#e0f2fe;color:#0369a1;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:600;">${property.propertyType}</span>` : ''}
    ${property.price ? `<span style="background:#fef9c3;color:#854d0e;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:600;">₹${Number(property.price).toLocaleString('en-IN')}/mo</span>` : ''}
  </div>
  <table style="width:100%;font-size:13px;border-collapse:collapse;">
    <tr><td style="padding:5px 0;color:#6b7280;width:120px;">Move-in</td><td style="padding:5px 0;font-weight:600;">${new Date(booking.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Move-out</td><td style="padding:5px 0;font-weight:600;">${new Date(booking.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</td></tr>
    ${booking.userType ? `<tr><td style="padding:5px 0;color:#6b7280;">Tenant type</td><td style="padding:5px 0;font-weight:600;">${booking.userType}</td></tr>` : ''}
  </table>
  <a href="${url}/property/${property._id}" style="display:inline-block;margin-top:14px;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:9px 20px;border-radius:9px;font-size:13px;font-weight:700;text-decoration:none;">View Property →</a>
</div>`;
}

async function sendNewBookingToOwner({ owner, tenant, property, booking }) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  const html = wrap(`
<div style="margin-bottom:20px;">
  <div style="display:inline-flex;align-items:center;gap:8px;background:#fef9c3;border:1px solid #fde68a;border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;color:#854d0e;margin-bottom:16px;">🔔 New Booking Request</div>
  <div style="font-size:22px;font-weight:800;color:#0f2d1a;line-height:1.3;margin-bottom:8px;">Someone wants to book your property!</div>
  <div style="font-size:14px;color:#6b7280;line-height:1.65;">Hi <strong style="color:#0f2d1a;">${owner.fullName?.split(' ')[0] || 'there'}</strong>, a new booking request has been submitted for one of your listings.</div>
</div>
${propertyBlock(property, booking)}
<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;margin:20px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;margin-bottom:10px;">Tenant Details</div>
  <table style="width:100%;font-size:13px;border-collapse:collapse;">
    <tr><td style="padding:5px 0;color:#6b7280;width:120px;">Name</td><td style="padding:5px 0;font-weight:600;">${booking.name || tenant.fullName || '—'}</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Phone</td><td style="padding:5px 0;font-weight:600;">${booking.phone || tenant.phone || '—'}</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Email</td><td style="padding:5px 0;font-weight:600;">${tenant.email || '—'}</td></tr>
  </table>
</div>
<div style="text-align:center;margin-top:24px;">
  <a href="${url}/my-bookings" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:13px 32px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Review & Respond →</a>
</div>`);
  await sendEmail({ to: owner.email, subject: `🔔 New booking request for "${property.title || 'your property'}"`, html });
}

async function sendBookingApprovedToTenant({ tenant, owner, property, booking }) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  const html = wrap(`
<div style="margin-bottom:20px;">
  <div style="display:inline-flex;align-items:center;gap:8px;background:#dcfce7;border:1px solid #a7f3d0;border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;color:#065f46;margin-bottom:16px;">✓ Booking Approved</div>
  <div style="font-size:22px;font-weight:800;color:#0f2d1a;line-height:1.3;margin-bottom:8px;">Great news — your booking is approved!</div>
  <div style="font-size:14px;color:#6b7280;line-height:1.65;">Hi <strong style="color:#0f2d1a;">${tenant.fullName?.split(' ')[0] || 'there'}</strong>, the owner has approved your booking request.</div>
</div>
${propertyBlock(property, booking)}
<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px;margin:20px 0;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;margin-bottom:10px;">Owner Contact</div>
  <table style="width:100%;font-size:13px;border-collapse:collapse;">
    <tr><td style="padding:5px 0;color:#6b7280;width:100px;">Name</td><td style="padding:5px 0;font-weight:600;">${owner?.fullName || '—'}</td></tr>
    <tr><td style="padding:5px 0;color:#6b7280;">Phone</td><td style="padding:5px 0;font-weight:600;">${property.contact || owner?.phone || '—'}</td></tr>
  </table>
</div>
<div style="text-align:center;margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
  <a href="${url}/my-bookings" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:11px 26px;border-radius:11px;font-size:14px;font-weight:700;text-decoration:none;">View My Bookings</a>
  <a href="${url}/messages" style="display:inline-block;background:#fff;border:1.5px solid #d1fae5;color:#059669;padding:11px 26px;border-radius:11px;font-size:14px;font-weight:700;text-decoration:none;">Message Owner</a>
</div>`);
  await sendEmail({ to: tenant.email, subject: `✅ Booking approved — "${property.title || 'your booking'}"`, html });
}

async function sendBookingRejectedToTenant({ tenant, property, booking }) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  const html = wrap(`
<div style="margin-bottom:20px;">
  <div style="display:inline-flex;align-items:center;gap:8px;background:#ffe4e6;border:1px solid #fecdd3;border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;color:#9f1239;margin-bottom:16px;">✗ Booking Not Approved</div>
  <div style="font-size:22px;font-weight:800;color:#0f2d1a;line-height:1.3;margin-bottom:8px;">Your booking request was not approved</div>
  <div style="font-size:14px;color:#6b7280;line-height:1.65;">Hi <strong style="color:#0f2d1a;">${tenant.fullName?.split(' ')[0] || 'there'}</strong>, the owner was unable to approve your request this time.</div>
</div>
<div style="background:#f0fdf4;border:1.5px solid #a7f3d0;border-radius:12px;padding:18px 20px;margin:20px 0;">
  <div style="font-size:16px;font-weight:800;color:#0f2d1a;margin-bottom:4px;">${property.title || 'Property'}</div>
  <div style="font-size:13px;color:#6b7280;">📍 ${property.city || ''} · ${new Date(booking.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short'})} → ${new Date(booking.endDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</div>
</div>
<div style="text-align:center;margin-top:24px;">
  <a href="${url}" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:13px 32px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Browse Other Listings →</a>
</div>`);
  await sendEmail({ to: tenant.email, subject: `Your booking request for "${property.title || 'the property'}" was not approved`, html });
}

const messageCooldown = new Map();
const MESSAGE_COOLDOWN_MS = 5 * 60 * 1000;

async function sendNewMessageNotification({ recipient, sender, property, messagePreview }) {
  const url = process.env.FRONTEND_URL || 'http://localhost:3000';
  const key = `${recipient._id}_${sender._id}`;
  const lastSent = messageCooldown.get(key) || 0;
  if (Date.now() - lastSent < MESSAGE_COOLDOWN_MS) return;
  messageCooldown.set(key, Date.now());
  const html = wrap(`
<div style="margin-bottom:20px;">
  <div style="display:inline-flex;align-items:center;gap:8px;background:#dbeafe;border:1px solid #bfdbfe;border-radius:100px;padding:5px 14px;font-size:12px;font-weight:700;color:#1e40af;margin-bottom:16px;">💬 New Message</div>
  <div style="font-size:22px;font-weight:800;color:#0f2d1a;line-height:1.3;margin-bottom:8px;">You have a new message</div>
  <div style="font-size:14px;color:#6b7280;line-height:1.65;">Hi <strong style="color:#0f2d1a;">${recipient.fullName?.split(' ')[0] || 'there'}</strong>, <strong style="color:#0f2d1a;">${sender.fullName || 'Someone'}</strong> sent you a message about <strong style="color:#059669;">${property?.title || 'a property'}</strong>.</div>
</div>
<div style="background:#f0fdf4;border-left:4px solid #059669;border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0;">
  <div style="font-size:14px;color:#0f2d1a;line-height:1.6;font-style:italic;">"${messagePreview?.length > 120 ? messagePreview.slice(0,120)+'…' : messagePreview || '(View in app)'}"</div>
</div>
<div style="text-align:center;margin-top:24px;">
  <a href="${url}/messages" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#fff;padding:13px 32px;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Reply Now →</a>
</div>`);
  await sendEmail({ to: recipient.email, subject: `💬 New message from ${sender.fullName || 'someone'} on NestFind`, html });
}

module.exports = { sendNewBookingToOwner, sendBookingApprovedToTenant, sendBookingRejectedToTenant, sendNewMessageNotification };