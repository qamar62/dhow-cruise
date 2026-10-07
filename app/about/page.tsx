import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteFrame } from "@/components/SiteFrame";

export const metadata: Metadata = { title: "About Alishba Cruises", description: "Discover the story of Alishba Cruises, founded in Dubai in 2022 and now operating Costa and Royale in Dubai Marina.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <SiteFrame><PageHero eyebrow="About Alishba" title="From one cruise to two distinct experiences." copy="Established in Dubai in 2022, Alishba has grown from the relaxed Costa experience to a two-vessel offering with premium Royale joining the fleet in 2025." />
    <section className="section inner-section"><div className="container story-grid"><Reveal><p className="eyebrow">The Alishba journey</p><h2>Built around the<br /><em>guest experience.</em></h2><p className="lead-copy">Alishba Dhow Cruise operates under Collective Dynamic Holding, a UAE Destination Management Company.</p><p>Costa began the journey as a relaxed dinner cruise for families, couples and visitors. Royale expanded that vision with a more refined setting for celebrations, VIP guests and corporate hosting—while keeping planning, comfort and memorable Marina views at the centre.</p></Reveal><Reveal delay={100} className="story-image"><Image src="/images/alishba-royale.jpg" alt="Alishba Royale illuminated beside Ain Dubai" fill sizes="(max-width: 800px) 92vw, 48vw" /></Reveal></div></section>
    <section className="section values-section"><div className="container"><Reveal className="section-heading"><p className="eyebrow">What matters to Alishba</p><h2>Clear. Comfortable. Memorable.</h2></Reveal><div className="values-grid">{[[ShieldCheck,"Clear before you book","Know which cruise you are choosing, what it includes and how to prepare for boarding."],[HeartHandshake,"Comfortable onboard","Practical deck choices, dining and support for couples, families, groups and business guests."],[Sparkles,"Memorable after the cruise","Food, entertainment and Marina views come together in an evening worth sharing."]].map(([Icon,title,copy],i)=>{const ValueIcon=Icon as typeof HeartHandshake;return <Reveal key={title as string} delay={i*90} className="value-card"><ValueIcon/><h3>{title as string}</h3><p>{copy as string}</p></Reveal>})}</div><Reveal className="center-action"><Link href="/book" className="button button-gold">Sail with Alishba <ArrowUpRight size={17}/></Link></Reveal></div></section>
  </SiteFrame>;
}
