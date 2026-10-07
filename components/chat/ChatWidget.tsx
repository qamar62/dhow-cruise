"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowUpRight, AudioLines, ChevronRight, MessageCircle, Mic, MicOff, Phone, PhoneOff, RotateCcw, SendHorizontal, Sparkles, Volume2, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "../WhatsAppButton";
import { getDemoReply, starterChips, voiceScript, type ChatAction } from "./demoBot";
import { site, waLink } from "@/lib/site";

type View = "home" | "chat" | "voice";
type Msg = { id: number; from: "bot" | "user"; text: string; actions?: ChatAction[]; chips?: string[] };
type CallState = "connecting" | "live" | "ended";

const greeting: Msg = {
  id: 0,
  from: "bot",
  text: "Marhaba! I'm Alishba's AI concierge. Ask me about prices, timings, boarding or private events.",
  chips: starterChips,
};

function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <span className="cw-avatar" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width={size * 0.55} height={size * 0.55}>
        <path d="M6 6h9l5 7 5-7h9l-9.5 14L34 34h-9l-5-7-5 7H6l9.5-14z" fill="currentColor" />
      </svg>
    </span>
  );
}

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("home");
  const [teaser, setTeaser] = useState(false);
  const [ready, setReady] = useState(false);

  // chat
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  // voice
  const [call, setCall] = useState<CallState>("connecting");
  const [seconds, setSeconds] = useState(0);
  const [line, setLine] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Entrance + one-time teaser bubble
  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 600);
    let seen = false;
    try { seen = sessionStorage.getItem("alishba-chat-teaser") === "1"; } catch {}
    const t2 = seen ? undefined : setTimeout(() => setTeaser(true), 7000);
    return () => { clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, []);

  const dismissTeaser = () => {
    setTeaser(false);
    try { sessionStorage.setItem("alishba-chat-teaser", "1"); } catch {}
  };

  const openPanel = (v: View = "home") => { setView(v); setOpen(true); dismissTeaser(); };
  const closePanel = useCallback(() => { setOpen(false); launcherRef.current?.focus(); }, []);

  // Escape to close; focus panel on open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closePanel();
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closePanel]);

  // Lock background scroll on small screens while the sheet is open
  useEffect(() => {
    if (!open || window.matchMedia("(min-width: 640px)").matches) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Auto-scroll chat
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => { if (open && view === "chat") inputRef.current?.focus(); }, [open, view]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages(m => [...m.map(x => ({ ...x, chips: undefined })), { id: nextId.current++, from: "user", text: clean }]);
    setDraft("");
    setTyping(true);
    // DEMO: replace with real AI call
    setTimeout(() => {
      const reply = getDemoReply(clean === "Book a table" ? "book" : clean);
      setMessages(m => [...m, { id: nextId.current++, from: "bot", ...reply }]);
      setTyping(false);
    }, 650 + Math.random() * 600);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); send(draft); };
  const resetChat = () => { setMessages([greeting]); nextId.current = 1; };

  // Voice call simulation
  useEffect(() => {
    if (!open || view !== "voice") return;
    if (call === "connecting") {
      const t = setTimeout(() => setCall("live"), 1800);
      return () => clearTimeout(t);
    }
    if (call === "live") {
      const tick = setInterval(() => setSeconds(s => s + 1), 1000);
      const cap = setInterval(() => setLine(l => (l + 1 < voiceScript.length ? l + 1 : l)), 3200);
      return () => { clearInterval(tick); clearInterval(cap); };
    }
  }, [open, view, call]);

  const startCall = () => { setCall("connecting"); setSeconds(0); setLine(0); setMuted(false); setView("voice"); };
  const endCall = () => setCall("ended");

  const speaking = call === "live" ? voiceScript[line].who : null;

  return (
    <div className={`cw ${ready ? "is-ready" : ""} ${open ? "is-open" : ""} ${pathname?.startsWith("/book") ? "is-compact" : ""}`}>
      {open && <div className="cw-backdrop" onClick={closePanel} aria-hidden="true" />}

      {open && (
        <div ref={panelRef} className={`cw-panel view-${view}`} role="dialog" aria-modal="false" aria-label="Chat with Alishba Cruises" tabIndex={-1}>
          {/* Header */}
          <div className="cw-head">
            {view !== "home" ? (
              <button type="button" className="cw-icon-btn" onClick={() => { if (view === "voice") endCall(); setView("home"); }} aria-label="Back to options"><ArrowLeft size={18} /></button>
            ) : <BrandMark />}
            <div className="cw-head-copy">
              <strong>{view === "voice" ? "AI voice concierge" : view === "chat" ? "AI concierge" : "Alishba Cruises"}</strong>
              <span><i className="cw-dot" /> {view === "voice" ? "Demo call" : "Online · replies instantly"}</span>
            </div>
            {view === "chat" && <button type="button" className="cw-icon-btn" onClick={resetChat} aria-label="Restart conversation" title="Restart"><RotateCcw size={16} /></button>}
            <button type="button" className="cw-icon-btn" onClick={closePanel} aria-label="Close chat"><X size={18} /></button>
          </div>

          {/* HOME */}
          {view === "home" && (
            <div className="cw-body cw-home">
              <div className="cw-hero">
                <p className="cw-kicker"><Sparkles size={13} /> Concierge</p>
                <h2>Let’s plan your<br /><em>Marina evening.</em></h2>
                <p>Choose how you’d like to talk to us — we’re here daily, {site.supportHours.replace("Daily · ", "")}.</p>
              </div>
              <div className="cw-options">
                <button type="button" className="cw-option" onClick={() => setView("chat")}>
                  <span className="cw-opt-icon is-ai"><Sparkles size={20} /></span>
                  <span className="cw-opt-copy"><strong>Chat with AI concierge</strong><small>Instant answers on prices, timings & boarding</small></span>
                  <ChevronRight size={18} className="cw-opt-arrow" />
                </button>
                <a className="cw-option" href={waLink(`Hello ${site.name}, I'd like to ask about a Dubai Marina dinner cruise.`)} target="_blank" rel="noopener noreferrer">
                  <span className="cw-opt-icon is-wa"><WhatsAppIcon width={21} height={21} /></span>
                  <span className="cw-opt-copy"><strong>WhatsApp our team</strong><small>Talk to a real person · {site.phoneDisplay}</small></span>
                  <ArrowUpRight size={18} className="cw-opt-arrow" />
                </a>
                <button type="button" className="cw-option" onClick={startCall}>
                  <span className="cw-opt-icon is-voice"><AudioLines size={20} /></span>
                  <span className="cw-opt-copy"><strong>AI voice call <em className="cw-tag">New</em></strong><small>Speak to our concierge, hands-free</small></span>
                  <ChevronRight size={18} className="cw-opt-arrow" />
                </button>
              </div>
              <div className="cw-quick">
                <span>Popular questions</span>
                <div className="cw-chips">{starterChips.slice(0, 4).map(c => <button key={c} type="button" className="cw-chip" onClick={() => { setView("chat"); send(c); }}>{c}</button>)}</div>
              </div>
            </div>
          )}

          {/* CHAT */}
          {view === "chat" && (
            <>
              <div className="cw-body cw-thread" ref={listRef} aria-live="polite">
                <p className="cw-daystamp">Today · AI preview</p>
                {messages.map(m => (
                  <div key={m.id} className={`cw-msg from-${m.from}`}>
                    {m.from === "bot" && <BrandMark size={28} />}
                    <div className="cw-bubble-wrap">
                      <div className="cw-bubble">{m.text.split("\n").map((l, i) => <span key={i}>{l}</span>)}</div>
                      {m.actions && <div className="cw-actions">{m.actions.map(a => a.external
                        ? <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="cw-action">{a.label} <ArrowUpRight size={13} /></a>
                        : <Link key={a.label} href={a.href} className="cw-action" onClick={closePanel}>{a.label} <ArrowUpRight size={13} /></Link>)}</div>}
                      {m.chips && <div className="cw-chips">{m.chips.map(c => <button key={c} type="button" className="cw-chip" onClick={() => send(c)}>{c}</button>)}</div>}
                    </div>
                  </div>
                ))}
                {typing && <div className="cw-msg from-bot"><BrandMark size={28} /><div className="cw-bubble cw-typing" aria-label="Concierge is typing"><i /><i /><i /></div></div>}
              </div>
              <form className="cw-compose" onSubmit={submit}>
                <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ask about prices, timings…" aria-label="Type your message" maxLength={400} />
                <button type="submit" className="cw-send" disabled={!draft.trim() || typing} aria-label="Send message"><SendHorizontal size={18} /></button>
              </form>
              <p className="cw-foot">AI preview with demo answers · <a href={waLink("Hello Alishba Cruises!")} target="_blank" rel="noopener noreferrer">Talk to a person</a></p>
            </>
          )}

          {/* VOICE */}
          {view === "voice" && (
            <div className="cw-body cw-voice">
              <div className={`cw-orb state-${call} ${speaking === "ai" && !muted ? "is-speaking" : ""}`} aria-hidden="true">
                <span /><span /><span />
                <div className="cw-orb-core"><BrandMark size={64} /></div>
              </div>
              <div className="cw-call-status" aria-live="polite">
                {call === "connecting" && <><strong>Connecting…</strong><small>Alishba AI concierge</small></>}
                {call === "live" && <><strong>{fmt(seconds)}</strong><small>{muted ? "You’re muted" : speaking === "ai" ? "Concierge is speaking" : "Listening…"}</small></>}
                {call === "ended" && <><strong>Call ended</strong><small>{fmt(seconds)} · demo call</small></>}
              </div>
              <div className="cw-captions">
                {call === "live" && voiceScript.slice(Math.max(0, line - 1), line + 1).map((l, i) => (
                  <p key={`${line}-${i}`} className={`who-${l.who} ${i === 0 && line > 0 ? "is-past" : ""}`}><b>{l.who === "ai" ? "Concierge" : "You"}</b>{l.text}</p>
                ))}
                {call === "connecting" && <p className="who-ai is-past">Setting up a secure line…</p>}
                {call === "ended" && <p className="who-ai">Thanks for calling. Want the details on WhatsApp?</p>}
              </div>
              {call !== "ended" ? (
                <div className="cw-call-controls">
                  <button type="button" className={`cw-round ${muted ? "is-on" : ""}`} onClick={() => setMuted(m => !m)} aria-pressed={muted} aria-label={muted ? "Unmute" : "Mute"}>{muted ? <MicOff size={20} /> : <Mic size={20} />}</button>
                  <button type="button" className="cw-round is-end" onClick={endCall} aria-label="End call"><PhoneOff size={22} /></button>
                  <button type="button" className={`cw-round ${speaker ? "" : "is-on"}`} onClick={() => setSpeaker(v => !v)} aria-pressed={!speaker} aria-label={speaker ? "Turn speaker off" : "Turn speaker on"}><Volume2 size={20} /></button>
                </div>
              ) : (
                <div className="cw-call-after">
                  <button type="button" className="button button-gold" onClick={startCall}><Phone size={16} /> Call again</button>
                  <a className="button button-whatsapp" href={waLink("Hello Alishba Cruises, please send me the booking details.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width={17} height={17} /> WhatsApp</a>
                </div>
              )}
              <p className="cw-foot">Demo experience — live voice AI coming soon. Your microphone is not used.</p>
            </div>
          )}
        </div>
      )}

      {/* Teaser */}
      {teaser && !open && (
        <div className="cw-teaser" role="status">
          <button type="button" className="cw-teaser-close" onClick={dismissTeaser} aria-label="Dismiss"><X size={13} /></button>
          <button type="button" className="cw-teaser-body" onClick={() => openPanel("home")}>
            <BrandMark size={32} />
            <span><strong>Planning tonight?</strong>Ask our AI concierge anything about the cruise.</span>
          </button>
        </div>
      )}

      {/* Launcher */}
      <button ref={launcherRef} type="button" className="cw-launcher" onClick={() => (open ? closePanel() : openPanel("home"))} aria-expanded={open} aria-label={open ? "Close chat" : "Let's chat"}>
        <span className="cw-launcher-icon">{open ? <X size={22} /> : <MessageCircle size={22} />}<i className="cw-dot" /></span>
        <span className="cw-launcher-label">{open ? "Close" : "Let’s chat"}</span>
      </button>
    </div>
  );
}
