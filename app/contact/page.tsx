import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { SiteFrame } from "@/components/SiteFrame";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Alishba Cruises", description: "Contact Alishba Cruises for booking help, private events and Dubai Marina cruise information.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return <SiteFrame><PageHero eyebrow="Contact" title="We’re here to help plan your evening." copy="Questions about a booking, dietary needs or a private event? Tell us what you need and our Dubai team will be in touch." />
    <section className="section inner-section"><div className="container contact-grid"><div className="contact-details"><p className="eyebrow">Talk to Alishba</p><h2>Start a conversation.</h2>{([[Phone, "Call or WhatsApp", site.phoneDisplay, `tel:${site.phoneE164}`], [Mail, "Email", site.email, `mailto:${site.email}`], [MapPin, "Business office", site.officeShort, ""], [Clock3, "Guest support", site.supportHours, ""]] as const).map(([Icon, label, value, href]) => { const inner = <><span><Icon /></span><p><small>{label}</small><strong>{value}</strong></p></>; return href ? <a className="contact-row" href={href} key={label}>{inner}</a> : <div className="contact-row" key={label}>{inner}</div>; })}<p className="contact-note">Cruise boarding is in the Dubai Marina area. Follow the exact meeting point and arrival instructions supplied with your confirmed booking.</p></div><ContactForm/></div></section>
  </SiteFrame>;
}
