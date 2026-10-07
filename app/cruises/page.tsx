import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3, Moon, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteFrame } from "@/components/SiteFrame";
import { cruises, site, type CruiseKey } from "@/lib/site";

export const metadata: Metadata = { title: "Alishba Costa & Royale", description: "Compare Alishba Costa and Alishba Royale Dubai Marina dinner cruises, regular prices, atmosphere and inclusions.", alternates: { canonical: "/cruises" } };

const icons = { Costa: Moon, Royale: Sparkles };

export default function CruisesPage() {
  return <SiteFrame><PageHero eyebrow="Choose your Alishba" title="Two cruises. Two distinct moods." copy={`Costa keeps the evening relaxed and accessible. Royale brings a more refined double-deck atmosphere. Both sail Dubai Marina from around ${site.sailingLong}.`} action="Check availability" />
    <section className="section inner-section"><div className="container cruise-options">
      {(Object.keys(cruises) as CruiseKey[]).map((key, i) => {
        const c = cruises[key]; const Icon = icons[key];
        return <Reveal key={key} delay={i * 100} className={`option-card${i ? " is-dark" : ""}`}>
          <div className="option-photo"><Image src={c.image} alt={`${c.name} at night in Dubai Marina`} fill sizes="(max-width: 820px) 92vw, 45vw" /></div>
          <div className="option-top"><span className="option-icon"><Icon /></span><small>{c.tag}</small></div>
          <h2>{c.name}</h2><p>{c.long}</p>
          <div className="option-meta">{[`Adult AED ${c.adult}`, `Child AED ${c.child}`, ...c.inclusions].map(item => <span key={item}><Check size={15} />{item}</span>)}</div>
          <div className="option-footer"><div><small>Regular adult price</small><strong>AED {c.adult}</strong></div><Link href={`/book?cruise=${key.toLowerCase()}`} className="circle-link" aria-label={`Book ${c.name}`}><ArrowUpRight /></Link></div>
        </Reveal>;
      })}
    </div></section>
    <section className="section compare-strip"><div className="container compare-grid"><Reveal><p className="eyebrow">Good to know</p><h2>Choose with<br /><em>confidence.</em></h2></Reveal><Reveal delay={100} className="facts-grid">{[[Clock3,"Two-hour regular sailing",`Both cruises currently run around ${site.sailingLong}.`],[Sparkles,"Different atmospheres","Costa is relaxed; Royale is the higher-tier double-deck experience."],[Moon,"Deck choice matters","Choose open-air views or a more enclosed environment when available."]].map(([Icon,title,copy]) => { const FactIcon=Icon as typeof Clock3; return <div key={title as string}><FactIcon/><h3>{title as string}</h3><p>{copy as string}</p></div>})}</Reveal></div></section>
  </SiteFrame>;
}
