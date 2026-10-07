"use client";

import { ArrowLeft, ArrowRight, Check, CheckCircle2, Info, Minus, Plus, ShieldCheck, ShipWheel } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "./WhatsAppButton";
import { GoogleReviewsBadge } from "./GoogleReviewsBadge";
import { cruises, site, waLink, type CruiseKey } from "@/lib/site";

type Guests = { adults: number; children: number };
type Details = { firstName: string; lastName: string; email: string; phone: string; notes: string };
const steps = ["Cruise", "Guests", "Details"];
const decks = [
  { id: "Open upper deck", hint: "Fresh air & Marina views" },
  { id: "Enclosed lower deck", hint: "Indoor comfort" },
];
const MAX_GUESTS = 20;

const toLocalISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const formatDate = (iso: string) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "";

export function BookingFlow({ initialCruise = "Costa" }: { initialCruise?: CruiseKey }) {
  const [step, setStep] = useState(1);
  const [cruise, setCruise] = useState<CruiseKey>(initialCruise);
  const [date, setDate] = useState("");
  const [deck, setDeck] = useState(decks[0].id);
  const [guests, setGuests] = useState<Guests>({ adults: 2, children: 0 });
  const [details, setDetails] = useState<Details>({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [complete, setComplete] = useState(false);
  const [earliest, setEarliest] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const fare = cruises[cruise];
  const total = guests.adults * fare.adult + guests.children * fare.child;
  const guestCount = guests.adults + guests.children;

  // Date bounds are computed on the client to avoid server/client timezone mismatch.
  useEffect(() => setEarliest(toLocalISO(new Date())), []);
  // Move focus to the new step heading for keyboard and screen-reader users.
  useEffect(() => { if (step > 1 || complete) headingRef.current?.focus(); }, [step, complete]);

  const changeGuests = (key: keyof Guests, amount: number) =>
    setGuests(g => {
      const next = Math.max(key === "adults" ? 1 : 0, g[key] + amount);
      return g.adults + g.children - g[key] + next > MAX_GUESTS ? g : { ...g, [key]: next };
    });
  const field = (key: keyof Details) => ({
    value: details[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails(d => ({ ...d, [key]: e.target.value })),
  });

  const message = [
    `Hello ${site.name}, I'd like to book:`,
    ``,
    `• Cruise: ${fare.name}`,
    `• Date: ${formatDate(date)} (${site.sailing})`,
    `• Guests: ${guests.adults} adult${guests.adults > 1 ? "s" : ""}${guests.children ? `, ${guests.children} child${guests.children > 1 ? "ren" : ""}` : ""}`,
    `• Seating: ${deck}`,
    `• Estimated regular total: AED ${total}`,
    ``,
    `Name: ${details.firstName} ${details.lastName}`.trim(),
    `Mobile: ${details.phone}`,
    `Email: ${details.email}`,
    ...(details.notes ? [`Notes: ${details.notes}`] : []),
  ].join("\n");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (step < 3) { setStep(s => s + 1); return; }
    setComplete(true);
  };

  if (complete) {
    return (
      <section className="booking-complete" aria-live="polite">
        <div className="success-ring"><Check /></div>
        <p className="eyebrow">One last step</p>
        <h1 ref={headingRef} tabIndex={-1}>Your Alishba evening is ready to confirm.</h1>
        <p>Send your request on WhatsApp and the Alishba team will confirm availability, the boarding point and payment. Nothing is charged on this website.</p>
        <div className="confirmation-card">
          <span>{fare.name}</span>
          <strong>{formatDate(date)} · {site.sailing}</strong>
          <small>{guestCount} guest{guestCount > 1 ? "s" : ""} · {deck} · Estimated AED {total}</small>
        </div>
        <div className="complete-actions">
          <a className="button button-whatsapp" href={waLink(message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={18} height={18} /> Send on WhatsApp</a>
          <a className="button button-secondary" href={`mailto:${site.email}?subject=${encodeURIComponent(`Booking request — ${fare.name}, ${formatDate(date)}`)}&body=${encodeURIComponent(message)}`}>Send by email</a>
        </div>
        <button type="button" className="text-link edit-request" onClick={() => { setComplete(false); setStep(3); }}><ArrowLeft size={15} /> Edit request</button>
      </section>
    );
  }

  return (
    <div className="booking-shell">
      <div className="booking-intro">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back to Alishba</Link>
        <p className="eyebrow">Book your cruise</p>
        <h1>Choose your<br /><em>Marina evening.</em></h1>
        <p>Relaxed Costa or premium Royale. Pick your cruise, date, seating and guests—then send the request straight to our team on WhatsApp.</p>
        <div className="booking-assurance"><ShieldCheck /><span><strong>No payment taken online</strong><small>Costa from AED {cruises.Costa.adult} · Royale from AED {cruises.Royale.adult} · confirmed by our team</small></span></div>
        <div className="booking-proof"><GoogleReviewsBadge variant="card" /></div>
      </div>

      <form className="booking-form" onSubmit={submit} noValidate={false}>
        <ol className="booking-progress" aria-label="Booking steps">
          {steps.map((label, i) => (
            <li key={label} className={step >= i + 1 ? "active" : ""} aria-current={step === i + 1 ? "step" : undefined}>
              <span>{step > i + 1 ? <Check size={13} /> : i + 1}</span><small>{label}</small>
            </li>
          ))}
        </ol>

        {step === 1 && (
          <div className="booking-step">
            <p className="step-kicker">Step 1 of 3</p>
            <h2>Choose your Alishba</h2>
            <div className="choice-grid cruise-choice-grid" role="radiogroup" aria-label="Cruise">
              {(Object.keys(cruises) as CruiseKey[]).map(key => (
                <button key={key} type="button" role="radio" aria-checked={cruise === key} className={cruise === key ? "choice active" : "choice"} onClick={() => setCruise(key)}>
                  <ShipWheel /><span><strong>{cruises[key].name}</strong><small>{cruises[key].tag.replace(" experience", "")} · Adult AED {cruises[key].adult}</small></span><CheckCircle2 />
                </button>
              ))}
            </div>
            <label className="booking-date">Cruise date<input required type="date" min={earliest || undefined} value={date} onChange={e => setDate(e.target.value)} /></label>
            <div className="field-label" id="deck-label">Preferred seating</div>
            <div className="choice-grid" role="radiogroup" aria-labelledby="deck-label">
              {decks.map(d => (
                <button key={d.id} type="button" role="radio" aria-checked={deck === d.id} className={deck === d.id ? "choice active" : "choice"} onClick={() => setDeck(d.id)}>
                  <span><strong>{d.id}</strong><small>{d.hint}</small></span><CheckCircle2 />
                </button>
              ))}
            </div>
            <p className="sailing-time-note"><Info size={16} /> Regular sailing runs approximately {site.sailingLong}. Seating preference is subject to availability; exact arrival and boarding instructions come with your confirmation.</p>
          </div>
        )}

        {step === 2 && (
          <div className="booking-step">
            <p className="step-kicker">Step 2 of 3</p>
            <h2 ref={headingRef} tabIndex={-1}>Who is sailing?</h2>
            <div className="guest-picker">
              {([["adults", "Adults", `Ages 12+ · AED ${fare.adult}`], ["children", "Children", `Ages 3–11 · AED ${fare.child}`]] as const).map(([key, label, hint]) => (
                <div key={key}>
                  <span><strong>{label}</strong><small>{hint}</small></span>
                  <div className="counter">
                    <button type="button" onClick={() => changeGuests(key, -1)} disabled={guests[key] <= (key === "adults" ? 1 : 0)} aria-label={`Remove one ${label.toLowerCase().replace(/ren$|s$/, "")}`}><Minus /></button>
                    <b aria-live="polite">{guests[key]}</b>
                    <button type="button" onClick={() => changeGuests(key, 1)} disabled={guestCount >= MAX_GUESTS} aria-label={`Add one ${label.toLowerCase().replace(/ren$|s$/, "")}`}><Plus /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="price-breakdown">
              <p><span>Adults × {guests.adults}</span><strong>AED {guests.adults * fare.adult}</strong></p>
              {guests.children > 0 && <p><span>Children × {guests.children}</span><strong>AED {guests.children * fare.child}</strong></p>}
              <p className="total"><span>Estimated regular total</span><strong>AED {total}</strong></p>
              <small>Regular pricing for {fare.name}. Infants under 3 and groups over {MAX_GUESTS}—please mention in your request. Special dates and events can be priced differently; our team confirms the final amount.</small>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step">
            <p className="step-kicker">Step 3 of 3</p>
            <h2 ref={headingRef} tabIndex={-1}>Your details</h2>
            <div className="field-row">
              <label>First name<input required autoComplete="given-name" placeholder="First name" {...field("firstName")} /></label>
              <label>Last name<input required autoComplete="family-name" placeholder="Last name" {...field("lastName")} /></label>
            </div>
            <label>Mobile / WhatsApp number<input required type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 000 0000" pattern="[0-9+\s\(\)\-]{7,}" title="Phone number with country code, e.g. +971 50 000 0000" {...field("phone")} /></label>
            <label>Email<input required type="email" autoComplete="email" placeholder="you@example.com" {...field("email")} /></label>
            <label>Special requests <small>Optional</small><textarea rows={3} placeholder="Dietary, accessibility or celebration notes…" {...field("notes")} /></label>
            <div className="booking-review">
              <p><span>{fare.name}</span><strong>AED {total}</strong></p>
              <dl>
                <dt>Date</dt><dd>{formatDate(date)}</dd>
                <dt>Sailing</dt><dd>{site.sailing}</dd>
                <dt>Guests</dt><dd>{guests.adults} adult{guests.adults > 1 ? "s" : ""}{guests.children ? ` · ${guests.children} child${guests.children > 1 ? "ren" : ""}` : ""}</dd>
                <dt>Seating</dt><dd>{deck}</dd>
              </dl>
            </div>
          </div>
        )}

        <div className="booking-nav">
          {step > 1 ? <button type="button" className="button button-secondary" onClick={() => setStep(s => s - 1)}><ArrowLeft size={17} /> Back</button> : <span />}
          <button key={`next-${step}`} type="submit" className="button button-gold" disabled={step === 1 && !date}>
            {step < 3 ? <>Continue <ArrowRight size={17} /></> : <>Review request <ArrowRight size={17} /></>}
          </button>
        </div>
        {step === 1 && !date && <p className="demo-notice">Select a date to continue.</p>}
        {step > 1 && <p className="demo-notice">No payment is taken online · Our team confirms every booking.</p>}
      </form>
    </div>
  );
}
