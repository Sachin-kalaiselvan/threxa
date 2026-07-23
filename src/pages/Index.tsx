import { useState, useEffect } from "react";
import {
  Check, Zap, Shield, Users, Phone, Mail,
  MapPin, Linkedin, Menu, X, Send, ExternalLink,
  Sparkles, BarChart3, Target, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import thexaLogo from "@/assets/threxa-logo.png";

// ─── CURRENCY + LIVE RATES ───
type Currency = "INR" | "USD" | "EUR" | "GBP";

const CURRENCIES: { code: Currency; symbol: string; locale: string }[] = [
  { code: "INR", symbol: "₹", locale: "en-IN" },
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
];

// Fallback rates (1 INR = X foreign currency). Used if API is down.
const FALLBACK_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 1 / 96,
  EUR: 1 / 110,
  GBP: 1 / 129,
};

// Cal.com link — used everywhere as the real CTA
const CAL_LINK = "https://cal.com/threxa/threxa-free-audit";
const WHATSAPP_LINK = "https://wa.me/917483992418";

// Animation styles
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
    .fade-in-up.d1 { animation-delay: 0.1s; }
    .fade-in-up.d2 { animation-delay: 0.2s; }
    .fade-in-up.d3 { animation-delay: 0.3s; }
    .fade-in-up.d4 { animation-delay: 0.4s; }

    @media (max-width: 768px) {
      .hero-heading { font-size: 1.875rem !important; line-height: 1.2 !important; }
      .hero-paragraph { font-size: 1rem !important; }
      .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
      .features-grid { grid-template-columns: 1fr !important; }
      .pricing-grid { grid-template-columns: 1fr !important; }
      .faq-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ─── CURRENCY CONTEXT (simple hook, no Context API needed) ───
const useLiveRates = () => {
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);
  const [ratesSource, setRatesSource] = useState<"live" | "fallback">("fallback");

  useEffect(() => {
    // Try localStorage cache first (6hr TTL)
    const cached = localStorage.getItem("threxa_rates");
    if (cached) {
      try {
        const { rates: cachedRates, timestamp } = JSON.parse(cached);
        const sixHours = 6 * 60 * 60 * 1000;
        if (Date.now() - timestamp < sixHours) {
          setRates(cachedRates);
          setRatesSource("live");
          return;
        }
      } catch {}
    }

    // Fetch live rates from fawazahmed0/currency-api (free, no key)
    fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.inr) {
          const newRates: Record<Currency, number> = {
            INR: 1,
            USD: data.inr.usd ?? FALLBACK_RATES.USD,
            EUR: data.inr.eur ?? FALLBACK_RATES.EUR,
            GBP: data.inr.gbp ?? FALLBACK_RATES.GBP,
          };
          setRates(newRates);
          setRatesSource("live");
          localStorage.setItem(
            "threxa_rates",
            JSON.stringify({ rates: newRates, timestamp: Date.now() })
          );
        }
      })
      .catch(() => {
        // Silently fall back to hardcoded rates
      });
  }, []);

  return { rates, ratesSource };
};

const formatPrice = (inrAmount: number, currency: Currency, rates: Record<Currency, number>): string => {
  const converted = inrAmount * rates[currency];
  const rounded = Math.round(converted);
  const localeInfo = CURRENCIES.find((c) => c.code === currency);
  try {
    return new Intl.NumberFormat(localeInfo?.locale ?? "en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(rounded);
  } catch {
    return `${localeInfo?.symbol ?? ""}${rounded.toLocaleString()}`;
  }
};

// Detect currency from browser locale
const detectCurrency = (): Currency => {
  if (typeof navigator === "undefined") return "INR";
  const stored = localStorage.getItem("threxa_currency") as Currency | null;
  if (stored && CURRENCIES.find((c) => c.code === stored)) return stored;
  const locale = navigator.language.toUpperCase();
  if (locale.includes("IN")) return "INR";
  if (locale.includes("US")) return "USD";
  if (locale.includes("GB") || locale.includes("UK")) return "GBP";
  if (["DE", "FR", "ES", "IT", "PT", "NL", "BE", "AT", "IE"].some((c) => locale.includes(c))) return "EUR";
  return "INR"; // Default: your primary market
};

// ─── NAVBAR ───
function Navbar({
  currency,
  setCurrency,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={thexaLogo} alt="Threxa" className="h-6 md:h-8" />
          <span className="text-white font-bold text-sm md:text-lg">Threxa</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-slate-300 hover:text-white transition text-sm">Features</a>
          <a href="#enterprise" className="text-slate-300 hover:text-white transition text-sm">Enterprise</a>
          <a href="#pricing" className="text-slate-300 hover:text-white transition text-sm">Pricing</a>
          <a href="#faq" className="text-slate-300 hover:text-white transition text-sm">FAQ</a>
          <select
            value={currency}
            onChange={(e) => {
              const next = e.target.value as Currency;
              setCurrency(next);
              localStorage.setItem("threxa_currency", next);
            }}
            className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-300 hover:text-white cursor-pointer focus:outline-none focus:border-blue-500"
            aria-label="Currency"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
            ))}
          </select>
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
              Book Free Audit
            </Button>
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-slate-800 border-b border-slate-700 p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white text-sm">Features</a>
              <a href="#enterprise" className="text-slate-300 hover:text-white text-sm">Enterprise</a>
              <a href="#pricing" className="text-slate-300 hover:text-white text-sm">Pricing</a>
              <a href="#faq" className="text-slate-300 hover:text-white text-sm">FAQ</a>
              <select
                value={currency}
                onChange={(e) => {
                  const next = e.target.value as Currency;
                  setCurrency(next);
                  localStorage.setItem("threxa_currency", next);
                }}
                className="bg-slate-700 border border-slate-600 rounded-md px-2 py-2 text-sm text-slate-300"
                aria-label="Currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                ))}
              </select>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">
                  Book Free Audit
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── HERO SECTION ───
function Hero() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in-up");
    elements.forEach((el, i) => el.classList.add("d" + (i % 4)));
  }, []);

  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-8 md:pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-3 md:px-4 py-2 mb-6 md:mb-8 fade-in-up">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs md:text-sm font-medium text-blue-300">D2C Automation. Enterprise Operations.</span>
          </div>
        </div>

        <h1 className="hero-heading text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
          <span className="fade-in-up block">Tally + WhatsApp + Returns +</span>
          <span className="fade-in-up block">Inventory in One Workflow</span>
        </h1>

        <p className="hero-paragraph text-base md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 md:mb-8 fade-in-up">
          Save hours every week automating order reconciliation, COD verification, returns, and inventory sync. Official WhatsApp Business API. No device-linking. No surprise charges.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 fade-in-up">
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 text-sm md:text-base w-full sm:w-auto">
              Book Free Audit
            </Button>
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 md:px-8 text-sm md:text-base w-full sm:w-auto">
              WhatsApp Us <ExternalLink size={16} className="ml-2" />
            </Button>
          </a>
        </div>

        <a href="#enterprise" className="fade-in-up inline-block text-xs md:text-sm text-purple-300 hover:text-purple-200 transition mb-8 md:mb-12">
          Building something bigger than a Shopify store? See how we built a full ERP →
        </a>

        <div className="stats-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-8 md:mt-16 fade-in-up max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">4</div>
            <div className="text-xs md:text-sm text-slate-400">Automations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Zero</div>
            <div className="text-xs md:text-sm text-slate-400">Device-linking</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Real-time</div>
            <div className="text-xs md:text-sm text-slate-400">Sync</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURES SECTION ───
function Features() {
  const features = [
    {
      id: 1,
      title: "Tally Reconciliation",
      description: "Every paid order becomes a GST-ready sales voucher in Tally Prime within seconds.",
      icon: BarChart3,
      benefits: [
        "GST-ready voucher format",
        "Automatic credit notes",
        "Audit trail logging",
        "Failed push alerts",
      ],
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
    },
    {
      id: 2,
      title: "WhatsApp COD Verification",
      description: "Official WhatsApp Business Cloud API — no device-linking. Your numbers stay safe.",
      icon: Send,
      benefits: [
        "Official Meta Cloud API",
        "OTP within seconds",
        "Auto-tag orders",
        "No permanent bans",
      ],
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: 3,
      title: "Returns Management",
      description: "Branded returns portal with Shiprocket, Delhivery, and Blue Dart integrations.",
      icon: Target,
      benefits: [
        "Customer self-service",
        "Auto courier pickup",
        "Idempotent restocking",
        "Exchange-first flows",
      ],
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
    },
    {
      id: 4,
      title: "Inventory Sync",
      description: "Real-time, webhook-driven inventory sync with SKU normalization.",
      icon: Zap,
      benefits: [
        "Real-time webhook sync",
        "SKU normalization",
        "Safety-stock buffer",
        "Audit logging",
      ],
      color: "from-yellow-500/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
    },
  ];

  return (
    <section id="features" className="py-12 md:py-20 bg-slate-900 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Four Automations, One Workflow</h2>
          <p className="text-base md:text-lg text-slate-400">Every problem Indian D2C merchants face, solved</p>
        </div>

        <div className="features-grid grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className={`bg-gradient-to-br ${feature.color} border ${feature.borderColor} rounded-lg p-6 md:p-8 hover:border-opacity-100 transition`}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  <div className="p-2 md:p-3 bg-slate-800/50 rounded-lg">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{feature.title}</h3>
                </div>

                <p className="text-sm md:text-base text-slate-300 mb-5 md:mb-6">{feature.description}</p>

                <ul className="space-y-2 md:space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-3 text-slate-300">
                      <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <Shield size={18} className="text-blue-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Safety First</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">No device-linking for WhatsApp. Your numbers won't get permanently banned.</p>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <BarChart3 size={18} className="text-green-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Full Transparency</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Complete audit log of every action. Silent failures are impossible.</p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-2 md:gap-3 mb-3">
              <Users size={18} className="text-purple-400" />
              <h4 className="font-semibold text-white text-sm md:text-base">Dedicated Support</h4>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Direct access to our team. 24-hour response, IST business hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ENTERPRISE OPERATIONS SECTION ───
function EnterpriseOps() {
  const modules = ["Production", "Inventory", "Dispatch", "Finance", "HR", "Analytics"];

  const points = [
    {
      icon: Target,
      title: "Not a plug-in — a full system",
      body: "Production tracking, inventory, dispatch, finance, HR, and AI-assisted analytics, all in one dashboard, built from the ground up.",
    },
    {
      icon: Users,
      title: "One accountable team",
      body: "The same team behind your D2C automations designs and ships enterprise-grade ERPs, start to finish. No handoffs, no second vendor.",
    },
    {
      icon: BarChart3,
      title: "Any domain, any geography",
      body: "Manufacturing, logistics, services — if it runs on spreadsheets and WhatsApp forwards today, we can turn it into a real system. Not Shopify-only. Not India-only.",
    },
  ];

  return (
    <section id="enterprise" className="py-12 md:py-20 bg-gradient-to-br from-slate-800 to-slate-900 border-y border-slate-800 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 md:px-4 py-2 mb-6">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs md:text-sm font-medium text-purple-300">Beyond Shopify. Beyond India.</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            When automation isn't enough, we build the operating system.
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Some businesses don't need workflows bolted onto Shopify — they need a system that runs the whole operation. We designed and built a complete ERP for a corrugated box manufacturer, solo, from the ground up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 md:p-6">
            <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-wide mb-4">
              <span>Threxa SPS ERP · live</span>
              <span>12 modules</span>
            </div>
            {modules.map((mod) => (
              <div key={mod} className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-900/50 px-4 py-3 mb-2.5 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span>{mod}</span>
                <span className="ml-auto text-xs text-slate-500 uppercase tracking-wide">online</span>
              </div>
            ))}
            <div className="mt-4 rounded-md border border-purple-500/30 bg-purple-500/10 p-3 text-center text-xs uppercase tracking-wide text-purple-300">
              Built solo. Runs a real factory floor.
            </div>
          </div>

          <div className="space-y-6">
            {points.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="p-2.5 bg-slate-800 rounded-lg h-fit flex-shrink-0">
                    <Icon size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm text-slate-400">{item.body}</p>
                  </div>
                </div>
              );
            })}
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="inline-block pt-2">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                Book a build call
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ───
function Pricing({
  currency,
  rates,
  ratesSource,
}: {
  currency: Currency;
  rates: Record<Currency, number>;
  ratesSource: "live" | "fallback";
}) {
  const isIndian = currency === "INR";

  // New pricing tiers (base INR)
  const tiers = [
    {
      id: "starter",
      name: "Starter",
      priceINR: 15000,
      tagline: "For small D2C brands (1-2 automations)",
      cta: "Book Free Audit",
      featured: false,
      features: [
        "Any 2 of the 4 automations",
        "Up to 2,000 orders/month",
        "Full audit log + email support",
        "Guided onboarding included",
      ],
      missing: ["Priority support"],
    },
    {
      id: "growth",
      name: "Growth",
      priceINR: 40000,
      tagline: "For growing D2C brands (all 4 automations)",
      cta: "Book Free Audit",
      featured: true,
      features: [
        "All 4 automations included",
        "Unlimited orders",
        "Official WhatsApp Business API",
        "Priority support (12hr response)",
        "Monthly ops review call",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      priceINR: 80000,
      tagline: "For established brands with custom workflows",
      cta: "Contact Sales",
      featured: false,
      features: [
        "Everything in Growth",
        "Custom automations & webhooks",
        "Dedicated Slack channel",
        "Quarterly strategy calls",
        "Priority feature requests",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-12 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">Simple, transparent pricing</h2>
          <p className="text-base md:text-lg text-slate-400">Monthly retainer. No per-order fees. Cancel anytime.</p>
          {!isIndian && (
            <p className="text-xs text-slate-500 mt-3">
              Showing prices in {currency} · {ratesSource === "live" ? "Live rates" : "Approximate rates"}
            </p>
          )}
        </div>

        <div className="pricing-grid grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={
                tier.featured
                  ? "bg-gradient-to-br from-blue-600/20 to-blue-700/10 border border-blue-500 rounded-lg p-5 md:p-8 relative md:-translate-y-4 shadow-xl shadow-blue-500/10"
                  : "bg-slate-800/50 border border-slate-700 rounded-lg p-5 md:p-8 hover:border-slate-600 transition"
              }
            >
              {tier.featured && (
                <div className="absolute -top-3 md:-top-4 left-5 md:left-8 bg-blue-600 text-white px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs font-semibold">
                  POPULAR
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{tier.name}</h3>
              <p className={`text-xs md:text-sm mb-5 md:mb-6 ${tier.featured ? "text-blue-300" : "text-slate-400"}`}>
                {tier.tagline}
              </p>

              <div className="mb-6 md:mb-8">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {formatPrice(tier.priceINR, currency, rates)}
                </span>
                <p className={`text-xs mt-1 md:mt-2 ${tier.featured ? "text-slate-300" : "text-slate-400"}`}>
                  /month
                </p>
                {!isIndian && (
                  <p className="text-xs text-slate-500 mt-1">
                    ≈ {formatPrice(tier.priceINR, "INR", rates)} INR
                  </p>
                )}
              </div>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className={`flex items-start gap-2 text-xs md:text-sm ${tier.featured ? "text-white" : "text-slate-300"}`}>
                    <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
                {tier.missing?.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-500 text-xs md:text-sm">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  className={
                    tier.featured
                      ? "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm md:text-base"
                      : "w-full bg-slate-700 hover:bg-slate-600 text-sm md:text-base"
                  }
                >
                  {tier.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6 text-center space-y-2">
          <p className="text-xs md:text-sm text-slate-300">
            💰 First 14 days free. Setup and onboarding included.
          </p>
          <p className="text-xs text-slate-400">
            {isIndian
              ? "Prices exclude 18% GST for Indian customers."
              : "Prices exclude applicable local taxes (VAT / GST / sales tax). Tax calculated at checkout based on billing address."}
          </p>
          {!isIndian && (
            <p className="text-xs text-slate-500">
              International prices are approximate. Actual billing may vary based on the exchange rate at time of transaction.
            </p>
          )}
        </div>

        <div className="mt-8 md:mt-12 bg-gradient-to-br from-purple-600/10 to-purple-700/5 border border-purple-500/30 rounded-lg p-6 md:p-10">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-300 mb-3">Custom builds</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                Building an ERP or ops system? Every business runs differently.
              </h3>
              <p className="text-sm text-slate-300 mb-5">
                Production lines, inventory logic, team size, approval chains — no two operations are alike, so we don't force yours into a fixed package. Pricing is scoped to your modules and team on a build call.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Custom modules — production, inventory, finance, HR, dispatch",
                  "Built and owned by one accountable team, start to finish",
                  "Deployed on your own infrastructure",
                  "Scales from a single site to multi-plant operations",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                    <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Starting at</p>
              <p className="text-4xl font-bold text-white mb-1">
                {formatPrice(25000, currency, rates)}
                <span className="text-base font-normal text-slate-400">/mo</span>
              </p>
              {!isIndian && (
                <p className="text-xs text-slate-500 mb-1">≈ {formatPrice(25000, "INR", rates)} INR</p>
              )}
              <p className="text-xs text-slate-500 mb-6">
                Final quote scoped after a build call — no fixed one-time fee.
              </p>
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                  Book a build call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ SECTION ───
function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      q: "How is this different from device-linking WhatsApp automation?",
      a: "Threxa uses the official WhatsApp Business Cloud API through a Meta-approved BSP. We never device-link, which means your numbers won't get permanently banned. Device-linking violates WhatsApp's ToS and Meta enforces bans aggressively.",
    },
    {
      id: 2,
      q: "What if something breaks?",
      a: "You get a WhatsApp + email alert immediately when any automation fails. Every action is logged, so you can see exactly what happened. Support responses within 24hrs on Starter, 12hrs on Growth.",
    },
    {
      id: 3,
      q: "Do I need to install anything?",
      a: "For Tally, yes — a lightweight bridge on your accounts machine. For WhatsApp, returns, and inventory: all cloud-based, nothing to install.",
    },
    {
      id: 4,
      q: "Can I cancel anytime?",
      a: "Yes. Monthly retainer, cancel anytime with 30 days notice. No annual lock-in.",
    },
    {
      id: 5,
      q: "How is my data handled?",
      a: "All data is encrypted at rest and in transit. On cancellation, your data is deleted within 48 hours. Full audit logs available on request. We follow GDPR-aligned data handling principles.",
    },
    {
      id: 6,
      q: "Do you work with international brands, or only D2C?",
      a: "Our Tally/WhatsApp/Shiprocket stack is tuned for Indian D2C brands, but that's one product, not the whole business. We also design and build custom operations systems and ERPs for manufacturers and operations-heavy companies in any country. If you're outside India, or outside D2C entirely, tell us your stack and we'll scope it.",
    },
    {
      id: 7,
      q: "Do you only automate Shopify stores?",
      a: "No. Automation is where we started, but it's not the ceiling. We designed and built a complete ERP from scratch for a corrugated box manufacturer — production tracking, inventory, dispatch, finance, HR, and AI-assisted analytics, all in one dashboard. If your operation still runs on spreadsheets and WhatsApp forwards, we can turn it into a real system, regardless of industry.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-20 bg-slate-900 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">FAQ</h2>
          <p className="text-base md:text-lg text-slate-400">Common questions from D2C merchants</p>
        </div>

        <div className="faq-grid space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <button
              key={faq.id}
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full text-left bg-slate-800/50 border border-slate-700 rounded-lg p-4 md:p-6 hover:border-slate-600 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm md:text-lg font-semibold text-white pr-3">{faq.q}</h3>
                <span className={`transform transition flex-shrink-0 ${openId === faq.id ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {openId === faq.id && (
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-700 text-xs md:text-sm text-slate-300">
                  {faq.a}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA SECTION ───
function CTA() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4 md:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">Ready to automate your ops?</h2>
        <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8">Book a free 30-minute audit. We'll walk through your current workflow and show you what's automatable.</p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-600 font-semibold px-6 md:px-8 text-sm md:text-base w-full sm:w-auto">
              Book Free Audit
            </Button>
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-6 md:px-8 text-sm md:text-base w-full sm:w-auto">
              WhatsApp Us
            </Button>
          </a>
        </div>
        <p className="text-xs md:text-sm text-blue-100 mt-4 md:mt-6">Or call +91 74839 92418</p>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-12">
          <div>
            <img src={thexaLogo} alt="Threxa" className="h-6 md:h-8 mb-3 md:mb-4" />
            <p className="text-slate-400 text-xs md:text-sm">Automation & operations systems — for D2C brands and manufacturers, worldwide.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-xs md:text-sm">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="https://theingredientlist.co" className="hover:text-white transition">Built by TIL</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 md:mb-4 text-xs md:text-sm">Contact</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+917483992418" className="hover:text-white transition">+91 74839 92418</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} />
                <a href="mailto:theingredientlist.co@gmail.com" className="hover:text-white transition">theingredientlist.co@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} />
                <span>Bengaluru, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs md:text-sm text-slate-400 text-center md:text-left">
            © 2026 Threxa by The Ingredient List. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/threxa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN COMPONENT ───
export default function Index() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const { rates, ratesSource } = useLiveRates();

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen">
      <AnimationStyles />
      <Navbar currency={currency} setCurrency={setCurrency} />
      <Hero />
      <Features />
      <EnterpriseOps />
      <Pricing currency={currency} rates={rates} ratesSource={ratesSource} />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
