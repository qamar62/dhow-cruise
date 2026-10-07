// Single source of truth for verified Alishba business details.
// Source: alishbadhowcruise.com (checked 6 Oct 2026). Update here, not in components.

export const site = {
  name: "Alishba Cruises",
  legalNote: "Operated under Collective Dynamic Holding",
  url: "https://alishbadhowcruise.com",
  phoneDisplay: "+971 50 123 0170",
  phoneE164: "+971501230170",
  whatsapp: "971501230170",
  email: "booking@alishbadhowcruise.com",
  office: "Business Center, Office 124–125, First Floor, Al Garhoud, Dubai",
  officeShort: "Al Garhoud, Dubai",
  boarding: "Dubai Marina",
  sailing: "8:30–10:30 PM",
  sailingLong: "8:30 PM – 10:30 PM",
  supportHours: "Daily · 10:30 AM–10:30 PM",
  instagram: "https://www.instagram.com/alishbadhowcruise/",
  founded: 2022,
} as const;

/**
 * Google reviews badge.
 * Fill in `rating` and `count` with the live figures from the Google Business Profile
 * to show stars + numbers. Leave them null and the badge shows a "Read our Google reviews" link
 * (never display a rating that isn't real).
 */
export const googleReviews: { rating: number | null; count: number | null; url: string } = {
  rating: null,
  count: null,
  url: "https://www.google.com/maps/search/?api=1&query=Alishba+Dhow+Cruise+Dubai+Marina",
};

export type CruiseKey = "Costa" | "Royale";

export const cruises: Record<CruiseKey, {
  name: string;
  tag: string;
  adult: number;
  child: number;
  image: string;
  short: string;
  long: string;
  inclusions: string[];
}> = {
  Costa: {
    name: "Alishba Costa",
    tag: "Relaxed experience",
    adult: 150,
    child: 100,
    image: "/images/alishba-costa.jpg",
    short: "A comfortable, easy-going dinner cruise for families, visitors and couples.",
    long: "The relaxed, value-focused choice for families, visitors and couples who want the classic Alishba dinner-cruise experience.",
    inclusions: ["International buffet dinner", "Live entertainment", "Upper & lower deck choice", "Dubai Marina evening views"],
  },
  Royale: {
    name: "Alishba Royale",
    tag: "Premium experience",
    adult: 200,
    child: 150,
    image: "/images/alishba-royale.jpg",
    short: "A more refined double-deck setting for couples, celebrations, VIP guests and business hosting.",
    long: "A more refined double-deck setting for couples, celebrations, VIP guests and business hosting.",
    inclusions: ["Double-deck cruise setting", "International buffet dinner", "Live saxophone-style entertainment", "Open-air & enclosed decks"],
  },
};

export const faqs: { q: string; a: string }[] = [
  { q: "How long is the cruise and when does it sail?", a: `Regular Costa and Royale sailings run for approximately two hours, from around ${site.sailingLong}. Your confirmation includes the exact arrival time and boarding instructions.` },
  { q: "Where do we board?", a: "Boarding is in the Dubai Marina area. The exact meeting point is shared with your confirmed booking so you arrive at the right berth." },
  { q: "Is dinner included?", a: "Yes. Both regular Costa and Royale sailings include international buffet dining on board." },
  { q: "What is the difference between Costa and Royale?", a: "Costa is the relaxed, value-focused experience. Royale is the premium double-deck option with a more refined setting and live saxophone-style entertainment—popular for couples, celebrations and business guests." },
  { q: "Is the cruise suitable for families and children?", a: "Yes. Families are welcome on both cruises, and child tickets are priced separately: AED 100 on Costa and AED 150 on Royale for regular sailings." },
  { q: "Can we celebrate a birthday or book a private charter?", a: "Yes—Alishba hosts birthdays, anniversaries, corporate evenings and private charters. Message the team on WhatsApp with your date and guest count for a tailored quote." },
];

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
