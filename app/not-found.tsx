import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="not-found">
        <div className="page-hero-orbit" aria-hidden="true" />
        <div className="container">
          <p className="eyebrow">404 · Off course</p>
          <h1>This page has <em>drifted</em> away.</h1>
          <p>The page you were looking for isn’t here, but the Marina still is.</p>
          <div className="hero-actions">
            <Link href="/" className="button button-gold">Back to home <ArrowUpRight size={17} /></Link>
            <Link href="/cruises" className="button button-ghost">See the cruises</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
