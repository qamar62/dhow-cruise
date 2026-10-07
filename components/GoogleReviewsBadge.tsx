import { ArrowUpRight, Star } from "lucide-react";
import { googleReviews } from "@/lib/site";

function GoogleG() {
  // Neutral four-colour "G" mark used to attribute reviews to Google.
  return (
    <svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** Google reviews badge. Shows stars + figures only when real values are set in lib/site.ts. */
export function GoogleReviewsBadge({ variant = "pill" }: { variant?: "pill" | "card" }) {
  const { rating, count, url } = googleReviews;
  const hasRating = typeof rating === "number" && rating > 0;
  const full = hasRating ? Math.round(rating!) : 0;

  return (
    <a className={`g-badge g-badge-${variant}`} href={url} target="_blank" rel="noopener noreferrer"
       aria-label={hasRating ? `Rated ${rating} out of 5 on Google${count ? ` from ${count} reviews` : ""}. Read reviews` : "Read Alishba Cruises reviews on Google"}>
      <span className="g-badge-logo"><GoogleG /></span>
      <span className="g-badge-body">
        <span className="g-badge-top">
          {hasRating && <strong>{rating!.toFixed(1)}</strong>}
          {hasRating
            ? <span className="g-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} className={i < full ? "on" : ""} />)}</span>
            : <span className="g-badge-title">Google reviews</span>}
        </span>
        <small>{hasRating ? `${count ? `${count.toLocaleString("en")} ` : ""}Google reviews` : "See what our guests say"}</small>
      </span>
      <ArrowUpRight className="g-badge-arrow" size={15} aria-hidden="true" />
    </a>
  );
}
