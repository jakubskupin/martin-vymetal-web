export default function Home() {
  return (
    <div className="flex flex-col bg-[var(--color-bg)]">
      {/* ─── Navigation ─── */}
      <nav className="flex items-center justify-between h-[80px] px-[56px] border-b border-[var(--color-border)]">
        <span className="font-playfair text-[28px] font-bold text-[var(--color-gold)]">
          MV.
        </span>
        <div className="flex items-center gap-[32px]">
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
      <section className="relative h-[800px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-[94px]"
          style={{ backgroundImage: "url('/mv-most-hol.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0AEE] via-[#0A0A0A66] to-[#0A0A0AEE]" />
        {/* Content */}
        <div className="relative flex flex-col justify-center h-full px-[56px] gap-[32px]">
          <span className="font-mono text-[12px] text-[var(--color-gold)] tracking-[2px]">
            MARTIN VYMĚTAL — MARKETING &amp; STRATEGIE
          </span>
          <h1 className="font-grotesk text-[72px] font-bold text-[var(--color-white)] leading-[0.95] tracking-[-1px] max-w-[900px]">
            MARKETING JE
            <br />
            BOJ O POZORNOST.
            <br />
            VYHRAJTE HO.
          </h1>
          <p className="font-mono text-[16px] text-[var(--color-gray)] leading-[1.6]">
            Najdeme 3 rozhodnutí, která změní marketing během 14 dní.
          </p>
          <a
            href="#kontakt"
            className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[32px] py-[16px] w-fit hover:brightness-110 transition"
          >
            NAPSAT MARTINOVI →
          </a>
        </div>
      </section>

      {/* ─── Problems Section ─── */}
      <section className="flex gap-[80px] px-[56px] py-[80px] border-t border-[var(--color-border)]">
        {/* Left */}
        <div className="flex flex-col gap-[24px] w-[400px] shrink-0">
          <span className="font-mono text-[12px] text-[var(--color-gold)] tracking-[2px]">
            CO VYŘEŠÍME
          </span>
          <h2 className="font-grotesk text-[42px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px]">
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
              className="flex gap-[24px] pt-[24px] border-t border-[var(--color-border)]"
            >
              <span className="font-mono text-[14px] font-semibold text-[var(--color-border)]">
                {item.num}
              </span>
              <div className="flex flex-col gap-[6px] flex-1">
                <h3 className="font-grotesk text-[18px] font-semibold text-[var(--color-white)]">
                  {item.title}
                </h3>
                <p className="font-mono text-[13px] text-[var(--color-gray)] leading-[1.5]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Process (How) Section ─── */}
      <section id="proces" className="flex flex-col gap-[48px] px-[56px] py-[80px]">
        <span className="font-mono text-[12px] text-[var(--color-gold)] tracking-[2px]">
          PROCES
        </span>
        <h2 className="font-grotesk text-[42px] font-bold text-[var(--color-white)] tracking-[-1px]">
          TŘI KROKY.
        </h2>
        <div className="flex gap-0 w-full">
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
              className="flex flex-col gap-[16px] p-[32px] border border-[var(--color-border)] flex-1"
            >
              <span className="font-grotesk text-[64px] font-bold text-[var(--color-gold)] leading-[0.85]">
                {step.num}
              </span>
              <span className="font-mono text-[12px] font-semibold text-[var(--color-white)] tracking-[1px]">
                {step.title}
              </span>
              <p className="font-mono text-[13px] text-[var(--color-gray)] leading-[1.5]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Proof Section ─── */}
      <section
        id="dukazy"
        className="flex flex-col gap-[48px] px-[56px] py-[80px] border-t border-[var(--color-border)]"
      >
        <span className="font-mono text-[12px] text-[var(--color-gold)] tracking-[2px]">
          DŮKAZY
        </span>
        <div className="flex w-full">
          {/* Card 1 — gold bg */}
          <div className="flex flex-col gap-[6px] p-[32px] bg-[var(--color-gold)] flex-1">
            <span className="font-grotesk text-[48px] font-bold text-[var(--color-dark)] leading-[0.85]">
              2001
            </span>
            <span className="font-mono text-[11px] text-[var(--color-dark)] tracking-[1px]">
              BOOMERANG AGENCY
            </span>
          </div>
          {/* Cards 2-4 */}
          {[
            { value: "2025", label: "AGENTURA ROKU", color: "var(--color-white)" },
            { value: "98+", label: "EPIZOD PODCASTU", color: "var(--color-white)" },
            { value: "59:28", label: "JAK NA SÍTĚ", color: "var(--color-gold)" },
          ].map((card) => (
            <div
              key={card.label}
              className="flex flex-col gap-[6px] p-[32px] border border-[var(--color-border)] flex-1"
            >
              <span
                className="font-grotesk text-[48px] font-bold leading-[0.85]"
                style={{ color: card.color }}
              >
                {card.value}
              </span>
              <span className="font-mono text-[11px] text-[var(--color-gray)] tracking-[1px]">
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quote Section ─── */}
      <section className="flex flex-col gap-[24px] px-[120px] py-[80px] border border-[var(--color-gold)]">
        <blockquote className="font-grotesk text-[42px] font-bold text-[var(--color-white)] leading-[1.1] tracking-[-1px] max-w-[800px]">
          Neporadím vám metodiku.
          <br />
          Člověk je důležitější než proces.
        </blockquote>
        <cite className="font-mono text-[12px] text-[var(--color-gray)] tracking-[1px] not-italic">
          — MARTIN VYMĚTAL, CNN PRIMA NEWS
        </cite>
      </section>

      {/* ─── Podcasts Section ─── */}
      <section
        id="podcast"
        className="flex flex-col gap-[48px] px-[56px] py-[80px] border-t border-[var(--color-border)]"
      >
        <span className="font-mono text-[12px] text-[var(--color-gold)] tracking-[2px]">
          SLYŠET &amp; VIDĚT
        </span>
        <h2 className="font-grotesk text-[42px] font-bold text-[var(--color-white)] tracking-[-1px]">
          PODCASTY &amp; ROZHOVORY
        </h2>
        <div className="flex gap-[24px] w-full">
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
              className="flex flex-col border border-[var(--color-border)] flex-1 overflow-hidden"
            >
              <div
                className="h-[240px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${card.img}')` }}
              />
              <div className="flex flex-col gap-[12px] p-[24px]">
                <span className="font-mono text-[10px] text-[var(--color-gold)] tracking-[1px]">
                  {card.label}
                </span>
                <h3 className="font-grotesk text-[22px] font-bold text-[var(--color-white)]">
                  {card.title}
                </h3>
                <p className="font-mono text-[13px] text-[var(--color-gray)] leading-[1.5]">
                  {card.desc}
                </p>
                <a
                  href="#"
                  className="font-mono text-[12px] font-semibold text-[var(--color-gold)] tracking-[1px] hover:brightness-110 transition"
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
        className="flex flex-col items-center gap-[32px] px-[56px] py-[100px] bg-[var(--color-bg)]"
      >
        <h2 className="font-grotesk text-[56px] font-bold text-[var(--color-white)] tracking-[-1px] text-center">
          CHCETE JASNÝ NÁZOR?
        </h2>
        <p className="font-mono text-[16px] text-[var(--color-gray)] text-center">
          Bez formulářů. Jedna zpráva. Jasné další kroky.
        </p>
        <a
          href="#"
          className="font-mono text-[12px] font-semibold tracking-[1px] text-[var(--color-dark)] bg-[var(--color-gold)] px-[40px] py-[16px] hover:brightness-110 transition"
        >
          POSLAT ZPRÁVU NA LINKEDIN →
        </a>
      </section>

      {/* ─── Footer ─── */}
      <footer className="relative h-[900px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 w-full h-[1440px] bg-cover bg-center opacity-50"
          style={{
            backgroundImage: "url('/mv-most-hol.jpg')",
            top: "-532px",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #0A0A0A00 0%, #0A0A0A11 35%, #0A0A0ABB 70%, #0A0A0A 88%)",
          }}
        />
        {/* Content */}
        <div className="relative flex flex-col justify-end h-full gap-[24px] px-[56px] py-[60px]">
          <span className="font-playfair text-[32px] font-bold text-[var(--color-gold)]">
            MV.
          </span>
          <div className="w-full h-px bg-[var(--color-border)]" />
          <div className="flex justify-between items-center w-full">
            <span className="font-mono text-[11px] text-[var(--color-gray)] tracking-[1px]">
              © 2025 MARTIN VYMĚTAL
            </span>
            <div className="flex gap-[32px]">
              <a
                href="#"
                className="font-mono text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                LINKEDIN
              </a>
              <a
                href="#"
                className="font-mono text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
              >
                PODCAST
              </a>
              <a
                href="#"
                className="font-mono text-[11px] font-semibold text-[var(--color-white)] tracking-[1px] hover:text-[var(--color-gold)] transition-colors"
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
