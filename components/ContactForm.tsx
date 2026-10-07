"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { WhatsAppIcon } from "./WhatsAppButton";
import { site, waLink } from "@/lib/site";

const topics = ["Existing booking", "Birthday or anniversary", "Corporate event", "Private charter", "Dietary or accessibility needs", "General question"];

export function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", topic: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [key]: e.target.value }));

  const body = `${form.message}\n\n— ${form.firstName} ${form.lastName}\n${form.email}`;
  const subject = `${form.topic || "Enquiry"} — ${form.firstName} ${form.lastName}`.trim();

  function submit(e: FormEvent) {
    e.preventDefault();
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-success" aria-live="polite">
        <span><Check /></span>
        <p className="eyebrow">Almost there</p>
        <h2>Thank you.</h2>
        <p>Your email app should have opened with your message ready to send. Prefer a faster reply? Send the same message on WhatsApp.</p>
        <div className="complete-actions" style={{ justifyContent: "flex-start", marginTop: 24 }}>
          <a className="button button-whatsapp" href={waLink(`${subject}\n\n${body}`)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={18} height={18} /> Send on WhatsApp</a>
        </div>
        <button className="text-link" onClick={() => setSent(false)}>Edit message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>First name<input required name="firstName" autoComplete="given-name" placeholder="Your first name" value={form.firstName} onChange={set("firstName")} /></label>
        <label>Last name<input required name="lastName" autoComplete="family-name" placeholder="Your last name" value={form.lastName} onChange={set("lastName")} /></label>
      </div>
      <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set("email")} /></label>
      <label>How can we help?<select name="topic" value={form.topic} onChange={set("topic")}><option value="" disabled>Select a topic</option>{topics.map(t => <option key={t}>{t}</option>)}</select></label>
      <label>Message<textarea required name="message" rows={5} placeholder="Tell us your date, guest count and anything we should know…" value={form.message} onChange={set("message")} /></label>
      <button className="button button-gold" type="submit">Send message <ArrowUpRight size={17} /></button>
      <small className="form-note">Opens your email app addressed to {site.email}.</small>
    </form>
  );
}
