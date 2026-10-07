import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/eb-garamond";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "./globals.css";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Alishba Cruises | Dubai Marina Dinner Dhow Cruise", template: "%s | Alishba Cruises" },
  description: "Choose relaxed Alishba Costa (from AED 150) or premium Alishba Royale (from AED 200) for a two-hour Dubai Marina dinner cruise with buffet dining, live entertainment and skyline views.",
  keywords: ["Dubai Marina dhow cruise", "dhow cruise dinner Dubai", "Dubai dinner cruise", "Marina cruise Dubai", "Alishba Costa", "Alishba Royale"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alishba Cruises — Two ways to see Dubai Marina",
    description: "Relaxed Costa or premium Royale: dinner, entertainment and Dubai Marina views from the water.",
    type: "website",
    siteName: site.name,
    locale: "en_AE",
    url: "/",
    images: [{ url: "/images/og-alishba.jpg", width: 1200, height: 630, alt: "Alishba Costa illuminated at night in Dubai Marina" }],
  },
  twitter: { card: "summary_large_image", title: "Alishba Cruises", description: "Choose your Dubai Marina dinner cruise with Alishba Costa or Alishba Royale.", images: ["/images/og-alishba.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#071a22" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AE">
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
