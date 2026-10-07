import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, MapPin, Sparkles, Star, UtensilsCrossed, Waves } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { GoogleReviewsBadge } from "@/components/GoogleReviewsBadge";
import { cruises, faqs, site, waLink, type CruiseKey } from "@/lib/site";

const inclusions = ["Two-hour Marina cruise", "International buffet dinner", "Live entertainment", "Upper and lower deck choices"];

const occasions = [
  { title: "Birthdays & anniversaries", copy: "City lights, a table for your people and a night worth remembering.", cta: "Plan a celebration" },
  { title: "Corporate evenings", copy: "Host clients or reward your team with Royale’s refined double-deck setting.", cta: "Ask about groups" },
  { title: "Private charters", copy: "Make the whole deck yours, with timing and arrangements built around you.", cta: "Request a charter" },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/alishba-logo-trim.webp`,
      image: `${site.url}/images/og-alishba.jpg`,
      telephone: site.phoneE164,
      email: site.email,
      foundingDate: String(site.founded),
      address: { "@type": "PostalAddress", streetAddress: "Business Center, Office 124–125, First Floor, Al Garhoud", addressLocality: "Dubai", addressCountry: "AE" },
      sameAs: [site.instagram],
    },
    ...(Object.keys(cruises) as CruiseKey[]).map(key => ({
      "@type": "TouristTrip",
      name: `${cruises[key].name} Dubai Marina Dinner Cruise`,
      description: cruises[key].long,
      image: `${site.url}${cruises[key].image}`,
      touristType: ["Couples", "Families", "Visitors to Dubai"],
      provider: { "@id": `${site.url}/#org` },
      itinerary: { "@type": "ItemList", itemListElement: ["Dubai Marina", "JBR", "Bluewaters Island & Ain Dubai"].map((name, index) => ({ "@type": "ListItem", position: index + 1, name })) },
      offers: [
        { "@type": "Offer", name: "Adult", price: cruises[key].adult, priceCurrency: "AED", availability: "https://schema.org/InStock", url: `${site.url}/book?cruise=${key.toLowerCase()}` },
        { "@type": "Offer", name: "Child", price: cruises[key].child, priceCurrency: "AED", availability: "https://schema.org/InStock", url: `${site.url}/book?cruise=${key.toLowerCase()}` },
      ],
    })),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header overlay />
      <main id="main">
        <section className="home-hero">
          <Image src="/images/alishba-costa.jpg" alt="Alishba Costa lit up at night on the water in Dubai Marina" fill priority sizes="100vw" className="hero-image" />
          <div className="hero-overlay" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="container hero-content">
            <p className="eyebrow hero-eyebrow"><span /> Alishba Cruises · Dubai Marina</p>
            <h1>Two cruises.<br />One <em>remarkable</em> Marina.</h1>
            <p className="hero-lead">Choose relaxed Alishba Costa or premium Alishba Royale—both with dinner, live entertainment and Dubai Marina views.</p>
            <div className="hero-actions">
              <Link href="/book" className="button button-gold">Reserve your table <ArrowUpRight size={17} /></Link>
              <Link href="/cruises" className="button button-ghost">Compare the cruises</Link>
            </div>
            <div className="hero-proof"><GoogleReviewsBadge /></div>
          </div>
          <div className="hero-meta">
            <div><Clock3 size={17} /><span><small>Regular sailing</small>{site.sailing}</span></div>
            <div><MapPin size={17} /><span><small>Boarding</small>{site.boarding}</span></div>
            <div><Star size={17} /><span><small>Adults from</small>AED {cruises.Costa.adult}</span></div>
          </div>
          <a className="scroll-cue" href="#story"><span>Scroll to explore</span><ArrowDown size={17} /></a>
        </section>

        <section id="story" className="section intro-section">
          <div className="container intro-grid">
            <Reveal>
              <p className="eyebrow">A slower side of the city</p>
              <h2>One evening.<br /><em>A thousand lights.</em></h2>
            </Reveal>
            <Reveal delay={120} className="intro-copy">
              <p className="lead-copy">Alishba gives you two ways to experience Dubai Marina after dark, each designed for a different kind of evening.</p>
              <p>Costa is relaxed and easy-going. Royale adds a more refined double-deck setting. Both pair buffet dining and live entertainment with views of Bluewaters, JBR and the illuminated Marina skyline.</p>
              <Link href="/about" className="text-link">The story behind Alishba <ArrowRight size={16} /></Link>
            </Reveal>
          </div>
          <div className="marquee" aria-hidden="true"><span>DINE · DRIFT · DISCOVER · DINE · DRIFT · DISCOVER · </span><span>DINE · DRIFT · DISCOVER · DINE · DRIFT · DISCOVER · </span></div>
        </section>

        <section className="section cruise-section" aria-labelledby="fleet-title">
          <div className="container">
            <Reveal className="section-heading fleet-heading"><p className="eyebrow">Choose your Alishba</p><h2 id="fleet-title">Relaxed or refined.<br /><em>The Marina is yours.</em></h2></Reveal>
            <div className="fleet-grid">
              {(Object.keys(cruises) as CruiseKey[]).map((key, i) => {
                const cruise = cruises[key];
                return (
                  <Reveal key={key} delay={i * 100} className="fleet-card">
                    <Image src={cruise.image} alt={`${cruise.name} illuminated at night in Dubai Marina`} fill sizes="(max-width: 820px) 94vw, 46vw" />
                    <div className="fleet-shade" />
                    <div className="fleet-content">
                      <p className="eyebrow">{cruise.tag}</p>
                      <h3>{cruise.name}</h3>
                      <p>{cruise.short}</p>
                      <div className="fleet-price"><span>Adults from</span><strong>AED {cruise.adult}</strong><small>Children (3–11) AED {cruise.child} · regular sailing {site.sailing}</small></div>
                      <Link href={`/book?cruise=${key.toLowerCase()}`} className="button button-gold">Book {key} <ArrowUpRight size={17} /></Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="fleet-inclusions"><span>Every regular sailing includes</span>{inclusions.map(item => <p key={item}><Check size={15} />{item}</p>)}</Reveal>
          </div>
        </section>

        <section className="section route-section">
          <div className="container">
            <Reveal className="section-heading"><p className="eyebrow">Your route tonight</p><h2>Dubai, framed by the sea.</h2><p>Two hours through the Marina’s most iconic views, timed for the city’s evening glow.</p></Reveal>
            <div className="route-map">
              <div className="route-line" aria-hidden="true" />
              {[["01", "Dubai Marina", "Board beneath the towers"], ["02", "JBR", "The Walk from the water"], ["03", "Bluewaters", "Ain Dubai in full view"], ["04", "Marina skyline", "A final panorama home"]].map(([num, title, sub], i) => (
                <Reveal key={num} delay={i * 100} className="route-stop"><span className="route-dot" /><small>{num}</small><h3>{title}</h3><p>{sub}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section experience-section">
          <div className="container experience-grid">
            <Reveal className="experience-image-wrap">
              <Image src="/images/dining-deck.jpg" alt="Dinner tables on an open-air deck overlooking the Dubai Marina skyline" fill sizes="(max-width: 820px) 90vw, 48vw" className="experience-image" />
              <div className="image-badge"><span>Open-air</span><strong>Upper deck</strong></div>
            </Reveal>
            <div className="experience-copy">
              <Reveal><p className="eyebrow">The Alishba experience</p><h2>One Marina.<br /><em>Your kind of evening.</em></h2></Reveal>
              <div className="feature-list">
                {[
                  [UtensilsCrossed, "Dinner on the water", "International buffet dining is included on both regular Costa and Royale sailings."],
                  [Waves, "Open-air or enclosed", "Choose upper-deck Marina views or a more enclosed lower-deck environment, subject to availability."],
                  [Sparkles, "Entertainment after dark", "Enjoy live onboard entertainment as the illuminated waterfront moves around you."],
                ].map(([Icon, title, copy], i) => {
                  const FeatureIcon = Icon as typeof UtensilsCrossed;
                  return <Reveal key={title as string} delay={i * 100} className="feature-row"><span className="feature-icon"><FeatureIcon size={21} /></span><div><h3>{title as string}</h3><p>{copy as string}</p></div></Reveal>;
                })}
              </div>
              <Link href="/experience" className="text-link">Explore the full experience <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="section moments-section">
          <div className="container moments-heading"><Reveal><p className="eyebrow">Celebrations & private events</p><h2>Come for the view.<br /><em>Stay for the occasion.</em></h2></Reveal></div>
          <div className="moments-grid">
            {occasions.map((o, i) => (
              <Reveal key={o.title} delay={i * 100} className={`moment-card moment-${i + 1}`}>
                <span>0{i + 1}</span>
                <h3>{o.title}</h3>
                <p>{o.copy}</p>
                <a className="text-link" href={waLink(`Hello Alishba Cruises, I'd like to ask about: ${o.title}.`)} target="_blank" rel="noopener noreferrer">{o.cta} <ArrowUpRight size={15} /></a>
              </Reveal>
            ))}
          </div>
          <Reveal className="moments-action"><p><strong>Planning something bigger?</strong><br />Share your date, guest count and budget—our Dubai team will tailor the evening.</p><Link href="/contact" className="button button-secondary">Enquire about events <ArrowRight size={16} /></Link></Reveal>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <Reveal className="faq-intro"><p className="eyebrow">Good to know</p><h2 id="faq-title">Questions,<br /><em>answered.</em></h2><p>Still unsure? Message us on WhatsApp—our team replies daily.</p><a className="text-link" href={waLink("Hello Alishba Cruises, I have a question about the cruise.")} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <ArrowUpRight size={15} /></a><div className="faq-proof"><GoogleReviewsBadge variant="card" /></div></Reveal>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <details key={f.q} className="faq-item" open={i === 0}>
                  <summary>{f.q}</summary>
                  <div><p>{f.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta-bg" />
          <Reveal className="container final-cta-content">
            <p className="eyebrow">Your table is waiting</p>
            <h2>Meet us where the<br /><em>city meets the sea.</em></h2>
            <p>Board in Dubai Marina. We’ll take care of the rest.</p>
            <Link href="/book" className="button button-gold">Book your cruise <ArrowUpRight size={17} /></Link>
          </Reveal>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
