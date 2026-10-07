import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";
import { Header } from "@/components/Header";
import type { CruiseKey } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Dubai Marina Dinner Cruise",
  description: "Choose Alishba Costa or Royale, pick your date, seating and guests, and send your booking request to the Alishba team on WhatsApp.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { cruise } = await searchParams;
  const initialCruise: CruiseKey = cruise === "royale" ? "Royale" : "Costa";
  return <><Header /><main id="main" className="booking-page"><BookingFlow key={initialCruise} initialCruise={initialCruise} /></main></>;
}
