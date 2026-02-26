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
      <nav className="hidden md:flex items-center justify-between h-[80px] px-[56px]">
        {/* Animated logo */}
        <div
          className="relative w-[320px] h-[34px] cursor-pointer"
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
        {/* Nav links */}
        <div className="flex items-center gap-[32px]">
          <a
            href="#spoluprace"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            SPOLUPRÁCE
          </a>
          <a
            href="#proces"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            PROCES
          </a>
          <a
            href="#psst"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-gray)] hover:text-[var(--color-white)] transition-colors"
          >
            PSST
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
        {/* Top fade — mobile: subtle 30px, desktop: full 60px */}
        <div className="absolute top-0 left-0 right-0 h-[30px] md:h-[60px] bg-gradient-to-b from-[#0A0A0A99] md:from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
        {/* Background image — mobile (full bleed, parallax) */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center will-change-transform md:hidden"
          style={{ backgroundImage: "url('/mv-most-hol.jpg')" }}
        />
        {/* Background image — desktop (person right) */}
        <div
          className="absolute inset-0 hidden md:block bg-cover will-change-transform"
          style={{
            backgroundImage: "url('/mv-most-hol-hero-desktop.png')",
            backgroundPosition: "70% center",
          }}
        />
        {/* Gradient overlay — mobile (sharp bottom fade) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 35%, #0A0A0ABB 50%, #0A0A0AEE 60%, #0A0A0A 70%)",
          }}
        />
        {/* Gradient overlay — desktop (left to right) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #0A0A0AF5 0%, #0A0A0ADD 25%, #0A0A0A88 40%, #0A0A0A22 50%, #0A0A0A00 60%)",
          }}
        />
        {/* Desktop top/bottom edge fades */}
        <div className="absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#0A0A0A99] to-transparent pointer-events-none hidden md:block" />
        <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none hidden md:block" />
        {/* Content — mobile: bottom-aligned, desktop: centered */}
        <div className="relative flex flex-col justify-end md:justify-center h-full px-[24px] md:px-[56px] pb-[40px] md:pb-0 gap-[16px] md:gap-[32px]">
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
          <p className="font-mono text-[15px] md:text-[20px] text-[#FFFFFFBF] leading-[1.6] md:max-w-[600px]">
            Najdeme <strong className="font-semibold text-[#FFFFFFE6]">tři rozhodnutí</strong>, která změní<br />váš marketing během <strong className="font-semibold text-[#FFFFFFE6]">14 dní</strong>.
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
      <section id="spoluprace" className="relative flex flex-col md:flex-row gap-[40px] md:gap-[80px] px-[24px] md:px-[56px] py-[48px] md:py-[80px]">
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
              title: "Slabá značka",
              desc: "Definujeme 1–2 klíčové signály. Konzistence, rozpoznatelnost, dopad.",
            },
            {
              num: "02",
              title: "Roztříštěný marketing",
              desc: "Škrtáme zbytečné aktivity. Fokus, efektivita, výsledky.",
            },
            {
              num: "03",
              title: "Značka jako médium",
              desc: "Přepneme myšlení na vydavatelský model. Dobrovolná pozornost místo tlaku.",
            },
            {
              num: "04",
              title: "Pozornost = růst",
              desc: "Získanou pozornost převádíme do měřitelného obchodního růstu.",
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
                <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.5]">
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
          Tři kroky
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
              <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.5]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quote Section ─── */}
      <a
        href="https://cnn.iprima.cz/porady/co-na-to-vase-penezenka/co-na-to-vase-penezenka-31-10-v-17-55-1"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-[480px] md:h-[560px] overflow-hidden cursor-pointer"
      >
        {/* Background photo — zoom on hover */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-[center_30%] transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ backgroundImage: "url('/CNN-Prima-1.png')" }}
        />
        {/* Gradient overlay — mobile (bottom heavy) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #0A0A0AEE 0%, #0A0A0ACC 30%, #0A0A0A88 50%, #0A0A0A44 70%, #0A0A0A22 100%)",
          }}
        />
        {/* Gradient overlay — desktop (left to right) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, #0A0A0AF5 0%, #0A0A0ADD 35%, #0A0A0A66 55%, #0A0A0A11 70%)",
          }}
        />
        {/* Gold border on hover */}
        <div className="absolute inset-0 border-[2px] border-transparent group-hover:border-[var(--color-gold)] transition-colors duration-300 pointer-events-none z-10" />
        {/* Content */}
        <div className="relative flex flex-col justify-center h-full px-[24px] md:px-[120px] gap-[20px] md:gap-[24px] max-w-[700px]">
          {/* Source */}
          <div className="flex items-center gap-[12px]">
            <span className="flex items-center justify-center bg-[#CC0000] rounded-[2px] px-[12px] h-[20px] w-[56px] font-[Inter] text-[10px] font-black text-white tracking-[1px]">
              CNN
            </span>
            <span className="font-[Inter] text-[12px] font-light text-[#999999]">
              Prima NEWS
            </span>
          </div>
          <blockquote className="font-grotesk text-[32px] md:text-[48px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px]">
            „Srdce z masa
            <br />a mozek z křemíku."
          </blockquote>
          <p className="font-mono text-[11px] md:text-[12px] text-[#AAAAAA] tracking-[0.5px] leading-[1.6]">
            Jak v éře umělé inteligence uspět tím, že firmy spojí lidskou empatii a citlivost s technologickou efektivitou AI a pochopí, že pozornost je dnes nejvzácnější měnou.
          </p>
          <span className="font-mono text-[11px] font-semibold text-[var(--color-gold)] tracking-[2px] group-hover:brightness-110 transition">
            SLEDOVAT V TELEVIZI →
          </span>
        </div>
      </a>

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
              250+
            </span>
            <span className="font-mono text-[9px] md:text-[11px] text-[var(--color-dark)] tracking-[1px]">
              ZNAČEK, FIREM A PROJEKTŮ
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
              value: "150",
              label: "OCENĚNÍ VČETNĚ 5 EFFIE",
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

      {/* ─── Podcasts Section ─── */}
      <section
        id="psst"
        className="flex flex-col gap-[32px] md:gap-[48px] px-[24px] md:px-[56px] py-[48px] md:py-[80px] border-t border-[var(--color-border)]"
      >
        <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
          PSSST
        </span>
        <h2 className="font-grotesk text-[32px] md:text-[42px] font-bold text-[var(--color-white)] tracking-[-1px]">
          Povědomí &amp; porozumění
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
            <a
              key={card.title}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col border border-[var(--color-border)] md:flex-1 overflow-hidden hover:border-[var(--color-gold)] transition-colors"
            >
              {/* Thumbnail with bottom fade */}
              <div className="relative h-[180px] md:h-[240px] w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-[center_20%] transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url('${card.img}')` }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 40%, #0A0A0ABB 80%, #0A0A0AFF 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-[10px] md:gap-[12px] p-[20px] md:p-[24px]">
                <span className="font-mono text-[9px] md:text-[10px] text-[var(--color-gold)] tracking-[1px]">
                  {card.label}
                </span>
                <h3 className="font-grotesk text-[18px] md:text-[22px] font-bold text-[var(--color-white)]">
                  {card.title}
                </h3>
                <p className="font-mono text-[13px] md:text-[13px] text-[var(--color-gray)] leading-[1.5]">
                  {card.desc}
                </p>
                <span className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px]">
                  POSLECHNOUT →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Transition A — Headline Quote ─── */}
      <section className="flex items-center justify-center h-[360px] md:h-[480px] px-[24px] md:px-0 bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-[24px] md:gap-[32px]">
          <div className="w-[48px] h-[2px] bg-[var(--color-gold)]" />
          <h2 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px] text-center max-w-[800px]">
            Mluvím,
            <br />
            ale hlavně dělám.
          </h2>
          <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] text-center max-w-[640px]">
            Podcasty jsou jen začátek. Tvořím strategie, přednáším, vymýšlím
            a spolupracuji se značkami, které mají odvahu ke změně.
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
            <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Už pět let s kamarády <a href="https://www.youtube.com/c/petrmara" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:brightness-110 transition">Petrem Márou</a> a Janem
              Dobrovským tvoříme podcast Středo/věk. Otevřený dialog
              o příležitostech, které přináší střední věk. Ideální parťák na
              dlouhé cesty autem a zároveň vhled do toho, jak přemýšlím
              o změnách, rozhodování a smyslu věcí. Pravidelně nás{" "}
              <span className="font-semibold text-[var(--color-white)]">poslouchá přes 40 000 lidí</span>, kteří berou střední věk ne jako krizi, ale jako
              startovní čáru.
            </p>
            <div className="flex items-center gap-[20px]">
              <a
                href="https://open.spotify.com/show/4PrpbPO5RQ03epa1XOUuJf"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
              >
                POSLECHNOUT NA SPOTIFY →
              </a>
              <span className="font-mono text-[11px] md:text-[12px] text-[var(--color-gray)] tracking-[0.5px] border border-[var(--color-border)] rounded-[20px] px-[12px] py-[5px]">
                4,9 ★ <span className="opacity-60">(1,7 tis.)</span>
              </span>
            </div>
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
            <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
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
            <span className="inline-block font-mono text-[10px] md:text-[11px] font-bold text-[#1A1A1A] tracking-[2px] bg-[var(--color-gold)] px-[16px] py-[8px] rounded-[4px] self-start">
              NEW
            </span>
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px] leading-[1] max-w-[520px]">
              Traily
              <br />a průvodcovství
            </h3>
            <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Kdo řekl, že nejlepší nápady vznikají v zasedačkách? Za
              posledních pět let jsem pěšky přešel Ameriku legendární cestou
              Pacific Crest Trail, obešel Českou republiku po hranicích,
              obkroužil Julské Alpy a prošel Skotsko. Na dálkových cestách jsem
              nachodil přes 7 000 kilometrů a vím jedno: hlava myslí nejlépe,
              když je tělo v pohybu. Bez slidů, bez tlaku, bez póz. Jen vy,
              cesta a věci, které je potřeba si konečně říct. Pokud chcete
              přemýšlet jinak než všichni ostatní, pojďte se mnou.
            </p>
            <a
              href="https://www.youtube.com/watch?v=g1rNmRCgero"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
            >
              VŠE O PACIFICKÉ HŘEBENOVCE →
            </a>
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
        <div className="flex flex-col-reverse md:flex-row h-auto md:h-[560px] border-t border-[var(--color-border)]">
          <div className="relative h-auto aspect-[4/3] md:aspect-auto md:h-[560px] md:w-[54%] md:shrink-0 overflow-hidden bg-[#1A1A1A]">
            <div
              className="absolute inset-0 bg-cover bg-center md:bg-bottom"
              style={{ backgroundImage: "url('/Drivalia_Martin-vymetal.jpg')" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #0A0A0A00 0%, #0A0A0A00 60%, #0A0A0A99 85%, #0A0A0ADD 100%)",
              }}
            />
          </div>
          <div className="flex flex-col gap-[24px] px-[24px] py-[32px] md:p-[56px_56px] md:flex-1 md:h-[420px]">
            {/* <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
              INFLUENCING
            </span> */}
            <h3 className="font-grotesk text-[32px] md:text-[56px] font-bold text-[var(--color-white)] tracking-[-1px]">
              Granfluencer
            </h3>
            <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Nelovím trendy na týden. Jsem granfluencer, protože mám
              zkušenosti, příběh a odvahu říkat značkám, co dává dlouhodobě
              smysl. Jako hrdý ambasador operativního leasingu <a href="https://www.drivaliago.cz/martin" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:brightness-110 transition">Drivalia</a> Premium
              GO jezdím ve Volvo XC60, cvičím v <a href="https://zeleznakoule.cz/amazing12/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:brightness-110 transition">Železné kouli</a> a zároveň
              zastupuji prémiovou péči o pleť Augustinus Bader v síti
              parfumérií <a href="https://www.fann.cz/produkty?znacky%5B0%5D=297&_gl=1*1cruach*_up*MQ..*_ga*MTE4NTU0ODA3My4xNzcxODU2NjM4*_ga_45N5HDELDL*czE3NzE4NTY2MzckbzEkZzEkdDE3NzE4NTY2NDAkajU3JGwwJGgw" target="_blank" rel="noopener noreferrer" className="text-[var(--color-gold)] hover:brightness-110 transition">FAnn</a>.
            </p>
            <p className="font-mono text-[14px] md:text-[14px] text-[var(--color-gray)] leading-[1.7] max-w-[520px]">
              Spolupracuji jen se značkami, za které se můžu postavit vlastním
              jménem. Takovými, které žiju, používám a kterým opravdu věřím.
              Pokud hledáte rychlý reach, nejsem pro vás. Pokud ale chcete
              partnera, který pomůže vaší značce růst s důvěrou, kontinuitou
              a obsahem, který má váhu, pojďme se potkat.
            </p>
            <a
              href="https://www.linkedin.com/in/martinvymetal/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
            >
              POJĎME SE POTKAT →
            </a>
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
        <p className="font-mono text-[15px] md:text-[16px] text-[var(--color-gray)] text-center">
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
        <div className="absolute top-0 left-0 right-0 h-[240px] md:h-[300px] bg-gradient-to-b from-[var(--color-bg)] to-transparent z-10 pointer-events-none" />
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
        <div className="relative flex flex-col items-center md:items-start justify-end h-full gap-[20px] md:gap-[24px] px-[24px] md:px-[56px] py-[40px] md:py-[60px]">
          <span className="font-playfair text-[28px] md:text-[32px] font-bold text-[var(--color-gold)]">
            MV.
          </span>
          <div className="w-full h-px bg-[var(--color-border)]" />
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between md:items-center w-full gap-[16px]">
            <div className="flex gap-[20px] md:gap-[32px] order-first md:order-last">
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
            <span className="font-mono text-[10px] md:text-[11px] text-[var(--color-gray)] tracking-[1px] order-last md:order-first">
              © 2026 MARTIN VYMĚTAL
            </span>
          </div>
          <span className="font-mono text-[9px] md:text-[10px] text-[var(--color-gray)] tracking-[1px] opacity-50 text-center md:text-left">
            Foto:{" "}
            <a
              href="https://www.gentlemanstore.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold)] hover:opacity-100 transition-colors"
            >
              Gentleman Store
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
