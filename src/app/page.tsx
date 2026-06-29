"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  // ---- Shared state (mirrors the original Component's this.state) ----
  const [scrolled, setScrolled] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [procIndex, setProcIndex] = useState(0);
  const [activeNav, setActiveNav] = useState(-1);
  const [navDocked, setNavDocked] = useState(false);
  const [openCard, setOpenCard] = useState(-1);
  const [narrow, setNarrow] = useState(false);
  const [activeService, setActiveService] = useState(-1);
  const [intent, setIntent] = useState(-1);
  const [rotIndex, setRotIndex] = useState(0);

  // ---- Refs needed across sections for scroll-driven transforms ----
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const workWrapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const procWrapRef = useRef<HTMLDivElement>(null);
  const procTrackRef = useRef<HTMLDivElement>(null);
  const procFillRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const navFillRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const applyDeck = useCallback(
    (commit: boolean) => {
      const w = workWrapRef.current;
      if (!w) return;
      const total = w.offsetHeight - window.innerHeight;
      const top = w.getBoundingClientRect().top;
      const scrolledPx = Math.min(Math.max(-top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolledPx / total : 0;
      const u = Math.min(1, Math.max(0, (p - 0.16) / 0.68));
      const c1 = card1Ref.current;
      const c2 = card2Ref.current;
      if (c1) {
        c1.style.transform = `translateY(${-100 * u}vh) translateZ(0)`;
        c1.style.pointerEvents = u < 0.5 ? "auto" : "none";
      }
      if (c2) {
        c2.style.transform = `translateY(${(1 - u) * 5}vh) translateZ(0)`;
        c2.style.pointerEvents = u >= 0.5 ? "auto" : "none";
      }
      const ap = u < 0.5 ? 0 : 1;
      if (commit) {
        setActiveProject((prev) => {
          if (ap !== prev) {
            setOpenCard(-1);
            return ap;
          }
          return prev;
        });
      }
    },
    []
  );

  const applyProcess = useCallback(
    (commit: boolean) => {
      const w = procWrapRef.current;
      if (!w) return;
      const steps = 5;
      const total = w.offsetHeight - window.innerHeight;
      const top = w.getBoundingClientRect().top;
      const scrolledPx = Math.min(Math.max(-top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolledPx / total : 0;
      const track = procTrackRef.current;
      if (track) track.style.transform = `translateX(-${p * (steps - 1) * 100}vw)`;
      const fill = procFillRef.current;
      if (fill) fill.style.width = `${p * 100}%`;
      const idx = Math.round(p * (steps - 1));
      if (commit) {
        setProcIndex((prev) => (idx !== prev ? idx : prev));
      }
    },
    []
  );

  // Scroll handler — mirrors componentDidMount's this._onScroll
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 24;
      setScrolled((prev) => (prev !== s ? s : prev));

      const h = heroWrapRef.current;
      if (h) {
        const total = h.offsetHeight - window.innerHeight;
        const top = h.getBoundingClientRect().top;
        const scrolledPx = Math.min(Math.max(-top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolledPx / total : 0;
        const stage = Math.min(4, Math.max(0, Math.floor(p * 5)));
        setActiveStage((prev) => (prev !== stage ? stage : prev));
      }

      applyDeck(true);
      applyProcess(true);

      const doc = document.documentElement;
      const prog = window.scrollY / (doc.scrollHeight - window.innerHeight || 1);
      const fill = navFillRef.current;
      if (fill) fill.style.width = `${Math.min(100, Math.max(0, prog * 100))}%`;

      const secs = ["work", "services", "process", "start"];
      let act = -1;
      secs.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) act = i;
      });
      setActiveNav((prev) => (prev !== act ? act : prev));

      const hb = heroWrapRef.current;
      let docked = false;
      if (hb) docked = hb.getBoundingClientRect().bottom <= window.innerHeight + 1;
      setNavDocked((prev) => (prev !== docked ? docked : prev));

      const bar = navBarRef.current;
      if (bar) {
        const drop = window.innerHeight - 36 - bar.offsetHeight;
        bar.style.transform = docked ? `translateY(${drop}px)` : "translateY(0)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const n = window.innerWidth < 880;
      setNarrow((prev) => (prev !== n ? n : prev));
    };
    window.addEventListener("resize", onResize);
    onResize();

    applyDeck(false);
    applyProcess(false);

    const rotInterval = setInterval(() => {
      setRotIndex((i) => (i + 1) % 4);
    }, 2200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearInterval(rotInterval);
    };
  }, [applyDeck, applyProcess]);

  const goStage = useCallback((i: number) => {
    const h = heroWrapRef.current;
    if (!h) return;
    const total = h.offsetHeight - window.innerHeight;
    const target = h.offsetTop + ((i + 0.5) / 5) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const toggleCard1 = useCallback(() => {
    setOpenCard((prev) => (prev === 0 ? -1 : 0));
  }, []);
  const toggleCard2 = useCallback(() => {
    setOpenCard((prev) => (prev === 1 ? -1 : 1));
  }, []);
  const closeCard = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenCard(-1);
  }, []);
  const clearService = useCallback(() => setActiveService(-1), []);

  const procNum = `0${procIndex + 1}`;
  const year = new Date().getFullYear();

  return (
    <>
      <Nav scrolled={scrolled} navDocked={navDocked} activeNav={activeNav} navBarRef={navBarRef} navFillRef={navFillRef} />
      <Hero heroWrapRef={heroWrapRef} activeStage={activeStage} rotIndex={rotIndex} goStage={goStage} />
      <Marquee />
      <Work
        workWrapRef={workWrapRef}
        card1Ref={card1Ref}
        card2Ref={card2Ref}
        activeProject={activeProject}
        openCard={openCard}
        narrow={narrow}
        toggleCard1={toggleCard1}
        toggleCard2={toggleCard2}
        closeCard={closeCard}
      />
      <Services activeService={activeService} setActiveService={setActiveService} clearService={clearService} />
      <Process procWrapRef={procWrapRef} procTrackRef={procTrackRef} procFillRef={procFillRef} procNum={procNum} />
      <CTA intent={intent} setIntent={setIntent} />
      <Footer footRef={footRef} year={year} />
    </>
  );
}
