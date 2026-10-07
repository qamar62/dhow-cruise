"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./WhatsAppButton";
import { site, waLink } from "@/lib/site";

/** Floating WhatsApp shortcut: appears after the first scroll, hidden on /book (which already hands off to WhatsApp). */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/book")) return null;
  return (
    <a className={`whatsapp-fab ${visible ? "is-visible" : ""}`} href={waLink(`Hello ${site.name}, I'd like to ask about a Dubai Marina dinner cruise.`)} target="_blank" rel="noopener noreferrer" aria-label="Chat with Alishba Cruises on WhatsApp" tabIndex={visible ? 0 : -1}>
      <WhatsAppIcon />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
