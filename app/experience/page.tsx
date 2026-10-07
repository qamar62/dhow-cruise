import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Music2, Salad, ShipWheel, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = { title: "The Onboard Experience", description: "Discover the dining, deck choices, entertainment and Dubai Marina views aboard Alishba Cruises.", alternates: { canonical: "/experience" } };

export default function ExperiencePage() {
  const chapters = [[Salad,"01 · The table","Dinner on the water","Both regular cruises include buffet dining. Royale adds a curated presentation associated with Millennium Place Marina."],[ShipWheel,"02 · The decks","Open air or enclosed","Choose upper-deck skyline views or a more enclosed lower-deck setting according to availability and the evening you prefer."],[Music2,"03 · The atmosphere","Entertainment after dark","Both experiences include live entertainment, while Royale is positioned around a live saxophone-style performance and a more polished mood."]];
  return <SiteFrame><PageHero eyebrow="On board" title="Your Marina evening, your way." copy="Two hours of dinner, entertainment and waterfront views—experienced in the relaxed atmosphere of Costa or the premium double-deck setting of Royale." action="Reserve your evening" />
    <section className="section inner-section"><div className="container editorial-grid"><Reveal className="editorial-image"><Image src="/images/dining-deck.jpg" alt="Dinner table overlooking the Dubai Marina skyline" fill sizes="(max-width: 850px) 92vw, 44vw" /></Reveal><div className="chapter-list">{chapters.map(([Icon,kicker,title,copy],i)=>{const ChapterIcon=Icon as typeof Salad;return <Reveal key={title as string} delay={i*80} className="chapter"><ChapterIcon/><div><small>{kicker as string}</small><h2>{title as string}</h2><p>{copy as string}</p></div></Reveal>})}</div></div></section>
    <section className="section quote-section"><Reveal className="container quote-content"><Sparkles/><blockquote>Two cruises.<br/>One luminous city.</blockquote><p>Compare the atmosphere, regular price and deck options, then choose the Alishba experience that fits your evening.</p><Link href="/book" className="button button-gold">Choose your cruise <ArrowUpRight size={17}/></Link></Reveal></section>
  </SiteFrame>;
}
