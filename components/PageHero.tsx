import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PageHero({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: string }) {
  return (
    <section className="page-hero">
      <div className="page-hero-orbit" aria-hidden="true" />
      <div className="container page-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-copy">
          <p>{copy}</p>
          {action && <Link href="/book" className="text-link">{action} <ArrowUpRight size={17} /></Link>}
        </div>
      </div>
    </section>
  );
}
