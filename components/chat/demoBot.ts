// DEMO concierge — rule-based replies built only from verified facts in lib/site.ts.
// Replace `getDemoReply` with a call to the real AI endpoint later (same signature, make it async).
import { cruises, site } from "@/lib/site";

export type ChatAction = { label: string; href: string; external?: boolean };
export type BotReply = { text: string; actions?: ChatAction[]; chips?: string[] };

export const starterChips = ["Prices", "Timings", "Costa vs Royale", "Where do we board?", "Private event"];

const { Costa, Royale } = cruises;

const rules: { test: RegExp; reply: () => BotReply }[] = [
  {
    test: /\b(price|cost|how much|aed|rate|ticket|fare)/i,
    reply: () => ({
      text: `Regular prices:\n• ${Costa.name}: AED ${Costa.adult} adult · AED ${Costa.child} child (3–11)\n• ${Royale.name}: AED ${Royale.adult} adult · AED ${Royale.child} child (3–11)\nBoth include an international buffet dinner and live entertainment.`,
      actions: [{ label: "Book Costa", href: "/book?cruise=costa" }, { label: "Book Royale", href: "/book?cruise=royale" }],
      chips: ["Costa vs Royale", "Timings"],
    }),
  },
  {
    test: /\b(time|timing|when|hour|duration|long|start|schedule)/i,
    reply: () => ({
      text: `Regular sailings run for about two hours, from around ${site.sailingLong}. Your confirmation includes the exact arrival and boarding time.`,
      chips: ["Where do we board?", "Prices"],
    }),
  },
  {
    test: /\b(board|where|location|meeting|pier|marina|address|reach)/i,
    reply: () => ({
      text: `We board in the ${site.boarding} area. The exact meeting point is shared with your confirmed booking, so you'll arrive at the right berth.`,
      chips: ["Timings", "Book a table"],
    }),
  },
  {
    test: /\b(differ|vs|versus|compare|royale|costa|better|premium)/i,
    reply: () => ({
      text: `${Costa.name} is relaxed and value-focused — great for families and first-time visitors.\n${Royale.name} is our premium double-deck experience with live saxophone-style entertainment — popular for couples, celebrations and business guests.`,
      actions: [{ label: "Compare cruises", href: "/cruises" }],
      chips: ["Prices", "Book a table"],
    }),
  },
  {
    test: /\b(birthday|anniversary|private|charter|corporate|event|group|party|celebrat)/i,
    reply: () => ({
      text: "We host birthdays, anniversaries, corporate evenings and private charters. Share your date and guest count with our team and they'll tailor a quote.",
      actions: [{ label: "Message the team", href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Alishba, I'd like a quote for a private event.")}`, external: true }],
    }),
  },
  {
    test: /\b(food|dinner|buffet|veg|vegetarian|halal|menu|eat|diet)/i,
    reply: () => ({
      text: "Both regular sailings include an international buffet dinner. For dietary or allergy needs, add a note when you book and our team will confirm what's possible.",
      chips: ["Book a table"],
    }),
  },
  {
    test: /\b(kid|child|children|family|baby|infant)/i,
    reply: () => ({
      text: `Families are very welcome. Child tickets (ages 3–11) are AED ${Costa.child} on Costa and AED ${Royale.child} on Royale.`,
      chips: ["Book a table", "Prices"],
    }),
  },
  {
    test: /\b(book|reserve|availability|available|tonight|tomorrow)/i,
    reply: () => ({
      text: "You can pick your cruise, date, deck and guests in under a minute — our team then confirms availability on WhatsApp.",
      actions: [{ label: "Start booking", href: "/book" }],
    }),
  },
  {
    test: /\b(hi|hello|hey|salam|assalam|good (morning|evening|afternoon))/i,
    reply: () => ({ text: "Hello and welcome aboard! How can I help with your Dubai Marina evening?", chips: starterChips }),
  },
];

export function getDemoReply(input: string): BotReply {
  const hit = rules.find(r => r.test.test(input));
  if (hit) return hit.reply();
  return {
    text: "Good question — I'm still learning that one. Our team can answer right away on WhatsApp.",
    actions: [{ label: "Ask on WhatsApp", href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(input)}`, external: true }],
    chips: starterChips.slice(0, 3),
  };
}

/** Scripted captions for the demo voice call. */
export const voiceScript = [
  { who: "ai", text: "Hi, this is Alishba's AI concierge. How can I help with your cruise tonight?" },
  { who: "you", text: "What time does the Royale sail?" },
  { who: "ai", text: `Royale sails from around ${site.sailingLong}, boarding in ${site.boarding}.` },
  { who: "you", text: "And the price for two adults?" },
  { who: "ai", text: `That's AED ${Royale.adult * 2} at the regular rate, with buffet dinner and live entertainment included.` },
  { who: "ai", text: "Shall I send you the booking link on WhatsApp?" },
] as const;
