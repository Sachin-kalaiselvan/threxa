import { ArrowRight, Check, MessageCircle, PackageCheck, RefreshCcw, ShoppingCart, Sparkles, Star } from "lucide-react";
import threxaLogo from "@/assets/threxa-logo.png";

const painPoints = [
  {
    number: "01",
    title: "Every order is a fifteen-minute tax.",
    copy: "Log in to Shopify. Copy it to Tally. Generate the Shiprocket label. Send the WhatsApp confirmation. Notify the team. Repeat fifty times today.",
    visual: "orders",
    tag: "label · tax · daily",
  },
  {
    number: "02",
    title: "Seven of every ten carts walk away forever.",
    copy: "The customer added the product. They picked the size. They saw the shipping cost. Then a phone call interrupted them. No one ever followed up. The cart cooled into nothing.",
    visual: "cart",
    tag: "missed revenue · follow-up",
  },
  {
    number: "03",
    title: "The reviews you need never arrive.",
    copy: "Eighty percent of D2C purchases happen because of reviews. Yours get collected because no one has the bandwidth to ask. Your best customers stay anonymous.",
    visual: "reviews",
    tag: "review request · after ship",
  },
];

const workflows = [
  {
    eyebrow: "01 — order to shiprocket",
    title: "Three seconds. Five systems. Zero touch.",
    copy: "A customer hits checkout. Threxa fires across your stack — Sheets, Tally, Shiprocket, WhatsApp, your team’s group chat — in the time it takes the page to refresh.",
    chips: ["Shopify", "Tally", "Shiprocket", "Delivery", "Sheets"],
    visual: "flow",
  },
  {
    eyebrow: "02 — cart recovery",
    title: "Win back the seventy percent that walked away.",
    copy: "Cart abandoned. Sixty minutes pass. Threxa sends a personalized WhatsApp with a one-time code. Twenty-four hours later, an email follow-up. Recovers 5–8% of revenue you’d otherwise lose.",
    chips: ["WhatsApp", "Email", "Recovery", "Shopify"],
    visual: "revenue",
  },
  {
    eyebrow: "03 — reviews & retention",
    title: "Turn one-time buyers into a tribe.",
    copy: "Order delivered. Three days pass. A review request goes out. Leave one — get a fifteen percent loyalty code. Thirty days later, ‘we miss you’ with bestseller suggestions.",
    chips: ["Judge.me", "WhatsApp", "Shopify", "Email"],
    visual: "stars",
  },
];

const plans = [
  {
    name: "Starter",
    price: "₹15,000",
    note: "/mo",
    description: "One workflow. The cleanest start.",
    features: ["1 automation workflow", "WhatsApp + email support", "Execution monitoring", "Monthly performance email", "Up to 30 orders/day"],
    cta: "Start with Starter",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹35,000",
    note: "/mo",
    description: "Three workflows. Where most brands land.",
    features: ["3 automation workflows", "WhatsApp control panel", "Tally + Shiprocket integrations", "Realtime failure alerts", "Git dashboard", "Priority support", "Up to 100 orders/day"],
    cta: "Pick Growth",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "₹75,000",
    note: "/mo",
    description: "Custom automation. The full engine.",
    features: ["Unlimited workflows", "Multi-store support", "Custom Indian integrations", "Monthly strategy call", "Dedicated build queue", "SLA-backed uptime", "500+ orders/day"],
    cta: "Talk to founder",
    highlighted: false,
  },
];

const MiniIcon = ({ type }: { type: string }) => {
  const iconClass = "h-4 w-4";
  if (type === "orders") return <PackageCheck className={iconClass} />;
  if (type === "cart") return <ShoppingCart className={iconClass} />;
  if (type === "reviews") return <Star className={iconClass} />;
  if (type === "revenue") return <RefreshCcw className={iconClass} />;
  return <MessageCircle className={iconClass} />;
};

const LogoMark = ({ compact = false }: { compact?: boolean }) => (
  <img
    src={threxaLogo}
    alt="Threxa — Beyond Limits"
    className={compact ? "h-9 w-auto object-contain" : "h-16 w-auto object-contain md:h-20"}
  />
);

const SystemPanel = () => (
  <div className="relative mx-auto w-full max-w-2xl animate-float rounded-lg bg-panel-gradient p-4 shadow-panel ring-1 ring-violet-soft/20 md:p-6">
    <div className="grid gap-4 md:grid-cols-[1.05fr_1fr]">
      <div className="rounded-md border border-violet-soft/15 bg-cream-lift/5 p-6 text-secondary-foreground">
        <p className="mb-8 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-violet-soft/75">// live workflow</p>
        <h2 className="max-w-xs font-display text-3xl leading-none text-secondary-foreground md:text-4xl">Your store. Running itself.</h2>
        <p className="mt-4 text-xs leading-relaxed text-secondary-foreground/62">
          An order arrives, WhatsApp is sent, Shiprocket documentation is built, the team is alerted, the review is queued, abandoned carts are watched.
        </p>
        <div className="mt-10 grid grid-cols-3 border-t border-violet-soft/15 pt-4 text-secondary-foreground">
          <div>
            <strong className="block text-xl font-semibold">3s</strong>
            <span className="text-[0.58rem] uppercase text-secondary-foreground/50">order routed</span>
          </div>
          <div>
            <strong className="block text-xl font-semibold">12x</strong>
            <span className="text-[0.58rem] uppercase text-secondary-foreground/50">manual saved</span>
          </div>
          <div>
            <strong className="block text-xl font-semibold">99.9%</strong>
            <span className="text-[0.58rem] uppercase text-secondary-foreground/50">uptime</span>
          </div>
        </div>
      </div>
      <div className="rounded-md border border-violet-soft/15 bg-violet/10 p-4 text-secondary-foreground">
        <div className="mb-4 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.24em] text-secondary-foreground/50">
          <span>flow — 001 · live</span>
          <span>3s</span>
        </div>
        {["Shopify · Order received", "Google Sheets · Logged", "WhatsApp · Sent", "Tally · Invoice"].map((item, index) => (
          <div key={item} className="mb-3 flex items-center gap-3 rounded-md border border-violet-soft/20 bg-cream-lift/5 px-3 py-3 text-xs text-secondary-foreground/78 transition-transform duration-300 hover:-translate-y-0.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary text-[0.62rem] font-bold text-primary-foreground">{index + 1}</span>
            <span>{item}</span>
          </div>
        ))}
        <div className="mt-5 rounded-md border border-violet-soft/15 bg-cream-lift/5 p-4 text-center">
          <Sparkles className="mx-auto h-5 w-5 text-primary" />
          <p className="mt-2 text-xs text-secondary-foreground/70">Label printed — running.</p>
        </div>
      </div>
    </div>
  </div>
);

const PainVisual = ({ type }: { type: string }) => {
  if (type === "cart") {
    return (
      <div className="flex h-full min-h-48 flex-col items-center justify-center rounded-lg bg-panel-gradient text-secondary-foreground shadow-panel">
        <ShoppingCart className="mb-5 h-6 w-6 text-secondary-foreground/24" />
        <p className="font-display text-5xl italic text-primary">70%</p>
        <p className="mt-2 text-[0.58rem] uppercase tracking-[0.25em] text-secondary-foreground/45">abandoned · never returns</p>
      </div>
    );
  }

  if (type === "reviews") {
    return (
      <div className="rounded-lg bg-card p-6 shadow-violet ring-1 ring-line">
        <div className="mb-4 rounded-md border border-line bg-cream p-4 text-xs text-ink-soft">“Loved the product, fast delivery”</div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="mb-3 rounded-md border border-dashed border-line px-4 py-3 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">review never collected</div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-violet ring-1 ring-line">
      {["Shopify · paid", "Google Sheets · tracker", "WhatsApp · copy", "Tally · tax invoice", "Shiprocket · label"].map((item, index) => (
        <div key={item} className="mb-3 flex items-center gap-3 rounded-md border border-line bg-cream-lift px-4 py-3 text-xs text-foreground">
          <span className="h-3 w-3 rounded-sm bg-success" />
          <span>{item}</span>
          <span className="ml-auto text-muted-foreground">0{index + 1}</span>
        </div>
      ))}
    </div>
  );
};

const WorkflowVisual = ({ type }: { type: string }) => {
  if (type === "revenue") {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-lg bg-panel-gradient text-secondary-foreground shadow-panel">
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-secondary-foreground/38">recovered cart revenue</p>
        <p className="mt-4 font-display text-5xl italic text-secondary-foreground">₹17,231</p>
        <div className="mt-6 flex h-8 items-end gap-1">
          {[18, 24, 15, 31, 38, 29, 44].map((height, index) => (
            <span key={index} className="w-1.5 rounded-full bg-primary" style={{ height }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "stars") {
    return (
      <div className="rounded-lg bg-panel-gradient p-5 text-secondary-foreground shadow-panel">
        {["Absolutely elite automation. Will buy again.", "Order confirmation came instantly — smoothest.", "Review link made feedback effortless."].map((review) => (
          <div key={review} className="mb-4 rounded-md border border-violet-soft/15 bg-cream-lift/5 p-4">
            <div className="mb-2 flex gap-1 text-warning">★★★★★</div>
            <p className="text-xs text-secondary-foreground/75">“{review}”</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-panel-gradient p-7 text-secondary-foreground shadow-panel">
      {["Order placed", "Sheet logged", "WhatsApp sent", "Tally invoice", "Label printed"].map((step, index) => (
        <div key={step} className="flex items-center gap-4 pb-4 last:pb-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-soft/35 bg-violet/20 text-xs text-secondary-foreground">{index + 1}</span>
          <span className="text-sm text-secondary-foreground/80">{step}</span>
        </div>
      ))}
    </div>
  );
};

const ThrexaLanding = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground noise">
      <header className="sticky top-0 z-40 border-b border-violet-soft/10 bg-secondary/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-secondary">
            <LogoMark compact />
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-violet-soft md:flex">
            <a className="transition-colors hover:text-primary" href="#problem">Problem</a>
            <a className="transition-colors hover:text-primary" href="#workflows">Workflows</a>
            <a className="transition-colors hover:text-primary" href="#pricing">Pricing</a>
          </div>
          <a href="#final" className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-secondary">
            Book a free audit <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </nav>
      </header>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl place-items-center px-5 pb-24 pt-16 text-center md:px-8">
        <div className="absolute left-1/2 top-28 h-40 w-40 -translate-x-1/2 rounded-full border border-violet-soft/45 opacity-50 animate-orbit md:h-64 md:w-64" aria-hidden="true" />
        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="mb-9 flex w-full justify-center rounded-lg bg-secondary px-6 py-5 shadow-panel ring-1 ring-violet-soft/15 animate-reveal sm:w-auto">
            <LogoMark />
          </div>
          <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary animate-reveal">// workflow automation for Indian D2C</p>
          <h1 className="max-w-3xl font-display text-6xl font-medium leading-[0.88] text-balance md:text-8xl lg:text-9xl animate-reveal">
            Beyond <span className="font-display-italic text-primary">limits.</span>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground md:text-base animate-reveal">
            Threxa builds automation systems for Shopify D2C brands. Order processing, customer messages, cart recovery, reviews — all handled, all running, all the time.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-reveal">
            <a href="#final" className="group inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-panel transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background">
              Book a free audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#workflows" className="inline-flex items-center justify-center rounded-full border border-line bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background">
              See how it works
            </a>
          </div>
          <div className="mt-20 w-full">
            <SystemPanel />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card/45 py-28 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
            An order comes in.<br />Then <span className="font-display-italic text-primary">silence.</span><br />That’s the goal.
          </h2>
          <p className="mx-auto mt-8 max-w-md text-sm leading-7 text-muted-foreground">
            No team scrambling. No founder copy-pasting at 11 PM. No customer waiting for an update that never comes. Just a quiet store that works while you sleep.
          </p>
        </div>
      </section>

      <section id="problem" className="bg-background py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="mb-20 text-center">
            <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">// the reality</p>
            <h2 className="mx-auto max-w-2xl font-display text-5xl leading-[0.92] md:text-7xl">
              Most D2C founders are <span className="font-display-italic text-primary">drowning</span> in work that should be invisible.
            </h2>
            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-muted-foreground">
              Threxa turns a day on tasks that look like “not thinking creative, nothing strategic” — just human attention to keep the lights on.
            </p>
          </div>

          <div className="space-y-16 md:space-y-20">
            {painPoints.map((item, index) => (
              <article key={item.number} className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <p className="font-display text-5xl text-violet-soft">{item.number}</p>
                  <h3 className="mt-4 max-w-sm font-display text-4xl leading-[0.95] md:text-5xl">{item.title}</h3>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">{item.copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-soft bg-violet-soft/20 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-primary">
                    <MiniIcon type={item.visual} /> {item.tag}
                  </span>
                </div>
                <PainVisual type={item.visual} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflows" className="border-y border-line bg-card/45 py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="mb-20 text-center">
            <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">// the work</p>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Three workflows.<br />That’s the <span className="font-display-italic text-primary">whole product.</span>
            </h2>
          </div>

          <div className="divide-y divide-line">
            {workflows.map((workflow, index) => (
              <article key={workflow.eyebrow} className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-16">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <p className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-primary">// {workflow.eyebrow}</p>
                  <h3 className="max-w-sm font-display text-4xl leading-[0.95] md:text-5xl">
                    {workflow.title.includes("Zero") ? <>Three seconds.<br />Five systems.<br /><span className="font-display-italic text-primary">Zero touch.</span></> : workflow.title.includes("walked") ? <>Win back the seventy percent that <span className="font-display-italic text-primary">walked away.</span></> : <>Turn one-time buyers into a <span className="font-display-italic text-primary">tribe.</span></>}
                  </h3>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">{workflow.copy}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {workflow.chips.map((chip) => (
                      <span key={chip} className="rounded-full bg-muted px-3 py-1.5 text-[0.62rem] font-medium text-muted-foreground">{chip}</span>
                    ))}
                  </div>
                </div>
                <WorkflowVisual type={workflow.visual} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-background py-28 md:py-36">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <div className="mb-16 text-center">
            <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">// plans</p>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Pay for the work.<br />Pay for the <span className="font-display-italic text-primary">uptime.</span><br />Nothing in between.
            </h2>
            <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-muted-foreground">
              No per-task fees. No surprise overages. One-time setup, monthly to keep it running, monitored, and patched.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className={plan.highlighted ? "relative rounded-lg bg-secondary p-6 text-secondary-foreground shadow-panel ring-1 ring-violet-soft/25" : "rounded-lg bg-card p-6 text-card-foreground shadow-violet ring-1 ring-line"}>
                {plan.highlighted && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-primary-foreground">Best pick</span>}
                <p className={plan.highlighted ? "text-[0.62rem] font-bold uppercase tracking-[0.22em] text-violet-soft" : "text-[0.62rem] font-bold uppercase tracking-[0.22em] text-primary"}>{plan.name}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-5xl leading-none">{plan.price}</span>
                  <span className={plan.highlighted ? "pb-1 text-xs text-secondary-foreground/50" : "pb-1 text-xs text-muted-foreground"}>{plan.note}</span>
                </div>
                <p className={plan.highlighted ? "mt-4 text-sm text-secondary-foreground/68" : "mt-4 text-sm text-muted-foreground"}>{plan.description}</p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className={plan.highlighted ? "flex gap-2 text-xs text-secondary-foreground/82" : "flex gap-2 text-xs text-muted-foreground"}>
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#final" className={plan.highlighted ? "mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-xs font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-secondary" : "mt-8 inline-flex w-full items-center justify-center rounded-full border border-line bg-card px-4 py-3 text-xs font-bold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background"}>
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-9 text-center text-xs text-muted-foreground">First workflow always built from a proof-of-concept. Pay only when you see it work.</p>
        </div>
      </section>

      <section id="final" className="border-y border-line bg-card/45 py-28 text-center md:py-36">
        <div className="mx-auto max-w-3xl px-5">
          <p className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">// final word</p>
          <h2 className="font-display text-6xl leading-[0.88] md:text-8xl">
            Stop doing<br /><span className="font-display-italic text-primary">data entry.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-muted-foreground">
            Book a free fifteen-minute audit. If it looks at your current workflow, tells you what to automate first, and builds the first one free. No pitch. No contract. Just see if it works.
          </p>
          <a href="mailto:hello@threxa.io" className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground shadow-panel transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background">
            Book the audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      <footer className="bg-background py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <LogoMark compact />
            <p className="mt-3 max-w-xs text-xs leading-6 text-muted-foreground">Automation infrastructure for Indian D2C brands. Beyond Limits.</p>
          </div>
          <div className="grid grid-cols-3 gap-10 text-xs text-muted-foreground">
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Product</p>
              <p>Workflows</p>
              <p>Pricing</p>
              <p>Book demo</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Company</p>
              <p>About</p>
              <p>LinkedIn</p>
              <p>Email</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold uppercase tracking-[0.18em] text-foreground">Legal</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ThrexaLanding;
