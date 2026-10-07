import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppButton";
import { site, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo />
          <p>Two distinct Dubai Marina dinner cruises—relaxed Costa and premium Royale—hosted by Alishba Cruises since {site.founded}.</p>
          <Link href="/book" className="text-link">Reserve your evening <ArrowUpRight size={16} /></Link>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="footer-links">
            <Link href="/cruises">Our cruises</Link>
            <Link href="/experience">The experience</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact & events</Link>
            <Link href="/book">Book online</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Talk to us</p>
          <div className="footer-links footer-contact">
            <a href={`tel:${site.phoneE164}`}><Phone size={16} /> {site.phoneDisplay}</a>
            <a href={waLink("Hello Alishba Cruises!")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={16} height={16} /> WhatsApp us</a>
            <a href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>
            <span><MapPin size={16} /> Boarding in {site.boarding}</span>
          </div>
        </div>
        <div>
          <p className="footer-label">Sail with us</p>
          <p className="footer-time">Regular sailing<br /><strong>{site.sailing}</strong></p>
          <p className="footer-time">Guest support<br /><strong>{site.supportHours}</strong></p>
          <div className="footer-socials">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Alishba Cruises on Instagram" className="social-link"><Instagram size={18} /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name} · {site.legalNote}</span>
        <span>Office: {site.office}</span>
      </div>
    </footer>
  );
}
