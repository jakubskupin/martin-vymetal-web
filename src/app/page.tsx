"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export default function Home() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const footerImageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Animated logo state
  const logoTexts = useRef<(HTMLSpanElement | null)[]>([null, null, null]);
  const logoCurrent = useRef(0);
  const logoBusy = useRef(false);
  const logoSequence = [1, 2, 2, 2];
  const logoSeqIndex = useRef(0);

  const handleLogoEnter = useCallback(() => {
    if (logoBusy.current) return;
    logoBusy.current = true;

    const prev = logoCurrent.current;
    logoCurrent.current = logoSequence[logoSeqIndex.current];
    logoSeqIndex.current = (logoSeqIndex.current + 1) % logoSequence.length;

    // Same text repeated — quick opacity fade
    if (prev === logoCurrent.current) {
      const el = logoTexts.current[logoCurrent.current];
      if (el) {
        el.style.transition = "opacity 0.25s ease";
        el.style.opacity = "0";
        setTimeout(() => {
          el.style.opacity = "1";
          setTimeout(() => {
            el.style.transition = "";
            logoBusy.current = false;
          }, 300);
        }, 280);
      }
      return;
    }

    logoTexts.current[prev]?.classList.remove("visible");
    logoTexts.current[prev]?.classList.add("gone");

    setTimeout(() => {
      logoTexts.current[logoCurrent.current]?.classList.add("visible");
    }, 80);

    setTimeout(() => {
      logoTexts.current[prev]?.classList.remove("gone");
      logoBusy.current = false;
    }, 900);
  }, []);

  const handleLogoLeave = useCallback(() => {
    const cur = logoCurrent.current;
    if (cur === 0) return;

    logoTexts.current[cur]?.classList.remove("visible");
    logoTexts.current[cur]?.classList.add("gone");

    setTimeout(() => {
      logoTexts.current[0]?.classList.add("visible");
    }, 80);

    setTimeout(() => {
      logoTexts.current[cur]?.classList.remove("gone");
      logoCurrent.current = 0;
      logoBusy.current = false;
    }, 900);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroImageRef.current) {
        const speed = 0.3;
        const maxShift = 80;
        const offset = Math.min(window.scrollY * speed, maxShift);
        heroImageRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }

      if (footerImageRef.current && footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.top < windowH && rect.bottom > 0) {
          const progress = (windowH - rect.top) / (windowH + rect.height);
          const speed = 0.3;
          const maxShift = 100;
          const offset = Math.min(progress * maxShift * (1 / speed), maxShift);
          footerImageRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-[var(--color-bg)] overflow-x-hidden">
      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between h-[60px] px-[24px] md:h-[80px] md:px-[56px]">
        {/* Mobile logo */}
        <span className="font-playfair text-[24px] font-bold text-[var(--color-gold)] md:hidden">
          MV.
        </span>
        {/* Desktop animated logo */}
        <div
          className="hidden md:inline-block relative w-[320px] h-[34px] cursor-pointer"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
        >
          <span
            ref={(el) => { logoTexts.current[0] = el; }}
            className="logo-text visible font-playfair text-[28px] font-bold text-[var(--color-gold)] uppercase tracking-[0.1em]"
          >
            MV.
          </span>
          <span
            ref={(el) => { logoTexts.current[1] = el; }}
            className="logo-text font-playfair text-[28px] font-bold text-[var(--color-gold)] uppercase tracking-[0.1em]"
          >
            MEDOVÝ VOICE
          </span>
          <span
            ref={(el) => { logoTexts.current[2] = el; }}
            className="logo-text font-playfair text-[28px] font-bold text-[var(--color-gold)] uppercase tracking-[0.1em]"
          >
            MARTIN VYMĚTAL
          </span>
        </div>
        {/* Hamburger — mobile only */}
        <button
          className="flex flex-col justify-center gap-[5px] w-[24px] h-[24px] md:hidden invisible"
          aria-label="Menu"
        >
          <span className="w-full h-[2px] bg-[var(--color-white)]" />
          <span className="w-full h-[2px] bg-[var(--color-white)]" />
          <span className="w-full h-[2px] bg-[var(--color-white)]" />
        </button>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-[32px]">
          <a
            href="#proces"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            PROCES
          </a>
          <a
            href="#dukazy"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            DŮKAZY
          </a>
          <a
            href="#podcast"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            PODCAST
          </a>
          <a
            href="#kontakt"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-white)] px-[24px] py-[12px] hover:bg-[var(--color-gold)] transition-colors"
          >
            KONTAKT
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative h-[600px] md:h-[800px] overflow-hidden">
        {/* Top fade from nav */}
        <div className="absolute top-0 left-0 right-0 h-[60px] md:h-[60px] bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
        {/* Background image — parallax with safe top offset so head stays visible */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 -top-[40px] md:-top-[20px] bottom-0 bg-cover bg-[center_15%] will-change-transform"
          style={{ backgroundImage: "url('/mv-most-hol.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0AEE] via-[#0A0A0A66] to-[#0A0A0AEE]" />
        {/* Content */}
        <div className="relative flex flex-col justify-center h-full px-[24px] md:px-[56px] gap-[24px] md:gap-[32px]">
          <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
            <span className="md:hidden">MARTIN VYMĚTAL</span>
            <span className="hidden md:inline">
              MARTIN VYMĚTAL — MARKETING &amp; KOMUNIKACE
            </span>
          </span>
          <h1 className="font-grotesk text-[36px] md:text-[72px] font-bold text-[var(--color-white)] leading-[0.95] tracking-[-1px] md:max-w-[900px]">
            MARKETING JE
            <br />
            BOJ O POZORNOST.
            <br />
            VYHRAJETE HO
          </h1>
          <p className="font-mono text-[13px] md:text-[16px] text-[var(--color-gray)] leading-[1.6]">
            Najdeme tři rozhodnutí, která změní váš marketing během 14 dní.
          </p>
          <a
            href="https://www.linkedin.com/in/martinvymetal/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[24px] md:px-[32px] py-[14px] md:py-[16px] w-fit hover:brightness-110 transition"
          >
            OZVĚTE SE MI →
          </a>
        </div>
      </section>

      {/* ─── Problems Section ─── */}
      <section className="relative flex flex-col md:flex-row gap-[40px] md:gap-[80px] px-[24px] md:px-[56px] py-[48px] md:py-[80px]">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[var(--color-bg)] to-transparent pointer-events-none" />
        {/* Left */}
        <div className="flex flex-col gap-[24px] md:w-[400px] md:shrink-0">
          <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
            CO VYŘEŠÍME
          </span>
          <h2 className="font-grotesk text-[32px] md:text-[42px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px]">
            Kde se
            <br />
            ztrácí
            <br />
            pozornost
          </h2>
        </div>
        {/* Right */}
        <div className="flex flex-col flex-1">
          {[
            {
              num: "01",
              title: "Obsah bez dopadu",
              desc: "Redakční páteř + měření. Víte co publikovat a proč.",
            },
            {
              num: "02",
              title: "Nuda značky",
              desc: "1–2 jasné signály a konzistence. Značka, která není nudná.",
            },
            {
              num: "03",
              title: "AI chaos",
              desc: "Rámec kvality a použití. AI jako orchestr, člověk jako dirigent.",
            },
            {
              num: "04",
              title: "Příliš aktivit",
              desc: "Seznam toho, co škrtnout. Méně hluku, víc výsledků.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="flex gap-[16px] md:gap-[24px] pt-[20px] md:pt-[24px] border-t border-[var(--color-border)]"
            >
              <span className="font-mono text-[14px] font-semibold text-[var(--color-border)]">
                {item.num}
              </span>
              <div className="flex flex-col gap-[6px] flex-1">
                <h3 className="font-grotesk text-[16px] md:text-[18px] font-semibold text-[var(--color-white)]">
                  {item.title}
                </h3>
                <p className="font-mono text-[12px] md:text-[13px] text-[var(--color-gray)] leading-[1.5]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Process (How) Section ─── */}
      <section
        id="proces"
        className="flex flex-col gap-[32px] md:gap-[48px] px-[24px] md:px-[56px] py-[48px] md:py-[80px]"
      >
        <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
          PROCES
        </span>
        <h2 className="font-grotesk text-[32px] md:text-[42px] font-bold text-[var(--color-white)] tracking-[-1px]">
          TŘI KROKY
        </h2>
        <div className="flex flex-col md:flex-row gap-[16px] md:gap-0 w-full">
          {[
            {
              num: "01",
              title: "ZPRÁVA",
              desc: "2–3 věty kontextu. LinkedIn, mail — jak chcete.",
            },
            {
              num: "02",
              title: "CALL",
              desc: "Pojmenujeme problém. 30 minut. Bez omáčky.",
            },
            {
              num: "03",
              title: "TAHÁK",
              desc: "Kroky na 14 dní. Co udělat, co škrtnout.",
            },
          ].map((step) => (
            <div
              key={step.num}
              className="flex flex-col gap-[12px] md:gap-[16px] p-[24px] md:p-[32px] border border-[var(--color-border)] md:flex-1"
            >
              <span className="font-grotesk text-[48px] md:text-[64px] font-bold text-[var(--color-gold)] leading-[0.85]">
                {step.num}
              </span>
              <span className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-white)] tracking-[1px]">
                {step.title}
              </span>
              <p className="font-mono text-[12px] md:text-[13px] text-[var(--color-gray)] leading-[1.5]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Proof Section ─── */}
      <section
        id="dukazy"
        className="flex flex-col gap-[32px] md:gap-[48px] px-[24px] md:px-[56px] py-[48px] md:py-[80px] border-t border-[var(--color-border)]"
      >
        <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
          DŮKAZY
        </span>
        <div className="grid grid-cols-2 gap-[12px] md:grid-cols-4 md:gap-0">
          {/* Card 1 — gold bg */}
          <div className="flex flex-col gap-[6px] p-[24px] md:p-[32px] bg-[var(--color-gold)]">
            <span className="font-grotesk text-[36px] md:text-[48px] font-bold text-[var(--color-dark)] leading-[0.85]">
              2001
            </span>
            <span className="font-mono text-[9px] md:text-[11px] text-[var(--color-dark)] tracking-[1px]">
              ZALOŽENÍ BOOMERANGU
            </span>
          </div>
          {/* Cards 2-4 */}
          {[
            {
              value: "2025",
              label: "BOOMERANG JE AGENTURA ROKU",
              color: "var(--color-white)",
            },
            {
              value: "200+",
              label: "FIREM A PROJEKTŮ",
              color: "var(--color-white)",
            },
            {
              value: "5 970",
              label: "KM NA TRAILU",
              color: "var(--color-gold)",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="flex flex-col gap-[6px] p-[24px] md:p-[32px] border border-[var(--color-border)]"
            >
              <span
                className="font-grotesk text-[36px] md:text-[48px] font-bold leading-[0.85]"
                style={{ color: card.color }}
              >
                {card.value}
              </span>
              <span className="font-mono text-[9px] md:text-[11px] text-[var(--color-gray)] tracking-[1px]">
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quote Section ─── */}
      <section className="flex px-[24px] md:px-[120px] py-[48px] md:py-[80px]">
        {/* Accent Line */}
        <div className="w-[3px] shrink-0 bg-[var(--color-gold)]" />
        {/* Content */}
        <div className="flex flex-col gap-[20px] md:gap-[24px] pl-[24px] md:pl-[40px]">
          {/* Source */}
          <div className="flex items-center gap-[10px] md:gap-[12px]">
            <span className="flex items-center justify-center bg-[#CC0000] rounded-[2px] px-[12px] h-[20px] md:h-[24px] w-[64px] md:w-[80px] font-[Inter] text-[10px] md:text-[12px] font-black text-white tracking-[1px]">
              CNN
            </span>
            <span className="font-[Inter] text-[11px] md:text-[13px] font-light text-[#555555]">
              Prima NEWS
            </span>
          </div>
          <blockquote className="font-grotesk text-[28px] md:text-[42px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px] md:max-w-[800px]">
            „Srdce z masa a mozek z křemíku."
          </blockquote>
          {/* Mobile attribution */}
          <span className="font-mono text-[10px] text-[var(--color-gray)] tracking-[1px] md:hidden">
            — MARTIN VYMĚTAL
          </span>
          {/* Desktop attribution */}
          <p className="hidden md:block font-mono text-[12px] text-[var(--color-gray)] tracking-[1px] leading-[1.6] max-w-[684px]">
            Jak v éře umělé inteligence uspět tím, že firmy spojí lidskou
            empatii a citlivost s technologickou efektivitou AI a pochopí, že
            pozornost je dnes nejvzácnější měnou.
            <br />
            <br />— MARTIN VYMĚTAL
          </p>
          {/* Mobile link */}
          <a
            href="https://cnn.iprima.cz/srdce-z-masa-turbo-z-kremiku-jak-uspet-v-ere-ai-488670"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] font-semibold text-[var(--color-gold)] tracking-[2px] hover:brightness-110 transition md:hidden"
          >
            ČÍST ČLÁNEK →
          </a>
          {/* Desktop link */}
          <a
            href="https://cnn.iprima.cz/srdce-z-masa-turbo-z-kremiku-jak-uspet-v-ere-ai-488670"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block font-mono text-[11px] font-semibold text-[var(--color-gold)] tracking-[2px] hover:brightness-110 transition"
          >
            CELÝ ROZHOVOR →
          </a>
        </div>
      </section>

      {/* ─── Podcasts Section ─── */}
      <section
        id="podcast"
        className="flex flex-col gap-[32px] md:gap-[48px] px-[24px] md:px-[56px] py-[48px] md:py-[80px] border-t border-[var(--color-border)]"
      >
        <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
          SLYŠET &amp; VIDĚT
        </span>
        <h2 className="font-grotesk text-[32px] md:text-[42px] font-bold text-[var(--color-white)] tracking-[-1px]">
          PODCASTY &amp; ROZHOVORY
        </h2>
        <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] w-full">
          {[
            {
              label: "GS Talks #26",
              title: "Úspěch v hluku světa",
              desc: "Proč je marketing neustálým bojem o pozornost lidí a jak blízko hraně se musíme pohybovat, abychom zaujali? Co vlastně znamená být vidět a zároveň zůstat věrohodný?",
              img: "/podcast-thumb-1.png",
              url: "https://www.youtube.com/watch?v=wLgRapMFBM8",
            },
            {
              label: "Jak na sítě #39",
              title: "Ekonomika pozornosti",
              desc: "Proč by značky měly přemýšlet jako mediální domy, jaká je skutečná cena pozornosti v dnešním marketingu a jak poznat, kdy vyhrává atraktivita nad opravdovou hodnotou?",
              img: "/podcast-thumb-2.png",
              url: "https://www.youtube.com/watch?v=5PRd4q3y03A",
            },
            {
              label: "FINANČNÍ NEZÁVISLOST",
              title: "Podnikání je jako žvýkání skla",
              desc: "Jaká je skutečná cena podnikání a úspěchu, co obnáší tvrdá realita budování firmy a jak růst udržitelně, aniž by značka ztratila své hodnoty?",
              img: "/podcast-thumb-3.png",
              url: "https://www.youtube.com/watch?v=YB8SFVSYu6M",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex flex-col border border-[var(--color-border)] md:flex-1 overflow-hidden"
            >
              {/* Thumbnail with bottom fade */}
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-[180px] md:h-[240px] w-full overflow-hidden block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-[center_20%]"
                  style={{ backgroundImage: `url('${card.img}')` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 40%, #0A0A0ABB 80%, #0A0A0AFF 100%)",
                  }}
                />
              </a>
              <div className="flex flex-col gap-[10px] md:gap-[12px] p-[20px] md:p-[24px]">
                <span className="font-mono text-[9px] md:text-[10px] text-[var(--color-gold)] tracking-[1px]">
                  {card.label}
                </span>
                <h3 className="font-grotesk text-[18px] md:text-[22px] font-bold text-[var(--color-white)]">
                  {card.title}
                </h3>
                <p className="font-mono text-[11px] md:text-[13px] text-[var(--color-gray)] leading-[1.5]">
                  {card.desc}
                </p>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
                >
                  POSLECHNOUT →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Transition A — Headline Quote ─── */}
      <section className="flex items-center justify-center h-[360px] md:h-[480px] px-[24px] md:px-0 bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
          <div className="w-[48px] h-[2px] bg-[var(--color-gold)]" />
          <h2 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px] text-center max-w-[800px]">
            Nejen mluvím.
            <br />
            Taky dělám.
          </h2>
          <p className="font-mono text-[12px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] text-center max-w-[640px]">
            Podcast je jen začátek. Přednáším, běhám traily, spolupracuji se
            značkami a pomáhám firmám najít odvahu ke změně.
          </p>
          <div className="w-[120px] h-px bg-[var(--color-border)]" />
        </div>
      </section>

      {/* ─── Layout B — Alternating Columns ─── */}
      <section className="flex flex-col bg-[var(--color-bg)]">
        {/* Středověk Row — text left, video right */}
        <div className="flex flex-col md:flex-row h-auto md:h-[560px]">
          <div className="flex flex-col gap-[24px] px-[24px] py-[48px] md:p-[80px_56px] md:w-[660px] md:shrink-0 md:h-[560px]">
            {/* <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
              POSLECHNĚTE
            </span> */}
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px]">
              Středo/věk
            </h3>
            <p className="font-mono text-[12px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Už pět let s kamarády Petrem Márou a Janem Dobrovským tvoříme
              podcast středo/věk. Otevřený dialog o příležitostech, které
              přináší střední věk. Pro dlouhé cesty autem perfektní parťák. Pro
              váš zároveň vhled do toho, jak přemýšlím o životě, práci i
              změnách.
            </p>
            <a
              href="https://open.spotify.com/show/4PrpbPO5RQ03epa1XOUuJf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
            >
              POSLECHNOUT NA SPOTIFY →
            </a>
          </div>
          <div className="h-[300px] md:h-[560px] md:flex-1 bg-[#0A0A0A] overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/1VF8_RRCPBk"
              title="Středo/věk"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Přednášky Row — photo left, text right */}
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-[560px] border-t border-[var(--color-border)]">
          <div className="relative h-[300px] md:h-[560px] md:w-[54%] md:shrink-0 overflow-hidden bg-[#1A1A1A]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/mv-speaker.jpg')" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 40%, #0A0A0ABB 80%, #0A0A0AFF 100%)",
              }}
            />
          </div>
          <div className="flex flex-col gap-[24px] px-[24px] py-[48px] md:p-[80px_56px] md:flex-1 md:h-[560px]">
            {/* <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
              POTKEJTE
            </span> */}
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px] leading-[1] max-w-[520px]">
              Přednášky
              <br />a workshopy
            </h3>
            <p className="font-mono text-[12px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Přednáším, moderuji a vstupuji do workshopů. Pomáhám firmám
              otevřít diskusi o značce, změně a věcech, které je občas potřeba
              rozbít, aby se mohly znovu poskládat. Rád budu u vašeho eventu
              nebo konference.
            </p>
            <a
              href="https://www.linkedin.com/in/martinvymetal/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
            >
              DOMLUVIT PŘEDNÁŠKU →
            </a>
          </div>
        </div>

        {/* Traily Row — text left, youtube right */}
        <div className="flex flex-col md:flex-row h-auto md:h-[560px]">
          <div className="flex flex-col gap-[24px] px-[24px] py-[48px] md:p-[80px_56px] md:w-[660px] md:shrink-0 md:h-[560px]">
            {/* <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
              POJĎME
            </span> */}
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px] leading-[1] max-w-[520px]">
              Traily
              <br />a průvodcovství
            </h3>
            <p className="font-mono text-[12px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Kdo řekl, že nejlepší nápady vznikají v zasedačkách? Vezmu vás na
              hike a budoucnost vaší značky probereme při chůzi. Za posledních
              pět let jsem na dálkových cestách nachodil přes 6 000 kilometrů a
              vím, že hlava nejlépe myslí právě v pohybu.
            </p>
          </div>
          <div className="h-[300px] md:h-[560px] md:flex-1 bg-[#0A0A0A] overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dorc3Lajtyw?start=1060"
              title="Traily"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Influencing Row — photo left, text right */}
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-[420px] border-t border-[var(--color-border)]">
          <div className="relative h-auto aspect-[4/5] md:aspect-auto md:h-[420px] md:w-[54%] md:shrink-0 overflow-hidden bg-[#1A1A1A]">
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat md:bg-cover md:bg-bottom"
              style={{ backgroundImage: "url('/vymetal-drivalia.jpg')" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 60%, #0A0A0A99 85%, #0A0A0ADD 100%)",
              }}
            />
          </div>
          <div className="flex flex-col gap-[24px] px-[24px] py-[48px] md:p-[56px_56px] md:flex-1 md:h-[420px]">
            {/* <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
              INFLUENCING
            </span> */}
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px]">
              Grandfluencer
            </h3>
            <p className="font-mono text-[12px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Nelovím trendy na týden. Jsem grandfluencer, protože mám
              zkušenosti, příběh a odvahu říkat značkám, co dává dlouhodobě
              smysl. Jako hrdý ambasador operativního leasingu Drivalia Premium
              GO jezdím ve Volvo XC60 a zároveň zastupuji prémiovou péči o pleť
              Augustinus Bader v síti parfumérií Fann.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Transition B — Minimal Breather ─── */}
      <section className="flex items-center justify-center h-[360px] md:h-[480px] bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-[24px]">
          <div className="w-px h-[80px] bg-[var(--color-gold)]" />
          <span className="font-mono text-[10px] md:text-[11px] text-[#555555] tracking-[3px] text-center">
            ČEKÁ VÁS Z/LOM
          </span>
          <div className="w-px h-[80px] bg-[var(--color-gold)]" />
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section
        id="kontakt"
        className="flex flex-col items-center gap-[24px] md:gap-[32px] px-[24px] md:px-[56px] py-[64px] md:py-[100px] bg-[var(--color-bg)]"
      >
        <h2 className="font-grotesk text-[36px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px] text-center">
          CHCETE JASNÝ
          <br className="md:hidden" />
          {" "}NÁZOR?
        </h2>
        <p className="font-mono text-[13px] md:text-[16px] text-[var(--color-gray)] text-center">
          Bez formulářů. Jedna zpráva.
        </p>
        <a
          href="https://www.linkedin.com/in/martinvymetal/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[32px] md:px-[40px] py-[14px] md:py-[16px] hover:brightness-110 transition"
        >
          NAPIŠTE MI NA LINKEDIN →
        </a>
      </section>

      {/* ─── Footer ─── */}
      <footer ref={footerRef} className="relative h-[500px] md:h-[900px] overflow-hidden">
        {/* Background image — parallax */}
        <div
          ref={footerImageRef}
          className="absolute inset-x-0 w-full h-[700px] md:h-[1440px] bg-cover bg-center opacity-50 top-[-50px] md:top-[-180px] will-change-transform"
          style={{ backgroundImage: "url('/90390.jpg')" }}
        />
        {/* Top fade from content above */}
        <div className="absolute top-0 left-0 right-0 h-[120px] md:h-[180px] bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
        {/* Gradient overlay — mobile (top to bottom) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A11 35%, #0A0A0ABB 70%, #0A0A0A 88%)",
          }}
        />
        {/* Gradient overlay — desktop (left to right) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #0A0A0A00 0%, #0A0A0A11 35%, #0A0A0ABB 70%, #0A0A0A 88%)",
          }}
        />
        {/* Content */}
        <div className="relative flex flex-col justify-end h-full gap-[20px] md:gap-[24px] px-[24px] md:px-[56px] py-[40px] md:py-[60px]">
          <span className="font-playfair text-[28px] md:text-[32px] font-bold text-[var(--color-gold)]">
            MV.
          </span>
          <div className="w-full h-px bg-[var(--color-border)]" />
          <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-[16px]">
            <span className="font-mono text-[10px] md:text-[11px] text-[var(--color-gray)] tracking-[1px]">
              © 2026 MARTIN VYMĚTAL
            </span>
            <div className="flex gap-[20px] md:gap-[32px]">
              <a
                href="https://www.linkedin.com/in/martinvymetal/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] md:text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="https://open.spotify.com/show/4PrpbPO5RQ03epa1XOUuJf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] md:text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                STŘEDO/VĚK
              </a>
              <a
                href="https://boomerang.agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] md:text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                BOOMERANG
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
