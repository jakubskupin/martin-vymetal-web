export default function Home() {
  return (
    <div className="flex flex-col bg-[var(--color-bg)]">
      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between h-[60px] px-[24px] md:h-[80px] md:px-[56px] border-b border-[var(--color-border)]">
        <span className="font-playfair text-[24px] md:text-[28px] font-bold text-[var(--color-gold)]">
          MV.
        </span>
        {/* Hamburger — mobile only */}
        <button
          className="flex flex-col justify-center gap-[5px] w-[24px] h-[24px] md:hidden"
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
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/mv-most-hol.jpg')" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0A0A0AEE 0%, #0A0A0A66 60%, #0A0A0AEE 100%)" }}
        />
        {/* Content */}
        <div className="relative flex flex-col justify-center h-full px-[24px] md:px-[56px] gap-[24px] md:gap-[32px]">
          <span className="font-mono text-[10px] md:text-[12px] text-[var(--color-gold)] tracking-[2px]">
            <span className="md:hidden">MARTIN VYMĚTAL</span>
            <span className="hidden md:inline">
              MARTIN VYMĚTAL — MARKETING &amp; STRATEGIE
            </span>
          </span>
          <h1 className="font-grotesk text-[36px] md:text-[72px] font-bold text-[var(--color-white)] leading-[0.95] tracking-[-1px] md:max-w-[900px]">
            MARKETING JE
            <br />
            BOJ O POZORNOST.
            <br />
            VYHRAJTE HO.
          </h1>
          <p className="font-mono text-[13px] md:text-[16px] text-[var(--color-gray)] leading-[1.6]">
            Najdeme 3 rozhodnutí, která změní marketing během 14 dní.
          </p>
          <a
            href="#kontakt"
            className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[24px] md:px-[32px] py-[14px] md:py-[16px] w-fit hover:brightness-110 transition"
          >
            NAPSAT MARTINOVI →
          </a>
        </div>
      </section>

      {/* ─── Problems Section ─── */}
      <section className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] px-[24px] md:px-[56px] py-[48px] md:py-[80px] border-t border-[var(--color-border)]">
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
            pozornost.
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
          TŘI KROKY.
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
              BOOMERANG AGENCY
            </span>
          </div>
          {/* Cards 2-4 */}
          {[
            {
              value: "2025",
              label: "AGENTURA ROKU",
              color: "var(--color-white)",
            },
            {
              value: "98+",
              label: "EPIZOD PODCASTU",
              color: "var(--color-white)",
            },
            {
              value: "59:28",
              label: "JAK NA SÍTĚ",
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
      <section className="flex flex-col gap-[20px] md:gap-[24px] px-[24px] md:px-[120px] py-[48px] md:py-[80px] border border-[var(--color-gold)]">
        <blockquote className="font-grotesk text-[28px] md:text-[42px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px] md:max-w-[800px]">
          Neporadím vám metodiku.
          <br />
          Člověk je důležitější než proces.
        </blockquote>
        <cite className="font-mono text-[10px] md:text-[12px] text-[var(--color-gray)] tracking-[1px] not-italic">
          — MARTIN VYMĚTAL, CNN PRIMA NEWS
        </cite>
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
              label: "PODCAST",
              title: "středo/věk",
              desc: "98+ epizod o životě, práci a věcech mezi tím. Aktivní podcast.",
              img: "https://images.unsplash.com/photo-1675177181386-47292e886953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2MDc4MjJ8&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
              label: "ROZHOVOR · 59:28",
              title: "Jak na sítě",
              desc: "Ekonomika pozornosti — když značka přemýšlí jako redaktor.",
              img: "https://images.unsplash.com/photo-1722842253307-7c2e99bc16d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2MDc4MjJ8&ixlib=rb-4.1.0&q=80&w=1080",
            },
            {
              label: "ROZHOVOR · ~1H10M",
              title: "GS Talks #26",
              desc: "Marketing, AI a budoucnost komunikace. YouRadio.",
              img: "https://images.unsplash.com/photo-1658310073290-ab48982d69d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE2MDc4MjN8&ixlib=rb-4.1.0&q=80&w=1080",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex flex-col border border-[var(--color-border)] md:flex-1 overflow-hidden"
            >
              <div
                className="h-[180px] md:h-[240px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${card.img}')` }}
              />
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
                  href="#"
                  className="font-mono text-[11px] md:text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
                >
                  POSLECHNOUT →
                </a>
              </div>
            </div>
          ))}
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
          <br className="md:hidden" />
          {" "}Jasné další kroky.
        </p>
        <a
          href="#"
          className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[32px] md:px-[40px] py-[14px] md:py-[16px] hover:brightness-110 transition"
        >
          POSLAT ZPRÁVU →
        </a>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative h-[500px] md:h-[900px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-x-0 w-full h-[700px] md:h-[1440px] bg-cover bg-center opacity-50 top-[-100px] md:top-[-532px]"
          style={{ backgroundImage: "url('/mv-most-hol.jpg')" }}
        />
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
              © 2025 MARTIN VYMĚTAL
            </span>
            <div className="flex gap-[20px] md:gap-[32px]">
              <a
                href="#"
                className="font-mono text-[10px] md:text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="#"
                className="font-mono text-[10px] md:text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                PODCAST
              </a>
              <a
                href="#"
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
